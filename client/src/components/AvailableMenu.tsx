import { MenuItem } from "@/types/restaurantType";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { useCartStore } from "@/store/useCartStore";
import { useNavigate } from "react-router-dom";


const AvailableMenu = ({ menus }: { menus: MenuItem[] }) => {

    const { addToCart } = useCartStore();
    const navigate = useNavigate();

    return (
        <div className="md:p-4  lg:ml-12">
            <h1 className="text-xl md:text-2xl font-extrabold mb-6">Available Menu</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {
                    menus.map((menu: MenuItem) => (
                        <Card key={menu.id} className="rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
                            <img
                                src={menu.image}
                                alt="Menu-image"
                                className="w-full h-40 object-cover rounded-t-lg"
                            />
                            <CardContent className="p-4">
                                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{menu.name}</h2>
                                <p className="text-sm text-gray-600 mt-2">{menu.description}</p>
                                <h3 className="text-lg font-semibold mt-4">
                                    Price : <span className="text-[#D19254]">Rs.{menu.price}</span>
                                </h3>
                            </CardContent>
                            <CardFooter>
                                <Button onClick={() => {
                                    addToCart(menu);
                                navigate("/cart");

                                } } className="bg-orange hover:bg-hoverOrange w-full">Add to Cart</Button>
                        </CardFooter>
                        </Card>
            ))
                }
        </div>
        </div >
    );
}

export default AvailableMenu;
