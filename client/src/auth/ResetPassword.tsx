import {Loader2, LockKeyholeIcon,} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const ResetPassword = () => {

    const [newPassword, setNewPassword] = useState<string>("");
    const loading = false;

    return (
        <div className="flex items-center justify-center min-h-screen w-full">

            <form action="" className="flex flex-col gap-5 md:p-8 w-full max-wd-md rounded-lg mx-4">
                <div className="text-center">
                    <h1 className="font-extrabold text-2xl mb-2">Reset Password</h1>
                    <p className="text-sm text-gray-600">Enter your email new password</p>
                </div>
                <div className="relative w-full">
                    <input type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter Your new password"

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
                    <LockKeyholeIcon
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
                        <button className="bg-orange hover:bg-hoverorange">Reset</button>
                    )
                }
                
                <span className="text-gray-700">
                    Back to{" "} login{" "} 
                    {/* abhi link ni lgaya  */}
                    <Link to={"/login"} className="text-blue-600">Login</Link>
                
                </span>

            </form>
        </div >
    )
}

export default ResetPassword;