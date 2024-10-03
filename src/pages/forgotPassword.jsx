import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Link, useNavigate } from "react-router-dom";
import { Canvas } from "@react-three/fiber";
import { Sandwich } from "../components/Sandwich";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const { resetPassword } = useAuth();

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      await resetPassword(email);
      setMessage(
        "Password reset link has been sent to your email. Please check your inbox."
      );
    } catch (error) {
      console.error("Error resetting password:", error.message);
      setError("Error resetting password: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen block">
      <div className="absolute z-10 left-1/2 -translate-x-1/2 h-full w-full lg:w-[50%] justify-center flex items-center">
        <div className="w-[80%] lg:w-[70%] h-[60%] lg:h-[50%] shadow-inner lg:shadow-2xl bg-[#fff] justify-center flex items-center">
          <div className="flex flex-col m-auto w-[80%] h-full justify-left items-center pt-5 transition-all">
            <h1 className="text-[#6F4E37] text-4xl font-bold p-5 w-full">
              Forgot Password
            </h1>
            <form
              onSubmit={handlePasswordReset}
              className="p-5 w-full h-[60%]"
            >
              <label
                htmlFor="email"
                className="font-medium text-[#6F4E37]"
              >
                Enter your email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-8 block w-full bg-inherit border-b-2 border-[#ffa500] transition-colors focus:border-[#ffa60077] text-[#6F4E37] outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#6F4E37] text-white py-2 px-3 rounded-md font-bold text-lg mt-8"
              >
                {loading ? "Sending reset link..." : "Send Reset Link"}
              </button>
            </form>
            <div className="text-sm text-black mt-4">
              {message && <p className="text-green-600">{message}</p>}
              {error && <p className="text-red-600">{error}</p>}
            </div>
            <div className="flex flex-col w-full p-5 py-5 px-0 md:px-10 gap-5 border-t-2">
              <Link
                to="/signIn"
                className="w-full underline text-[#eb7623]"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-full lg:w-full lg:h-full z-0">
        <Canvas camera={{ position: [1, 3, 10] }}>
          <color
            attach="background"
            args={["#ffa500"]}
          />
          <Sandwich />
        </Canvas>
      </div>
    </div>
  );
};

export default ForgotPassword;
