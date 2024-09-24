import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RestauarantFormSchema, restaurantFormSchema } from "@/schema/restaurantSchema";
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";


const Restaurant = () => {

    const [input, setInput] = useState<RestauarantFormSchema>({
        restaurantName: "",
        city: "",
        state: "",
        deliveryTime: 0,
        cuisines: [],
        imageFile: undefined

    });
    const [errors, setErrors] = useState<Partial<RestauarantFormSchema>>({});
    const { loading, restaurant, updateRestaurant, createRestaurant } = useRestaurantStore();

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {

        // const type = e.target.type;
        const { name, value, type } = e.target
        setInput({ ...input, [name]: type === 'number' ? Number(value) : value });
    }

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault();

        const result = restaurantFormSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<RestauarantFormSchema>)
            return;
        }

        // setErrors({});
        try {

            // ADD RESTAURATN API IMPLEMENTATION 
            const formData = new FormData();
            formData.append("restaurantName", input.restaurantName);
            formData.append("city", input.city);
            formData.append("state", input.state);
            formData.append("deliveryTime", input.deliveryTime.toString());
            formData.append("cuisines", JSON.stringify(input.cuisines));

            if (input.imageFile) {

                formData.append("imageFile", input.imageFile);
            }

            if (restaurant) {
                // to update karenge
                await updateRestaurant(formData);
            }
            else {
                // CREATE KARNEGE
                await createRestaurant(formData)
            }
            // console.log(input);
            // await createRestaurant(formData);
        } catch (error) {
            console.log(error);
        }


    }
    // const loading = false;
    const restaurantHai = false;
    return (
        <div className="max-w-6xl mx-auto my-10">

            <div>
                <div>
                    <h1 className="font-extrabold text-2xl mb-5">Add Restaurant</h1>

                    <form onSubmit={submitHandler} action="" className="">
                        <div className="md:grid grid-cols-2 gap-6 spaces-y-2 md:spaces-y-0">
                            {/* RESTAURANT NAME  */}
                            <div>
                                <Label>Restaurant Name</Label>
                                <Input
                                    type="text"
                                    name="restaurantName"
                                    value={input.restaurantName}
                                    onChange={changeEventHandler}
                                    placeholder="Enter yur Restaurant Name"
                                />
                                {errors && <span className="text-sm text-red-600 font-medium">{errors.restaurantName}</span>}
                            </div>
                            <div>
                                <Label>City</Label>
                                <Input
                                    type="text"
                                    name="city"
                                    value={input.city}
                                    onChange={changeEventHandler}

                                    placeholder="Enter yur City Name"
                                />
                                {errors && <span className="text-sm text-red-600 font-medium">{errors.city}</span>}
                            </div>

                            <div>
                                <Label>State</Label>
                                <Input
                                    type="text"
                                    name="state"
                                    value={input.state}
                                    onChange={changeEventHandler}

                                    placeholder="Enter yur State Name"
                                />
                                {errors && <span className="text-sm text-red-600 font-medium">{errors.state}</span>}
                            </div>

                            <div>
                                <Label>Delivery Time</Label>
                                <Input
                                    type="number"
                                    name="deliveryTime"
                                    value={input.deliveryTime}
                                    onChange={changeEventHandler}

                                    placeholder="Enter Delivery Time"
                                />
                                {errors && <span className="text-sm text-red-600 font-medium">{errors.deliveryTime}</span>}
                            </div>




                            <div>
                                <Label>Cuisines</Label>
                                <Input
                                    type="text"
                                    name="cuisines"
                                    value={input.cuisines}
                                    onChange={(e) => setInput({ ...input, cuisines: e.target.value.split(",") })}

                                    placeholder="e.g. Momos Biryani"
                                />
                                {errors && <span className="text-sm text-red-600 font-medium">{errors.cuisines}</span>}
                            </div>


                            <div>
                                <Label>Upload Restaurant Banner</Label>
                                <Input
                                    onChange={(e) => setInput({ ...input, imageFile: e.target.files?.[0] || undefined })}
                                    type="file"
                                    accept="image/*"
                                    name="imageFile"
                                />
                                {/* Error is shown only after form submission */}
                                {errors.imageFile && (
                                    <span className="text-sm text-red-600 font-medium">{errors.imageFile?.name || "Image File is Required"}</span>
                                )}
                            </div>
                        </div>
                        <div className="my-5 w-fit">
                            {
                                loading ? (
                                    <Button disabled className="bg-orange hover:bg-orange">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        wait
                                    </Button>

                                ) : <Button type="submit" className="bg-orange hover:bg-orange">
                                    {restaurantHai ? 'Update Your Restaurant' : " Add Your Restaurant"}
                                </Button>
                            }

                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Restaurant;