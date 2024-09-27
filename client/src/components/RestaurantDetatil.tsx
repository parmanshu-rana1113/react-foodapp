// import Image from "@/assets/Hero-pizza.jpg";
import { Badge } from "./ui/badge";
import { Timer } from "lucide-react";
import AvailableMenu from "./AvailableMenu";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const RestaurantDetatil = () => {
    const params = useParams();
    const { singleRestaurant, getSingleRestaurant } = useRestaurantStore();
    

    useEffect(() => {
        getSingleRestaurant(params.id!);
        console.log(singleRestaurant);
    }, [params.id]);
    
   
    return (
        <div className=" max-w-6xl max-auto my-10 lg:ml-12">
            <div className="w-full">


                <div className="relative w-full h-32 md:h-64 lg:h-72 lg:w-full">

                    <img src={singleRestaurant?.imageUrl || "LOADING..." } alt="restaurant-image"
                        className="object-cover w-full h-full rounded-lg shadow-lg"
                    />
                </div>

                <div className="flex flex-col md:flex-row justify-between">

                    <div className="my-5 ">
                        <h1 className="font-medium text-xl">{singleRestaurant?.restaurantName || "LOADING..."}</h1>

                        <div className="flex gap-2 my-2">
                            {

                                singleRestaurant?.cuisines.map((cuisine: string, idx: number) => (

                                    <Badge key={idx}>{cuisine}</Badge>
                                ))
                            }
                        </div>

                        <div className="flex md:flex-row flex-col gap-2 my-5">

                            <div className="flex item-center gap-2">

                                <Timer className="w-5 h-5" />
                                <h1 className="flex items-center gap-2 font-mediump-">Delivery Time {" "}
                                    <span className="text-[#D19254]">{singleRestaurant?.deliveryTime || "NA"} Mins</span>
                                </h1>
                            </div>

                        </div>
                    </div>
                </div>

                  {/* YHA SE MENUS BHEJUNGA UDHAR AVAIALABLE MENU M RECIVE KRLUNGA  */}
                <AvailableMenu menus = {singleRestaurant?.menus} />
            </div>



        </div>
    )
}
export default RestaurantDetatil;