import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";
import { useState } from "react";
import CheckoutConfirmPage from "./CheckoutConfirmPage";

const Cart = () => {
    const [open, setOpen] = useState<boolean>(false);
    return (
        <div className="flex flex-col max-w-7xl mx-auto my-10">
            <div className="flex justify-end">
                <Button className="bg-orange hover:bg-hoverorange">View All</Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Item</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <TableRow>
                        <TableCell>
                            <Avatar>
                                <AvatarImage src="/path-to-image.jpg" alt="Item Image" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                        </TableCell>
                        <TableCell>Biryani</TableCell>
                        <TableCell>100</TableCell>
                        <TableCell>
                            <div className=" w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full bg-gray-200 hover:bg-hoverorange "

                                >
                                    <AiOutlineMinus className="w-5 h-5 text-white" />
                                </Button>
                                <Button
                                    disabled
                                    variant="outline"
                                    size="icon"
                                    className="font-bold border-none"
                                >
                                    1
                                </Button>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-full bg-orange hover:bg-hoverorange"
                                >
                                    <AiOutlinePlus className="w-5 h-5 text-white" />
                                </Button>
                            </div>
                        </TableCell>
                        <TableCell>200</TableCell>
                        <TableCell className="text-right">
                            <Button size={'sm'} variant="outline" className="bg-orange hover:bg-hoverorange text-white">Remove</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow className="text-2xl font-bold">
                        <TableCell colSpan={5}>Total</TableCell>
                        <TableCell className="text-right">200</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
            <div className="flex justify-end my-5">
                <Button onClick={() => setOpen(true)} className="bg-orange hover:bg-hoverorange">Proceed To Checkout</Button>
            </div>
            

            {/* variable pass karee hai CheckoutConfirmPage mein recieve karenge */}
            <CheckoutConfirmPage open={open} setOpen ={setOpen}/>


        </div>
    );
};

export default Cart;
