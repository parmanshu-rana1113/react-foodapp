
import { Button } from "@/components/ui/button";
import { LoginInputState, userLoginSchema } from "@/schema/userschema";
import { useUserStore } from "@/store/useUserStore";
import { Separator } from "@radix-ui/react-separator";
import { Loader2, LockKeyhole, Mail, } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//  2 type of define typescript  

// type LoginInputState = {

//     email:string;
//     password: string;
// }

const Login = () => {

    const [input, setInput] = useState<LoginInputState>({

        email: "",
        password: "",
    })

    const [errors, setErrors] = useState<Partial<LoginInputState>>({});

    const { loading, login } = useUserStore();
    const navigate = useNavigate();

    const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        setInput({ ...input, [name]: value });

    }

    // login pr click krne pr 

    const loginSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault(); // click krne pr pg refresh na ho 

        const result = userLoginSchema.safeParse(input);
        if (!result.success) {
            const fieldErrors = result.error.formErrors.fieldErrors;
            setErrors(fieldErrors as Partial<LoginInputState>);
            return;
        }

        // console.log(input);


        try {
            await login(input);
            navigate("/");
        } catch (error) {
            console.log(error)
        }
    };


    // const loading = false;

    return (
        <div className="flex items-center justify-center min-h-screen">

            <form onSubmit={loginSubmitHandler} action="" className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-500 mx-4">
                <div className="mb-4">
                    <h1 className="font-bold text-2xl">EATS</h1>
                </div>
                <div className="mb-4">
                    <div className="relative">
                        {/* <label htmlFor="">Email :</label> */}
                        <input type="email" placeholder=" Email"
                            name="email"
                            value={input.email}
                            onChange={changeEventHandler}

                            style={{
                                height: "48px",
                                width: "100%",
                                paddingLeft: "40px",
                                paddingRight: "16px",
                                borderRadius: "8px",
                                fontSize: "16px",
                                border: "1px solid #ccc",
                                boxSizing: "border-box",
                            }}
                        />

                        <Mail

                            style={{
                                position: "absolute",
                                left: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                pointerEvents: "none",
                                color: "#888",
                                width: "20px",
                                height: "20px",
                            }} />
                        {
                            errors && <span className="block mt-1 text-xs text-red-500">{errors.email}</span>
                        }

                    </div>
                </div>

                <div className="mb-4">
                    <div className="relative">
                        {/* <label htmlFor="">Email :</label> */}
                        <input type="Password" placeholder="Password"
                            name="password"
                            value={input.password}
                            onChange={changeEventHandler}

                            style={{
                                height: "48px",
                                width: "100%",
                                paddingLeft: "40px",
                                paddingRight: "16px",
                                borderRadius: "8px",
                                fontSize: "16px",
                                border: "1px solid #ccc",
                                boxSizing: "border-box",
                            }}
                        />
                        <LockKeyhole className=" pointer-events-none"

                            style={{
                                position: "absolute",
                                left: "10px",
                                top: "50%",
                                transform: "translateY(-50%)",
                                pointerEvents: "none",
                                color: "#888",
                                width: "20px",
                                height: "20px",
                            }} />
                        {
                            errors && <span className="text-xs text-red-500">{errors.email}</span>
                        }
                    </div>

                </div>


                <div className="mb-7 ">
                    {
                        loading ? <Button disabled className="w-full bg-orange hover:bg-hoverorange" style={{ padding: "0.6em 1.2em" }}><Loader2 className="mr-1 h-5 w-5 animate-spin" />TikJaa Yaar</Button> : (<button type="submit" className="w-full bg-orange hover:bg-hoverorange" style={{ padding: "0.6em 1.2em" }}>Login</button>)

                    }
                    <div className="mt-4">
                        <Link to="/ForgetPassword" className="hover:text-blue-500 hover:underline">Forget Password</Link>
                    </div>


                </div>


                <Separator />

                <p className="mt-3">

                    Don't have an account?{" "}

                    <Link to={"/signup"} className="text-blue-600">SignUp</Link>

                </p>




            </form>
        </div>
    )
}

export default Login