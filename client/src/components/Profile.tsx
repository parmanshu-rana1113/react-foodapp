import { Loader2, LocateIcon, Mail, MapIcon, MapPin, MapPinHouseIcon, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { FormEvent, useRef, useState } from "react";
import { Input } from "./ui/input";

import { Label } from "./ui/label";
import { Button } from "./ui/button";

// type ProfileDataState = {

//     fullname : string;
//     email:string;
//     phone:string;
//     address:string;
//     city:string;
//     state :string;

// }

const Profile = () => {

    const [ProfileData, setProfileData] = useState({

        fullname: "",
        email: "",

        address: "",
        city: "",
        state: "",

        profilePicture: "",

    })

    const imageRef = useRef<HTMLInputElement | null>(null);
    const [SelectedProfilePicture, setSelectedProfilePicture] = useState<string>("");

    const loading = false;
    const FileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const result = reader.result as string;
                setSelectedProfilePicture(result);
                setProfileData((prevData) => ({
                    ...prevData,
                    profilePicture: result
                }))
            };
            reader.readAsDataURL(file); // This is necessary to trigger the onloadend event
        }
    };

    const ChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        setProfileData({ ...ProfileData, [name]: value });
    }

    const updateProfileHandler = (e: FormEvent<HTMLInputElement>) => {
        e.preventDefault();
    //  update  profile api implementation
        
    }
    return (
        <form onSubmit={updateProfileHandler} action="" className="max-w-7xl mx-auto my-5">
  
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">

                    <Avatar className="relative md:w-28 md:h-28 w-20 h-20">
                        <AvatarImage src={SelectedProfilePicture} />
                        <AvatarFallback>
                            cn
                        </AvatarFallback>


                        <input ref={imageRef} type="file" className="hidden" accept="image/*" onChange={FileChangeHandler} />
                        <div onClick={() => imageRef.current?.click()} className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50 rounded-full cursor-pointer">

                            <Plus className="text-white w-8 h-9" />


                        </div>




                    </Avatar>

                    <Input
                        type="text"
                        name="fullname"
                        value={ProfileData.fullname}
                        onChange={ChangeHandler}
                        className="font-bold text-2xl outline-none border-none focus-visible:ring-transparent shadow-xl"
                    />


                </div>
            </div>

            <div className="grid md:grid-cols-4 md:gap-2 gap-3 my-10 ">
                <div className="flex items-center gap-4 rounded-sm p-2 bg-gray-200">

                    <Mail className=" text-gray-500" />
                    <div className="w-full">
                        <Label>Email</Label>
                        <input
                            name="email"
                            value={ProfileData.email}
                            onChange={ChangeHandler}
                            className="w-full text-black bg-gray-100 focus-visible:ring-0 focus-visible:border-transparent outline-none border-none shadow-lg"
                        />

                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-sm p-2  bg-gray-200">

                    <MapPinHouseIcon className=" text-gray-500" />
                    <div className="w-full">
                        <Label>Address</Label>
                        <input
                            name="address"
                            value={ProfileData.address}
                            onChange={ChangeHandler}
                            className="w-full text-black bg-gray-100 focus-visible:ring-0 focus-visible:border-transparent outline-none border-none shadow-lg"
                        />

                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-sm p-2  bg-gray-200">

                    <MapPin className=" text-gray-500" />
                    <div className="w-full">
                        <Label>City</Label>
                        <input
                            name="city"
                            value={ProfileData.city}
                            onChange={ChangeHandler}
                            className="w-full text-black bg-gray-100 focus-visible:ring-0 focus-visible:border-transparent outline-none border-none shadow-lg"
                        />

                    </div>
                </div>

                <div className="flex items-center gap-4 rounded-sm p-2  bg-gray-200">

                    <LocateIcon className=" text-gray-500" />
                    <div className="w-full">
                        <Label>State</Label>
                        <input
                            name="state"
                            value={ProfileData.state}
                            onChange={ChangeHandler}
                            className="w-full text-black bg-gray-100 focus-visible:ring-0 focus-visible:border-transparent outline-none border-none shadow-lg"
                        />

                    </div>
                </div>
            </div>

            <div className="text-center">
  
             {
                loading ? <Button  className="bg-orange hover:bg-hoverorange" disabled><Loader2 className="mr-2 w-5 h-5 animate-spin"/>Wait</Button> : <Button className="bg-orange hover:bg-hoverorange">Update</Button>  
             }
            </div>
        </form>
    )
}
export default Profile;