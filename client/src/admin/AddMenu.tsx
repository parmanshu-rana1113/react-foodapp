import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useState, FormEvent } from "react";
import EditMenu from "./EditMenu";
import { menuFormSchema, menuSchema } from "@/schema/menuScheme";
import { useMenuStore } from "@/store/useMenuStore";
import { useRestaurantStore } from "@/store/useRestaurantStore";
// import { error } from "console";

const menus = [
    {
        title: "Biryani",
        description: "Hyderabadi Biryani",
        price: 80,
        images: "https://media.istockphoto.com/id/1169694902/photo/assorted-indian-non-vegetarian-food-recipe-served-in-a-group-includes-chicken-curry-mutton.jpg?s=612x612&w=0&k=20&c=J4jX3IYGdS3ODgHF0LHCySDo6bFObh0_GZzAqHgXZgU="
    },
    {
        title: "Biryani1",
        description: "Hyderabadi Biryani",
        price: 80,
        images: "https://media.istockphoto.com/id/1169694902/photo/assorted-indian-non-vegetarian-food-recipe-served-in-a-group-includes-chicken-curry-mutton.jpg?s=612x612&w=0&k=20&c=J4jX3IYGdS3ODgHF0LHCySDo6bFObh0_GZzAqHgXZgU="
    },
    {
        title: "Biryani2",
        description: "Hyderabadi Biryani",
        price: 80,
        images: "https://media.istockphoto.com/id/1169694902/photo/assorted-indian-non-vegetarian-food-recipe-served-in-a-group-includes-chicken-curry-mutton.jpg?s=612x612&w=0&k=20&c=J4jX3IYGdS3ODgHF0LHCySDo6bFObh0_GZzAqHgXZgU="
    }
];

const AddMenu = () => {
    const [input, setInput] = useState<any>({
        name: "",
        description: "",
        price: 0,
        image: undefined
    });

    const [open, setOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState<boolean>(false);
    const [selectedMenu, setSelectedMenu] = useState<menuFormSchema>();
    const [errors, setErrors] = useState<Partial<menuFormSchema>>({});
    const { loading, createMenu } = useMenuStore();
    const {restaurant} = useRestaurantStore(); //this is for getmenu, kunki restaurant m sara menu ka data aata h tu vhi se fetch karlnge
    // const loading = false;

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === 'number' ? parseFloat(value) : value });
    };

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const result = menuSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<menuFormSchema>);
            return;
        }

        // console.log(input); 
        //   API sTART 

        try {
            const formData = new FormData();
            formData.append("name", input.name);
            formData.append("description", input.description);
            formData.append("price", input.price.toString());

            if (input.image) {
                formData.append("image", input.image);
            }
            await createMenu(formData);
        } catch (error) {
            console.log(error);
        }


    };

    return (
        <div className="max-w-6xl mx-auto my-10">
            <div className="flex justify-between">
                <h1 className="font-bold lg:font-extrabold md:font-extralight text-lg md:text-2xl">Available Menu</h1>
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                        <Button className="bg-orange hover:bg-hoverorange ">
                            <Plus className="mr-2" />
                            Add Menus
                        </Button>
                    </DialogTrigger>

                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>ADD A NEW MENU</DialogTitle>
                            <DialogDescription>
                                Create a Menu that will make your Restaurant stand out
                            </DialogDescription>
                        </DialogHeader>

                        <form onSubmit={submitHandler} className="space-y-4">
                            <div>
                                <Label>title</Label>
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Enter menu name"
                                    value={input.name}
                                    onChange={changeEventHandler}
                                />
                                {errors && <span className="text-xs font-medium text-red-600">{errors.name}</span>}
                            </div>

                            <div>
                                <Label>Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    placeholder="Enter menu description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                />
                                {errors && <span className="text-xs font-medium text-red-600">{errors.description}</span>}

                            </div>

                            <div>
                                <Label>Price in (Rupees)</Label>
                                <Input
                                    type="number"
                                    name="price"
                                    placeholder="Enter menu price"
                                    value={input.price}
                                    onChange={changeEventHandler}
                                />
                                {errors && <span className="text-xs font-medium text-red-600">{errors.price}</span>}

                            </div>

                            <div>
                                <Label>Menu Upload image</Label>
                                <Input
                                    type="file"
                                    name="image"
                                    onChange={(e) => setInput({ ...input, image: e.target.files?.[0] || undefined })}
                                />
                                {errors && <span className="text-xs font-medium text-red-600">{errors.image?.name}</span>}

                            </div>

                            <DialogFooter className="mt-5">
                                {loading ? (
                                    <Button disabled className="bg-orange hover:bg-hoverorange w-full">
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Loading
                                    </Button>
                                ) : (
                                    <Button className="bg-orange hover:bg-hoverorange w-full">Submit</Button>
                                )}
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid lg:grid-cols-3 gap-2 md:grid-cols-2 md:gap-6">
                {restaurant.menus.map((menu:any, idx:number) => (
                    // console.log(menu),
                    //  console.log(menu.image),  
                    <div className="mt-6 space-y-4" key={idx}>
                        <div className="flex flex-col md:flex-col md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-md">
                            <img
                                src={menu.image}
                                alt="image not available"
                                className="md:h-24 md:w-24 lg:w-72 h-16 w-full object-cover rounded-lg"
                            />
                            <div className="">
                                <h2 className="text-lg font-bold text-gray-800">{menu.title ||menu.name}</h2>
                                <p className="text-sm text-gray-600 mt-1">{menu.description}</p>
                                <h3>Price: <span className="text-[#D19254]">{menu.price}</span></h3>
                            </div>
                            <Button onClick={() => {
                                setSelectedMenu({
                                    name: menu.title, // map title to name
                                    description: menu.description,
                                    price: menu.price,
                                    image: undefined, // You may not have the image initially, so set it to undefined
                                });
                                setEditOpen(true);
                            }} className="bg-orange hover:bg-hoverorange mt-2 w-full">Edit</Button>
                        </div>
                    </div>
                ))}
            </div>

            <EditMenu selectedMenu={selectedMenu} editOpen={editOpen} setEditOpen={setEditOpen} />
        </div>
    );
};

export default AddMenu;
