
import { useRestaurantStore } from "@/store/useRestaurantStore";
import { Button } from "./ui/button"
// import { Checkbox } from "./ui/checkbox";

import { Label } from "./ui/label";




export type FilterOptionState = {

    id: string;
    label: string;

}


const filterOptions: FilterOptionState[] = [
    { id: "burger", label: "burger" },
    { id: "thali", label: "thali" },
    { id: "biryani", label: "biryani" },
    { id: "momos", label: "momos" },

]


const FilterPage = () => {
    const { setAppliedFilter,appliedFilter,resetAppliedFilter } = useRestaurantStore();

    const appliedFilterHandler = (value: string) => {
        if (appliedFilter.includes(value)) {
            setAppliedFilter(appliedFilter.filter(filter => filter !== value));
        } else {
            setAppliedFilter([...appliedFilter, value]);
        }


    }

    // const Reset = () => {


    // }
    return (
        <div className="md:-w-72">
            <div className="flex items-center justify-between">
                <h1 className="font-medium text-lg"> Filter by Cuisines</h1>
                <Button onClick={ resetAppliedFilter} className="ml-2 bg-orange hover:bg-hoverorange">Reset</Button>
            </div>

            {filterOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2 my-5">
                    <input
                        type="checkbox"
                        id={option.id}
                        checked={appliedFilter.includes(option.label)}
                        className="form-checkbox h-5 w-5 text-white bg-black border-gray-300 rounded focus:ring-2  checked:bg-black checked:border-transparent"
                        onClick={() => appliedFilterHandler(option.label)}
                    />
                    <Label
                        className="text-sm font-medium leading-none"
                        htmlFor={option.id}
                    >
                        {option.label}
                    </Label>
                </div>
            ))}
        </div>
    );
};

export default FilterPage;
