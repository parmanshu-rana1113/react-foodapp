import {z} from "zod";

export const menuSchema = z.object({

    name:z.string().nonempty({message:"name is required"}),
    description:z.string().nonempty({message:"description is required"}),
    price:z.number().min(0,{message:"Price can not be negative"}),
    image:z.instanceof(File).optional().refine((file) => file?.size !==0,{message:"Image file is  required"}),
});

export type menuFormSchema = z.infer<typeof menuSchema>

