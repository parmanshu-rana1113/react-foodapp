
export type MenuItem = {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;

}       

export  type Restaurant = {
    _id: string;
    user: string;
    restaurantName: string;
    city: string;
    state: string;
    deliveryTime: number;
    cuisines: string[];
    menus: MenuItem[];
    imageUrl: string;
}

export type searchedRestaurant = {

    data:Restaurant[],
}


export type RestaurantState = {
    loading: boolean;
    restaurant: Restaurant | null;
    searchedRestaurant: searchedRestaurant | null;
    appliedFilter:string[];
    singleRestaurant :Restaurant | null,
    createRestaurant: (formData: FormData) => Promise<void>;
    getRestaurant: () => Promise<void>;

    searchRestaurant: (searachText: string, searchQuery: string, selectedCuisines: any) => Promise<void>;
    addMenuRestaurant: (menu: any) => void;
    // updateMenuToRestaurant: (menu: MenuItem) => <void;
    setAppliedFilter: (value: string) => void
    updateMenuToRestaurant: (menu: MenuItem) => void;
    resetAppliedFilter: () => void;
    getSingleRestaurant: (restaurantId:string) => Promise<void>;

}