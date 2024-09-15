import { useState } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import HeroImage from "@/assets/Hero-pizza.jpg";
import HeroImage1 from "@/assets/hero-pizza1.png";
import HeroImage2 from "@/assets/hero-pizza2.png";
import HeroImage3 from "@/assets/hero-pizza3.png";
import { useNavigate } from "react-router-dom";

const Herosection = () => {

    const [SearchText, setSearchText] = useState<string>("");
    const navigate = useNavigate();
    return (

        <div className="flex flex-col md:flex-row max:w-7xl mx:auto md:p-10 rounded-lg items-center justify-center m-4 gap-20">

            <div className="flex flex-col gap-10 md:w-[40%]">
                <div className="flex flex-col gap-5">
                    <h1 className="font-bold md:font-bold md:text-5xl text-4xl">Order Food Anytime & Anywhere</h1>
                    <p className="text-gray-500">Enhance your taste in life</p>
                </div>

                <div className="relative border-blue-900 flex items-center gap-2 w-full">

                    <Input
                        type="text"
                        value={SearchText}
                        placeholder="Search By Restaurant Name and State"
                        onChange={(e) => setSearchText(e.target.value)}
                        className="pl-10 border-2 h-12 shadow-xl"
                    />
                    <Search className="text-gray-500 absolute inset-y-3 left-2" />


                    <Button onClick={()=> navigate(`/search/${SearchText}`)} className="bg-orange hover:bg-hoverorange"style={{ padding: "0.6em 1.2em" }}>Search</Button>

                </div>

            </div>

            <div>
                <img 
                src={HeroImage1} 
                alt="" 
                className="object-cover w-full max-h-[500px] max-w-[95%] "
                />
                
            </div>
        </div>
    )
}

export default Herosection;