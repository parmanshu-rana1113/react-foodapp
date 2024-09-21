import mongoose from "mongoose";
import { Document } from "mongoose";
// import { number, string } from "zod";

export interface IRestaurant {
    user: mongoose.Schema.Types.ObjectId;
    restaurantName: string;
    city: string;
    state: string;
    deliveryTime: number;
    cuisines: string[];
    imageUrl: string;
    menus: mongoose.Schema.Types.ObjectId[] //AGAR KISI BANDE KI JYADA MENU HAI TO VO ARRAY M STORE KRSKATA HAI

}

export interface IRestaurantDocument extends IRestaurant, Document {

    createdAt: Date;
    updatedAt: Date;
}
const restaurantSchema = new mongoose.Schema<IRestaurantDocument>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    restaurantName: {
        type:String,
        required: true
    },
    city: {
        type:String,
        required: true
    },
    state: {
        type:String,
        required: true
    },
    deliveryTime: {
        type: Number,
        required: true
    },
    cuisines: [{  type:String, required: true }],
    menus: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
    imageUrl: {
        type:String,
        required: true
    }


},{timestamps:true});
export const Restaurant = mongoose.model("Restaurant", restaurantSchema)