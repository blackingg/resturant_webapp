import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authProvider";
import { Canvas } from "@react-three/fiber";
import { Sandwich } from "../components/Sandwich";

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
      await updatePassword(newPassword);
      setMessage("Password updated successfully!");
      navigate("/signIn");
    } catch (error) {
      setError("Error updating password: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen block lg:grid grid-cols-2 justify-center items-center bg-[#FDFDFB]">
      {/* Form Card Container */}
      <div className="absolute lg:relative h-screen lg:h-full w-full bg-transparent m-auto justify-center flex items-center p-4 md:p-8 z-10">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#EADBC8]/40 shadow-[0_15px_40px_rgba(42,26,14,0.06)] p-8 md:p-10 flex flex-col justify-between h-auto min-h-[500px]">
          <div className="w-full">
            <h1 className="font-display text-3xl font-bold text-[#2A1A0E] tracking-tight w-full mb-2">
              Update Password
            </h1>
            <p className="text-sm font-semibold text-[#5C4A3C]/70 mb-6">
              Create a strong new password to protect your account.
            </p>
            
            <form onSubmit={handlePasswordUpdate} className="w-full">
              <label
                htmlFor="newPassword"
                className="block text-sm font-bold text-[#2A1A0E] mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="block w-full bg-[#FDFDFB] border border-[#EADBC8] text-[#2A1A0E] placeholder-[#5C4A3C]/40 rounded-md px-4 py-2.5 shadow-sm transition-all focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 outline-none text-sm"
                placeholder="••••••••"
                required
              />
              
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-bold text-[#2A1A0E] mb-2 mt-5"
              >
                Confirm New Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="block w-full bg-[#FDFDFB] border border-[#EADBC8] text-[#2A1A0E] placeholder-[#5C4A3C]/40 rounded-md px-4 py-2.5 shadow-sm transition-all focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 outline-none text-sm"
                placeholder="••••••••"
                required
              />
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D97706] hover:bg-[#C26405] text-white py-3 px-4 rounded-md font-bold transition-all duration-300 shadow-md shadow-amber-600/10 mt-8 text-sm uppercase tracking-wider"
              >
                {loading ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>

          <div className="w-full mt-4 text-center text-xs">
            {message && <p className="text-green-600 font-semibold">{message}</p>}
            {error && <p className="text-red-600 font-semibold">{error}</p>}
          </div>

          <div className="mt-8 pt-6 border-t border-[#EADBC8]/40 flex items-center justify-between text-sm">
            <span className="text-[#5C4A3C] font-medium">Decided not to change?</span>
            <Link
              to="/signIn"
              className="text-[#D97706] hover:text-[#C26405] font-bold transition-colors"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>

      {/* 3D Model Column */}
      <div className="hidden lg:block relative w-full h-full z-0 bg-[#FFF5EA]">
        <Canvas camera={{ position: [1, 3, 10] }}>
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <color
            attach="background"
            args={["#FFF5EA"]}
          />
          <Sandwich />
        </Canvas>
      </div>
    </div>
  );
};

export default UpdatePassword;
