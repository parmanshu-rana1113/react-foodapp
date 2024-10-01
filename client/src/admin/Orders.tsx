import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useEffect } from "react";


const Orders = () => {
    const { restaurantOrder, getRestaurantOrders, updateRestaurantOrder } = useRestaurantStore();
    useEffect(() => {

        getRestaurantOrders();
        console.log(restaurantOrder);
    }, []);
    useEffect(() => {
        console.log('Updated Restaurant Orders:', restaurantOrder); // Log orders after state changes
    }, [restaurantOrder]); // Only runs when restaurantOrder updates
    return (
        <div className="max-w-6x mx-auto py-10 px-6">
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-10">Orders Overview</h1>

            <div className="space-y-8">



                {/* restaurant orders display here  */}

                {
                    restaurantOrder.map((order) => (

                        <div className="flex flex-col md:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 sm:p-8 border border-gray-200 dark:border-gray-700">
                            <div className="flex-1 mb-6 sm:mb-0">

                                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Foodizm</h2>

                                <p className="text-gray-600 dark:text-gray-300 mt-2">
                                    <span className="font-semibold">Address: </span>
                                 {order.deliveryDetails.address}</p>
                                <p className="text-gray-600 dark:text-gray-300">
                                    <span className="font-semibold mt-3">Total Amount: </span>

                                    {order.totalAmount}</p>
                            </div>
                            <div className="w-full sm:w-1/3">
                                <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Order Status</Label>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Status" />


                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {
                                                ["Pending", "Confirmed", "Preparing", "OutForDelivery", "Delivered"].map((status: string, index: number) => (

                                                    <SelectItem key={index} value={status.toLowerCase()}>{status}</SelectItem>
                                                ))
                                            }
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>


                    ))

                }



            </div>
        </div>
    )
}
export default Orders;