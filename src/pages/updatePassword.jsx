import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import { Canvas } from "@react-three/fiber";

const UpdatePassword = () => {
  const { updatePassword } = useAuth();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setError("Error updating password: " + error.message);
      } else {
        setMessage("Password updated successfully!");
        navigate("/signIn");
      }
    } catch (error) {
      setError("Error updating password: " + error.message);
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
              Update Password
            </h1>
            <form
              onSubmit={handlePasswordUpdate}
              className="p-5 w-full h-[60%]"
            >
              <label
                htmlFor="newPassword"
                className="font-medium text-[#6F4E37]"
              >
                New Password:
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-8 block w-full bg-inherit border-b-2 border-[#ffa500] transition-colors focus:border-[#ffa60077] text-[#6F4E37] outline-none"
                required
              />
              <label
                htmlFor="confirmPassword"
                className="font-medium text-[#6F4E37] block mt-8"
              >
                Confirm Password:
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-8 block w-full bg-inherit border-b-2 border-[#ffa500] transition-colors focus:border-[#ffa60077] text-[#6F4E37] outline-none"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-[#6F4E37] text-white py-2 px-3 rounded-md font-bold text-lg mt-8"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
            <div className="text-sm text-black mt-4">
              {message && <p className="text-green-600">{message}</p>}
              {error && <p className="text-red-600">{error}</p>}
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
        </Canvas>
      </div>
    </div>
  );
};

export default UpdatePassword;
