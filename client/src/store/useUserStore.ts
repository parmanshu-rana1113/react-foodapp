import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import { LoginInputState, SignupInputState } from "@/schema/userschema";
import { toast } from "sonner"



// USER API ENDPOINT
const API_END_POINT = "http://localhost:8000/api/v1/user"

axios.defaults.withCredentials = true;
type User = {
    fullname: string;
    email: string;
    contact: string;
    city: string;
    country: string;
    profilePicture: String;
    admin: boolean;
    isVerified: boolean;


}

type UserState = {
    user: User | null;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;

    // FUNCTION KA TYPE AISE DEFINE KARNGE
    signup: (input: SignupInputState) => Promise<void>;
    login: (input: LoginInputState) => Promise<void>;
    verifyEmail: (verificationCode: string) => Promise<void>;
    checkingAuthentication: () => Promise<void>;
    checkAuthentication: () => Promise<void>;
    logout: () => Promise<void>;
    forgotPassword: (email: string) => Promise<void>;
    resetPassword: (token: string, newPassword: string) => Promise<void>;
    updateProfile: (input: unknown) => Promise<void>;
}

export const useUserStore = create<UserState>()(persist((set) => ({

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
                set({ loading: false, user: response.data.user, isAuthenticated: true });

            }
        } catch (error: any) {
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
                    'Content-Type': 'application/json',
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
    },
    verifyEmail: async (verificationCode: string) => {

        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/verify-email`, { verificationCode }, {

                headers: {
                    'Content-Type': 'application/json',
                }
            });
            if (response.data.success) {
                toast.success(response.data.message)
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }
            return response.data
        } catch (error: any) {
            console.log(error)
            toast.success(error.response.data.message)

            set({ loading: false });

        }

    },
    // 24 hour k ander agar dubara login krne ki jarurat ni h, tu vo check  karega ki iski cookies m token hai kya 
    // checkAuthentication: async () => {
    //     try {
    //         set({ isCheckingAuth: true });
    //         const response = await axios.get(`API_END_POINT/check-authentication`);
    //         if (response.data.success) {
    //             set({ loading: false, user: response.data.user, isAuthenticated: true, isCheckingAuth: false, })
    //         }
    //     } catch (error) {
    //         set({ loading: false, isAuthenticated: false, isCheckingAuth: false });
    //     }

    // },

    checkAuthentication: async () => {
        try {
            set({ isCheckingAuth: true, loading: true });  // Set to true when checking begins
            const response = await axios.get(`API_END_POINT/check-auth`);
            
            if (response.data.success) {
                set({
                    user: response.data.user,
                    isAuthenticated: true,
                    isCheckingAuth: false,  // Set to false after success
                    loading: false  // Remove loading state
                });
            } else {
                set({
                    isAuthenticated: false,
                    isCheckingAuth: false,  // Set to false in case of failure
                    loading: false
                });
            }
        } catch (error) {
            // On error, set the flags back to false
            set({
                isAuthenticated: false, 
                isCheckingAuth: false,  // Set to false if error occurs
                loading: false
            });
        }
    },
    


    logout: async () => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/logout`);
            if (response.data.success) {

                toast.success(response.data.message);
                set({ loading: false, user: null, isAuthenticated: false })

            }
        } catch (error) {
            set({ loading: false })
        }
    },
    forgotpPassword: async (email: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/forgot-password`, { email });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }
        } catch (error: never) {
            toast.error(error.response.data.message);
            set({ loading: false });
        }
    },
    resetPassword: async (token: string, newPassword: string) => {
        try {
            set({ loading: true });
            const response = await axios.post(`${API_END_POINT}/reset-password/${token}`, { newPassword });
            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false });
            }
        } catch (error: any) {
            toast.success(error.response.data.message);
            set({ loading: false });

        }
    },
    updateProfile: async (input:never) => {
        try {
            set({ loading: true });
            const response = await axios.put(`${API_END_POINT}/profile/update`, input, {
                headers: {
                    'Content-Type': 'application/json',
                }


            });


            if (response.data.success) {
                toast.success(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }


        } catch (error) {

            set({ loading: false });
        }
    }

}),
    {
        name: 'user-name',
        storage: createJSONStorage(() => localStorage),
    }
))