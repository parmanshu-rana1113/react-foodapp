import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { menuFormSchema, menuSchema } from "@/schema/menuScheme";
import { useMenuStore } from "@/store/useMenuStore";
import { Loader2 } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
// import { toast } from "sonner";

type EditMenuProps = {
  selectedMenu?: {
    _id: any; name: string; description: string; price: number; image?: File | undefined 
};
  editOpen: boolean;
  setEditOpen: (open: boolean) => void;
};

const EditMenu: React.FC<EditMenuProps> = ({ selectedMenu, editOpen, setEditOpen }) => {
  const [input, setInput] = useState<menuFormSchema>({
  
    name: "",
    description: "",
    price: 0,
    image: undefined
  });
  const [errors, setErrors] = useState<Partial<menuFormSchema>>({});

  const { loading, editMenu } = useMenuStore();

 

  // Change event handler to handle form inputs
  const changeEventHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === 'number' ? Number(value) : value });
  };

  // Submit handler for form submission
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting with selectedMenu: ", selectedMenu);


  

    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<menuFormSchema>);
      return;
    }
    console.log(input);
    
    if (!selectedMenu || !selectedMenu._id) {

      console.error("Selected menu item is missing an ID.");
      return;
    }
    // API call to update the menu
    try {
      const formData = new FormData();
      formData.append("name", input.name);
      formData.append("description", input.description);
      formData.append("price", input.price.toString());
      if(input.image){
        formData.append("image", input.image);
      }
  
      await editMenu(selectedMenu._id, formData);
    } catch (error) {
      console.log(error);
    }
  };

   // This useEffect should be outside of the submitHandler
   useEffect(() => {
    console.log("Selected Menu in hai useEffect: ", selectedMenu);
    if (selectedMenu) {
      setInput({
      
        name: selectedMenu.name || "",
        description: selectedMenu.description || "",
        price: selectedMenu.price || 0,
        image: undefined,  // Image may not be available initially
      });
    }
  }, [selectedMenu]);

  // Return JSX for rendering the EditMenu dialog
  return (
    <Dialog open={editOpen} onOpenChange={setEditOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Menu</DialogTitle>
          <DialogDescription>
            Update Your Menu to Keep your offerings fresh and exciting!
          </DialogDescription>
        </DialogHeader>

        {selectedMenu ? (
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter menu name"
                value={input.name}
                onChange={changeEventHandler}
              />
              {errors.name && <span className="text-xs font-medium text-red-600">{errors.name}</span>}
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
              {errors.description && <span className="text-xs font-medium text-red-600">{errors.description}</span>}
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
              {errors.price && <span className="text-xs font-medium text-red-600">{errors.price}</span>}
            </div>

            <div>
              <Label>Menu Upload image</Label>
              <Input
                type="file"
                name="image"
                onChange={(e) => setInput({ ...input, image: e.target.files?.[0] || undefined })}
              />
              {errors.image?.name && <span className="text-xs font-medium text-red-600">{errors.image.name}</span>}
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
        ) : (
          <p>No menu selected</p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditMenu;
