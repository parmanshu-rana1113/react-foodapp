import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SignupInputState, userSignupSchema } from "@/schema/userschema";
import { useUserStore } from "@/store/useUserStore";
import { Separator } from "@radix-ui/react-separator";
import { Loader2, LockKeyhole, Mail, PhoneOutgoing, User2 } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// 2 types for TypeScript
// type SignupInputState = {
//   fullname: string;
//   email: string;
//   password: string;
//   contact: string;
// };

const Signup = () => {
  const [input, setInput] = useState<SignupInputState>({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });

  const [errors, setErrors] = useState<Partial<SignupInputState>>({});
  const [serverError, setServerError] = useState<string | null>(null);  // New state to handle server error

  
  // useuserstore se layenge
  const { signup, loading } = useUserStore();
  const navigate = useNavigate();
  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const loginSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevents page refresh

    setServerError(null);

    // FORM VALIDAITON CHECK

    const result = userSignupSchema.safeParse(input);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors as Partial<SignupInputState>);
      // setErrors(result.errors);
      return;
    }

    // api implementation  start here
    try {
      await signup(input);
      navigate("/verify-email");
    } catch (error: any) {
      // Capture and display server error (like "User already exists")
      if (error.response && error.response.data) {
        setServerError(error.response.data.message);
      }
    }
    // console.log(input);
  };

  // const loading = false;  //dynamic krdia

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        onSubmit={loginSubmitHandler}
        action=""
        className="md:p-8 w-full max-w-md rounded-lg md:border border-gray-500 mx-4"
      >
        <div className="mb-4">
          <h1 className="font-bold text-4xl text-center">FOODIZM</h1>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Full Name"
              name="fullname"
              value={input.fullname}
              onChange={changeEventHandler}
              style={{
                height: "48px", // Fixed height for input
                width: "100%",
                paddingLeft: "40px", // Space for icon
                paddingRight: "16px",
                borderRadius: "8px",
                fontSize: "16px",
                border: "1px solid #ccc",
                boxSizing: "border-box",
              }}
            />
            <User2
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "#888",
                width: "20px",
                height: "20px",
              }}
            />
            {
              errors && <span className="text-xs text-red-500 w-100">{errors.fullname}</span>
            }
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="text"
              placeholder="Contact"
              name="contact"
              value={input.contact}
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
            <PhoneOutgoing
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "#888",
                width: "20px",
                height: "20px",
              }}
            />
            {
              errors && <span className="text-xs text-red-500">{errors.contact}</span>
            }
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email"
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
              }}
            />
            {
              errors && <span className="text-xs text-red-500">{errors.email}</span>
            }
          </div>
        </div>

        <div className="mb-4">
          <div className="relative">
            <Input
              type="password"
              placeholder="Password"
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
            <LockKeyhole
              style={{
                position: "absolute",
                left: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "#888",
                width: "20px",
                height: "20px",
              }}
            />

            {
              errors && <span className="text-xs text-red-500">{errors.password}</span>
            }
          </div>
        </div>

        <div className="mb-7">
          {loading ? (
            <Button disabled className="w-full bg-orange hover:bg-hoverorange" style={{ padding: "0.6em 1.2em" }}>
              <Loader2 className="mr-1 h-5 w-5 animate-spin" />
              wait
            </Button>
          ) : (
            <Button type="submit" className="w-full bg-orange hover:bg-hoverorange" style={{ padding: "0.6em 1.2em" }}>
              Signup
            </Button>
          )}
        </div>

        <Separator />

        <p className="mt-3">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
