
import Image from "@/assets/Hero-pizza.jpg"
import { IndianRupee } from "lucide-react";
import { Separator } from "./ui/separator";

import { Button } from "./ui/button";
import { Link } from "react-router-dom";
const Success = () => {
    const orders = [1, 2, 3];
    if (orders.length === 0)
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="font-bold text-2xl text-gray-700 dark:text-gray-300">No Order Found</h1>

            </div>
        )

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:text-gray-900 px-4">
            <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-lg w-ful">
                <div className="text-center mb-6">
                    <h2 className="text-2xl text-gray-800 dark:text-gray-200 font-bold ">
                        Order Status: {" "}
                        <span className="text-[#D19254]">{"confirm".toUpperCase()}</span>
                    </h2>

                </div>
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4"> Order Summary</h2>

                    {/* YOUR ORDERED ITME DISPLAY HERE  */}
                    <div className="mb-4">
                        <div className="flex flex-between item-center ">
                            <div className="flex items-center">
                                <img src={Image} alt=""
                                    className="h-14 w-14 rounded-md object-cover"
                                />
                                <h3 className="ml-4 text-gray-800 dark:text-gray-200 font-medium ">Pizza</h3>
                            </div>

                            <div className="text-right">
                                <div className="text-gray-800 dark:text-gray-200 font-medium flex items-center">
                                    <IndianRupee />
                                    <span className="text-lg font-medium">100</span>
                                </div>
                            </div>
                        </div>
                    <Separator
                    className="my-4"
                    />
                    </div>
                </div>
                <Link to="/cart">
                 <Button className="bg-orange hover:bg-hoverorange w-full py-3 rounded-md shadow-lg">Continue Shopping</Button>
                </Link> 
            </div>
        </div>

    )
}

export default Success;