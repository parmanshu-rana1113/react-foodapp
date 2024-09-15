import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {

    const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
    const inputRef = useRef<any>([]);
    // const navigate = useNavigate();
    const loading = false;

    const handleChange = (index: number, value: string) => {

        if (/^[a-zA-z0-9]$/.test(value) || value === "") {

            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

        }
        // MOVE TO THE NEXT FIELD 
        if (value !== "" && index < 5) {

            inputRef.current[index + 1].focus();
        }
    }

    // backspace pr piche aaye
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Backspace" && !otp[index] && index > 0) {

            inputRef.current[index - 1].focus();
        }

    }

    // const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    //     if (e.key === "Backspace" && !otp[index] && index > 0) {
    //         // Set focus to the previous input field
    //         const prevInput = document.getElementById(`otp-${index - 1}`);
    //         if (prevInput) {
    //             (prevInput as HTMLInputElement).focus();
    //         }
    //     }
    // };




    return (
        <div className="flex items-center justify-center h-screen w-full">

            <div className="p-8 rounded-md w-full max-w-md flex flex-col gap-10 border-blue-600 bg-gray-100">

                <div className="text-center">
                    <h1 className="font-extrabold text-2xl">Verify your Email</h1>
                    <p className="text-sm text-gray-600 mt-2">Enter the 6 digit code sent to your Email address</p>

                </div>

                <form action="">

                    <div className="flex  justify-between">

                        {
                            otp.map((letter: string, idx: number) => (

                                <input
                                    type="text"
                                    key={idx}
                                    ref={(element) => (inputRef.current[idx] = element)}
                                    maxLength={1}
                                    value={letter}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(idx, e.target.value)}
                                    onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => handleKeyDown(idx, e)}

                                    className="md:w-12 md:h-12 w-8 h-8 text-center text-sm md:text-xl font-normal md:font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"

                                />
                            ))
                        }
                    </div>

                    {
                        loading ? <button className="bg-orange hover:bg-hoverorange mt-5 w-full flex items-center justify-center"style={{ padding: "0.6em 1.2em" }}>
                            <Loader2
                                className="h-5 w-5 animate-spin "
                            />
                            tikja yaar </button> : <button className="bg-orange hover:bg-hoverorange mt-5 w-full"style={{ padding: "0.6em 1.2em" }}>Verify</button>
                    }



                </form>

            </div>

        </div>
    )
}

export default VerifyEmail;