
import { CheckoutSessionRequest, OrderState } from "@/types/orderType";
import axios from "axios";
import {create} from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const API_END_POINT = "http://localhost:8000/api/v1/order";
axios.defaults.withCredentials=true;

export const useOrderStore = create<OrderState>()(persist((set=>({
loading:false,
orders:[],
createCheckoutSession: async(CheckoutSession:CheckoutSessionRequest) => {
   try {
    set({loading:true});
    const response = await axios.post(`${API_END_POINT}/checkout/create-checkout-session`,CheckoutSession,{
        headers:{
            'Content-Type' : 'application/json'

        }
    });
    // if(response.data.success) KUNKI HAMNE ISME SUCCESS NHI KIA BACKEND M
    // const session = response.data.session;
    window.location.href = response.data.session.url;
    set({loading:false});
} catch (error) {
    set({loading:false});
    console.log(error);
   }
},

getOrderDetails: async () =>{

    try {
        set({loading:true});
    
         const response = await axios.get(`${API_END_POINT}/`);
         console.log('Order Response:', response.data.orders);  // Debugging API response
         set({loading:false, orders:response.data.orders});
    } catch (error:any) {
           set({loading:false});
           console.error('Error fetching order details:', error.response ? error.response.data : error.message);
           alert("Failed to fetch order details. Please try again later."); 
        
        
    }

}

  

})),{

    name:'order-name',
    storage:createJSONStorage(() => localStorage)
}))