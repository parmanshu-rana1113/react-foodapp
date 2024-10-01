

// type Props = {}

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/useUserStore";
import { CheckoutSessionRequest } from "@/types/orderType";
import { useCartStore } from "@/store/useCartStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useOrderStore } from "@/store/useOrderStore";
import { Loader2 } from "lucide-react";

// open or setopen recive kie setopen ek function hai a
const CheckoutConfirmPage = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {
    const { user } = useUserStore();
    const [input, setInput] = useState({

        name: user?.fullname || "",
        email: user?.email || "",
        contact: user?.contact.toString() || "",
        address: user?.address || "",
        city: user?.city || "",
        state: user?.state || "",
    });
    const { cart } = useCartStore();
    const { restaurant } = useRestaurantStore();
    const { createCheckoutSession, loading } = useOrderStore();
    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });

    }

    const CheckoutHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        // api implementation
        // console.log(input);

        try {
            const CheckoutData: CheckoutSessionRequest = {
                cartItems: cart.map((cartItem) => ({
                    menuId: cartItem._id,
                    name: cartItem.name,
                    image: cartItem.image,
                    price: cartItem.price.toString(),
                    quantity: cartItem.quantity.toString(),
                })),
                deliveryDetails: input,
                restaurantId: restaurant?._id as string,
            }
            await createCheckoutSession(CheckoutData);
        } catch (error) {
            console.log(error)
        }
    }
    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>

                <DialogTitle className="font-bold">Review Your Order</DialogTitle>
                <DialogDescription className="text-xs">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore, officiis. Sit doloribus saepe assumenda exercitationem nisi minus nemo et iure.</DialogDescription>
                <form onSubmit={CheckoutHandler} className="md:grid grid:col-2 gap-2 space-y-1 md:space-y-0">
                    <div >
                        <Label>Fullname</Label>
                        <Input
                            type="text"
                            name="name"
                            value={input.name}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div >
                        <Label>Email</Label>
                        <Input
                            disabled
                            type="email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div >
                        <Label>Contact</Label>
                        <Input
                            type="text"
                            name="contact"
                            value={input.contact}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div >
                        <Label>Address</Label>
                        <Input
                            type="text"
                            name="address"
                            value={input.address}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div >
                        <Label>City</Label>
                        <Input
                            type="text"
                            name="city"
                            value={input.city}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div >
                        <Label>State</Label>
                        <Input
                            type="text"
                            name="state"
                            value={input.state}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <DialogFooter className="col-span-2 pt-5">
                        {
                            loading ? (<Button disabled className="w-full bg-orange hover:bg-hoverorange">
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                Bass Hogi</Button>) : (<Button className="w-full bg-orange hover:bg-hoverorange">Continue to payment</Button>)
                        }


                    </DialogFooter>

                </form>
            </DialogContent>


        </Dialog>


    )
}
export default CheckoutConfirmPage;