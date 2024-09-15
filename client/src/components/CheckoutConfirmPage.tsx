

// type Props = {}

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogTitle } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

// open or setopen recive kie setopen ek function hai 
const CheckoutConfirmPage = ({ open, setOpen }: { open: boolean, setOpen: Dispatch<SetStateAction<boolean>> }) => {

    const [input, setInput] = useState({
        name: "",
        email: "",
        contact: "",
        address: "",
        city: "",
        state: ""
    });
    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setInput({ ...input, [name]: value });

    }

    const CheckoutHandler = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        // api implementation
        console.log(input);
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
                        <Button className="w-full bg-orange hover:bg-hoverorange">Continue to payment</Button>
                    </DialogFooter>

                </form>
            </DialogContent>


        </Dialog>


    )
}
export default CheckoutConfirmPage;