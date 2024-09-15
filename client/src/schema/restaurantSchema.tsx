import {z} from "zod";

export const restaurantFormSchema = z.object({

    restaurantName:z.string().nonempty({message:"Restaurant name is required"}),
    city:z.string().nonempty({message:"city is required"}),
    state:z.string().nonempty({message:"state is required"}),
    deliveryTime:z.number().min(0,{message:"Delivevry time is not negative"}),
    cuisines:z.array(z.string()),
    imageFile:z.instanceof(File).optional().refine((file) => file?.size !== 0 , {message: "Image File is Required"}),
});

export type RestauarantFormSchema = z.infer<typeof restaurantFormSchema>