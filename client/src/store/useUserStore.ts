import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "@/schema/userschema";
import { toast } from "sonner"

// USER API ENDPOINT
const API_END_POINT = "http://localhost:8000/api/v1/user"

axios.defaults.withCredentials = true;

export const useUserStore = create<any>()(persist((set) => ({

    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading: false,

    //  signup api implementation 

    signup: async (input: SignupInputState) => {
        try {
            set({ loading: true });  
            const response = await axios.post(`${API_END_POINT}/signup`, input, {
                headers: {
                    'Content-Type': 'application/json',  
                }
            });
            // const response = await

            if (response.data.success) {
                console.log(response.data);
                toast.success(response.data.message);
                set({ loading:false, user: response.data.user, isAuthenticated: true });  

            }
        }catch (error: any) {
            console.log("Error in signup:", error);  // Log the entire error for debugging
            const message = error.response?.data?.message || "An unexpected error occurred";
            toast.error(message);
            set({ loading: false });
        }
    },

    login: async (input: LoginInputState) => {

        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/login`, input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            // const response = await

            if (response.data.success) {
                console.log(response.data);
                toast.success(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }
        } catch (error: any) {
            // console.log(error)
            toast.error(error.response.data.message);
            set({ loading: false })

        }
    }

}),
    {
        name: 'user-name',
        storage: createJSONStorage(() => localStorage),
    }
))