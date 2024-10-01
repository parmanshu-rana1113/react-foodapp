import { Button } from "@/components/ui/button";
import { Loader2,  MailIcon } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ForgetPassword = () => {

    const [email, setEmail] = useState<string>("");
    const loading = false;

    return (
        <div className="flex items-center justify-center min-h-screen w-96 ">

            <form action="" className="flex flex-col gap-5 md:p-8 w-full max-wd-md rounded-lg mx-4 ">
                <div className="text-center">
                    <h1 className="font-extrabold text-2xl mb-2">Forget Password</h1>
                    <p className="text-sm text-gray-600">Enter your email address to reset your password</p>
                </div>
                <div className="relative w-full">
                    <input type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your Email"

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
                    <MailIcon
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
                </div>
                {
                    loading ? (
                        <button
                            disabled
                            className="bg-orange hover:bg-hoverorange flex items-center justify-center opacity-50 cursor-not-allowed"
                        >
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Tikjaa Yaar
                        </button>
                    ) : (
                        <Button className="bg-orange hover:bg-hoverorange" style={{ padding: "0.6em 1.2em" }}>Send Reset Link</Button>
                    )
                }

                <span className="text-gray-700">
                    Back to{" "} login
                    {/* abhi link ni lgaya  */}

                    <Link to={"/login"} className="text-blue-600"> login</Link>
                </span>

            </form>
        </div >
    )
}

export default ForgetPassword;