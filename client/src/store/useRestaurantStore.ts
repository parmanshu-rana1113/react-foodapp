// import loading from "@/components/loading";
import { MenuItem, RestaurantState } from "@/types/restaurantType";
import axios from "axios";

import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = "http://localhost:8000/api/v1/restaurant";
axios.defaults.withCredentials = true;





export const useRestaurantStore = create<RestaurantState>()(persist((set) => ({

    loading: false,
    restaurant: null,
    searchedRestaurant: null,
    appliedFilter: [],
    singleRestaurant: null,
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
        } catch (error: any) {
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

            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }

        } catch (error: any) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }

    },

    searchRestaurant: async (searchText: string, searchQuery: string, selectedCuisines: any) => {

        try {

            set({ loading: true });
            const params = new URLSearchParams();
            params.set("searchQuery", searchQuery);
            params.set("selectedCuisines", selectedCuisines.join(","));
            // params.set("selectedCuisines", Array.isArray(selectedCuisines) ? selectedCuisines.join(",") : "");


            //    await new Promise((resolve) => setTimeout(resolve, 2000)); 
            const response = await axios.get(`${API_END_POINT}/search/${searchText}?${params.toString()}`)
            // const response = await axios.get(`${API_END_POINT}/search/${searchText}?searchQuery=${searchQuery}&${params.toString()}`);

            if (response.data.success) {
                console.log(response.data);
                set({ loading: false, searchedRestaurant: response.data });
            }
        } catch (error) {
            set({ loading: false })
        }
    },
    addMenuToRestaurant: (menu: MenuItem) => {
        set((state: any) => ({
            restaurant: state.restaurant ? { ...state.restaurant, menus: [...state.restaurant.menus, menu] } : null,
        }))
    },
    updateMenuToRestaurant: (updatedMenu: MenuItem) => {

        set((state: any) => {

            if (state.restaurant) {
                const updateMenuList = state.restaurant.menus.map((menu: any) => menu._id === updatedMenu._id ? updatedMenu : menu);
                return {
                    restaurant: {
                        ...state.restaurant,
                        menus: updateMenuList
                    }
                }

            }
            return state;
        })

    },
    setAppliedFilter: (value: string) => {

        set((state) => {
            const isAlreadyApplied = state.appliedFilter.includes(value);
            const updatedFilter = isAlreadyApplied ? state.appliedFilter.filter((item) => item !== value) : [...state.appliedFilter, value]
            return { appliedFilter: updatedFilter }
        })
    },
    resetAppliedFilter: () => {
        set({ appliedFilter: [] });
    },
    getSingleRestaurant: async (restaturantId:string) => {

        try {
             const response = await axios.get(`${API_END_POINT}/${restaturantId}`);
              if( response.data.success) {
                console.log(response.data);
                set({ singleRestaurant: response.data.restaurant})
              }
            } catch (error) {
                console.log(error);

            
        }
    }

   


}), {
    name: 'restaurant-name',
    storage: createJSONStorage(() => localStorage)

}))
