import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";


const AvailableMenu = () => {
    return (
        <div className="md:p-4">

            <h1 className="text-xl md:text-2xl font-extrabold mb-6"> Availabe Menu</h1>

            <div className="grid md:grid-col-3  spaces-y-4 md:spaces-y-0">

                <Card className=" md:max-w-xs mx-auto  rounded-lg shadow-lg md:shadow-lg">
                    <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?cs=srgb&dl=pexels-chanwalrus-958545.jpg&fm=jpg" alt=""

                        className="w-full h-40 object-cover"
                    />
                    <CardContent className="p-4">
                        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Tandoori Biryani</h2>
                        <p className="text-sm text-gray-600 mt-2">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                        <h3 className="text-lg font-semibold mt-4">Price : <span className="text-[#D19254]">RS. 80</span></h3>
                    </CardContent>
                   <CardFooter>
                    <Button className="bg-orange hover:bg-hoverOrange w-full">Add to Cart</Button>
                   </CardFooter>
                </Card>

            </div>
        </div>
    )
}
export default AvailableMenu;