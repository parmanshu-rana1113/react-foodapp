// import { error } from "console";
import { request, Request, Response } from "express";
import { Restaurant } from "../models/restaurant.model"
import { Order } from '../models/order.model'
import { Multer } from "multer";  //file k lie
import uploadImageOnCloudinary from "../utils/imageUpload";
import { stat } from "fs";

export const createRestaurant = async (req: Request, res: Response) => {

    try {
        const { restaurantName, city, state, deliveryTime, cuisines } = req.body
        const file = req.file;
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (restaurant) {
            return res.status(400).json({
                success: false,
                message: "Restaurant already exist for this user"
            })
        }
        if (!file) {
            return res.status(400).json({
                success: false,
                message: "Restaurant already exist for this user"
            })
        }
        const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
        await Restaurant.create({
            user: req.id,
            restaurantName,
            city,
            state,
            deliveryTime,
            cuisines: JSON.parse(cuisines),
            imageUrl
        });

        return res.status(201).json({
            success: true,
            message: "Restaurant Added"
        })

    } catch (error) {

        console.log(error)
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getRestaurant = async (req: Request, res: Response) => {

    try {
        const restaurant = await Restaurant.find({ user: req.id })
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not Found"
            })
        };
        return res.status(200).json({ success: true, restaurant })



    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const updateRestaurant = async (req: Request, res: Response) => {


    try {
        const { restaurantName, city, state, deliveryTime, cuisines } = req.body;
        const file = req.file;
        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
        };
        restaurant.restaurantName = restaurantName;
        restaurant.city = city;
        restaurant.state = state;
        restaurant.deliveryTime = deliveryTime;
        restaurant.cuisines = JSON.parse(cuisines);

        if (file) {
            const imageUrl = await uploadImageOnCloudinary(file as Express.Multer.File);
            restaurant.imageUrl = imageUrl;
        }

        await restaurant.save();
        return res.status(200).json({
            success: true,
            message: "Restaurant Updated",
            restaurant
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const getRestaurantOrder = async (req: Request, res: Response) => {
    try {

        const restaurant = await Restaurant.findOne({ user: req.id });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: " Restaurant not Found"
            })
        };
        const orders = await Order.find({ restaurant: restaurant._id }).populate('restaurant').populate('user');
        return res.status(200).json({
            success: true,
            orders
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" })
    }
}

export const updateOrderStatus = async (req: Request, res: Response) => {

    try {
        //yha hamme ptq hone chye konsa order update krre tu uski id like aynge
        const { orderId } = req.params;
        const { status } = req.body;
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not Found"
            })
        }
        order.status = status;
        await order.save();
        return res.status(200).json({
            success: true,
            message: "status updated"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ messsage: "Internal Server Error" });
    }
}

export const searchRestaurant = async (req: Request, res: Response) => {

    try {
        const searchText = req.params.searchText || "";
        const searchQuery = req.query.searchQuery as string || "";
        const selectedCuisines = (req.query.selectedCuisines as string || "").split(",").filter(cuisine => cuisine);       //kunki hamare paas string m ayega data tu split krke , se tu vo array m hojega


        const query: any = { };
        //basic search based on earchtext (name city state)
        if (searchText) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: 'i' } },   //   i  means small ho big letter ho kisi word k bich m ho milajye bsss 
                { city: { $regex: searchText, $options: 'i' } },
                { state: { $regex: searchText, $options: 'i' } }
            ]
        }

        // filter on the basis of search querry

        if (searchQuery) {
            query.$or = [
                { restaurantName: { $regex: searchText, $options: 'i' } },   //   i  means small ho big letter ho kisi word k bich m ho milajye bsss 
                { cuisines: { $regex: searchQuery, $option: 'i' } },

            ]
        }
        // console.log(query);


        if (selectedCuisines.length > 0) {
            query.cuisine = { $in: selectedCuisines }
        }

        const restaurants = await Restaurant.find(query);
        return res.status(200).json({
            success: true,
            data: restaurants
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}

//jab hamm view menu par click krke uss restaurnat ki informartion aani chiye
export const getSingleRestaurant = async (req: Request, res: Response) => {

    try {
        const restaurantId = req.params.id;
        const restaurant = await Restaurant.findById(restaurantId).populate({
            path: 'menus',
            options: { createdAt: -1 }
        });
        if (!restaurant) {
            return res.status(404).json({
                success: false,
                message: "Restaurant not found"
            })
        };
        return res.status(200).json(restaurant);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: " Internal server error" })
    }
}