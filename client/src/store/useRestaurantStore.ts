import loading from "@/components/loading";
import axios from "axios";

import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = "http://localhost:8000/api/v1/restaurant";
axios.defaults.withCredentials = true;


export const useRestaurantStore = create<any>()(persist((set) => ({

    loading: false,
    restaurant: null,
    searchedRestaurant:null,
    createRestaurant: async (formData: FormData) => {

        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }
        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
            // console.log(error);
        }

    },

    getRestaurant: async () => {
        try {

            set({ loading: true });
            const response = await axios.get(`${API_END_POINT}/`)
            if (response.data.success) {
                set({ loading: false, restaurant: response.data.restaurant });

            }
        } catch (error) {
            if (error.response.status === 404) {
                set({ restaurant: null })
            }
            set({ loading: false });
        }
    },

    updateRestaurant: async (formData: FormData) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if(response.data.success){
                toast.success(response.data.message);
                set({loading:false});
            }

        } catch (error : any) {
            toast.error(error.response.data.message);
            set({loading:false});
        }

    },

    serchRestaurant : async (searchText:string,searchQuery:string, selectedCuisines:any) => {

        try {
             
              set({Loading:true});
             const params = new URLSearchParams();
             params.set("searchQuery", searchQuery);
             params.set("selectedCuisines", selectedCuisines);
              const response = await axios.get(`${API_END_POINT}/search/${searchText}?searchQuery=${searchQuery}?${params.toString}`)
                if(response.data.success){
                    console.log(response.data);
                    set({loading:false,searchedRestaurant: response.data});
                }
        } catch (error) {
            set({Loading:false})
        }
    }

}), {
    name: 'restaurant-name',
    storage: createJSONStorage(() => localStorage)

}))
