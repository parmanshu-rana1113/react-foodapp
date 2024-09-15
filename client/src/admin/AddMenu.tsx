import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Plus } from "lucide-react";
import { useState, FormEvent } from "react";
import EditMenu from "./EditMenu";

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
        title: "",
        description: "",
        price: 0,
        image: undefined
    });

    const [open, setOpen] = useState<boolean>(false);
    const [editOpen, setEditOpen] = useState <boolean>(false);
    const [selectedMenu, setSelectedMenu] = useState<any>();
    const loading = false;

    const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setInput({ ...input, [name]: type === 'number' ? parseFloat(value) : value });
    };

    const submitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(input); // logs the form data
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
                            </div>

                            <div>
                                <Label>Menu Upload image</Label>
                                <Input
                                    type="file"
                                    name="image"
                                    onChange={(e) => setInput({ ...input, image: e.target.files?.[0] || undefined })}
                                />
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
                {menus.map((menu, idx) => (
                    <div className="mt-6 space-y-4" key={idx}>
                        <div className="flex flex-col md:flex-col md:items-center md:space-x-4 md:p-4 p-2 shadow-md rounded-md">
                            <img
                                src={menu.images}
                                alt="image not available"
                                className="md:h-24 md:w-24 lg:w-72 h-16 w-full object-cover rounded-lg"
                            />
                            <div className="">
                                <h2 className="text-lg font-bold text-gray-800">{menu.title}</h2>
                                <p className="text-sm text-gray-600 mt-1">{menu.description}</p>
                                <h3>Price: <span className="text-[#D19254]">{menu.price}</span></h3>
                            </div>
                            <Button onClick={() => {
                                setSelectedMenu(menu);
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
