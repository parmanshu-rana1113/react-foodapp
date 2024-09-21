import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { menuFormSchema, menuSchema } from "@/schema/menuScheme";
import { Loader2 } from "lucide-react";
import { Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";

type EditMenuProps = {
  selectedMenu?: { name: string; description: string; price: number; image?: File | undefined };
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
  const loading = false;





  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setInput({ ...input, [name]: type === 'number' ? Number(value) : value })
  }
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = menuSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<menuFormSchema>)
    }
    console.log(input)
  }

  // useEffect return se ekdamm upar use krte hai ,,, this time ye use kunki ye sabse pehle call hota h react lifexyxle m tu sbse pheele hameme purana data chiye 
  useEffect(() => {
    setInput({
      name: selectedMenu?.name || "",
      description: selectedMenu?.description || "",
      price: selectedMenu?.price || 0,
      image: undefined,
    })
  }, [selectedMenu])
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
              {errors && <span className="text-xs font-medium text-red-600">{errors.image?.name || "image is required"}</span>}
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
        ) : (<p>no menu</p>

        )}
      </DialogContent>

    </Dialog>
  )

}

export default EditMenu;