//jab bhi koi checkout par click karega tu ye busines logic lagega   , stripe ka ek session ayega  ...payment vgrh 

import { Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model";
import { Order } from "../models/order.model";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

type CheckoutSessionRequest = {
    cartItem: {
        manuId: string;
        name: string;
        image: string;
        price: number;
        quantity: number;
    }[],

    deliveryDetails: {
        name: string;
        email: string;
        address: String;
        city: string;
    },
    restaurantId: string

}



export const getOrders = async (req: Request, res: Response) => {

    try {
        const orders = await Order.find({ user: req.id }).populate('user').populate('restaurant');
        return res.status(200).json({
            success:true,
            orders
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}




// SESSION CREATE KARENGE
export const createCheckoutSession = async (req: Request, res: Response) => {

    try {

        const checkoutSessionRequest: CheckoutSessionRequest = req.body;
        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId).populate('menu');
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not Found"
            })
        };

        const order:any = new Order({
            restaurant: restaurant._id,
            user: req.id,
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItem,
            status: "pending",
        });


        //line items //means jo bhi item payment k sth display honge 
        const menuItem = restaurant.menus;

        // ye dono chij bhejde function createlineitmes
        const lineItems = createLineItems(checkoutSessionRequest, menuItem)

        const session = await stripe.checkout.create({
            payment_method_types: ['card'],
            shipping_address_collection: {

                allowed_countries: ['GB', 'US', 'CA']
            },
            line_Items: lineItems,
            mode: 'payment',
            success_url: `${process.env.FRONTEND_URL}/order/status`,
            cancel_url: `${process.env.FRONTEND_URL}/cart`,
            metadata: {
                orderId: order._id.toString(),
                images: JSON.stringify(menuItem.map((item: any) => item.image))
            }
        });

        if (!session.url) {
            return res.status(400).json({ success: false, message: "Error while creating session" })
        }
        await order.save();

        return res.status(200).json({

            session
        });
    } catch (error) {

        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
}

export const createLineItems = (createCheckoutSessionRequest: CheckoutSessionRequest, menuItem: any) => {


    //create line item

    const lineItems = createCheckoutSessionRequest.cartItem.map((cartItem) => {

        const menuItem = menuItems.find((item: any) => item._id === cartItem.manuId)
        if (!menuItem) throw new Error(`Menu item id not found`);

        return {
            price_data: {
                currency: 'inr',
                product_data: {
                    name: menuItem.name,
                    images: [menuItem.image],

                },
                unit_amount: menuItem.price * 100
            },
            quantity: cartItem.quantity,
        }
    })


    //return line items

    return lineItems;

}