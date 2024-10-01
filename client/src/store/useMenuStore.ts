import { create } from "zustand";
import axios from "axios";
import { createJSONStorage, persist } from "zustand/middleware";
import { toast } from "sonner";
import { useRestaurantStore } from "./useRestaurantStore";

const API_END_POINT = "http://localhost:8000/api/v1/menu/";
axios.defaults.withCredentials = true;

type MenuState = {

    loading: boolean,
    menu: any,
    createMenu: (FormData: FormData) => Promise<void>;
    editMenu: (menuId: string, FormData: FormData) => Promise<void>;

}

export const useMenuStore = create<MenuState>()(persist((set) => ({
    loading: false,
    menu: null,
    createMenu: async (formData: FormData) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/`, formData, {

                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("Response: ", response);
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, menu: response.data.menu });
            }
            //update restaurant
            useRestaurantStore.getState().addMenuRestaurant(response.data.menu);
        } catch (error: any) {
            set({ loading: false })
            toast.error(error.response.data.message);
        }
    },
    editMenu: async (menuId: string, formData: FormData) => {

        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/${menuId}`, formData, {

                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, menu: response.data.menu });
            }

            //UPDATE RESTAURANT MENU

            useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu);
        } catch (error: any) {

            set({ loading: false });
            console.log("Edit Menu Error: ", error.response || error.message);
            toast.error(error.response.data.message);
        }
    },
  
    // editMenu: async (menuId: string, formData: FormData) => {
    //     try {
    //         set({ loading: true });
    //         const response = await axios.put(`${API_END_POINT}/${menuId}`, formData, {
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //             },
    //         });

    //         if (response.data.success) {
    //             toast.success(response.data.message);
    //             set({ loading: false, menu: response.data.menu });
    //             useRestaurantStore.getState().updateMenuToRestaurant(response.data.menu);
    //         } else {
    //             toast.error("Something went wrong on the server.");
    //         }
    //     } catch (error: any) {
    //         set({ loading: false });
    //         console.log("Edit Menu Error: ", error.response || error.message);
    //         toast.error(error.response?.data?.message || "Internal server error");
    //     }
    // }


    //GETMENU HAMM ADDMENU M RESTAURANT SE LE AAYE HAI
}), {
    name: "menu-name",
    storage: createJSONStorage(() => localStorage)
}))