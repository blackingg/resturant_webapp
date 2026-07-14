import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import { Sandwich } from "../components/Sandwich";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authProvider";

const CameraControls = ({ targetPosition }) => {
  const { camera } = useThree();

  useEffect(() => {
    if (targetPosition) {
      gsap.to(camera.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: () => camera.lookAt(0, 0, 0),
      });
    }
  }, [targetPosition, camera]);

  return null;
};

export const SignIn = () => {
  const [signup, setSignUp] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 6, y: 3, z: 5 });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [signUpReply, setSignUpReply] = useState("");
  const [signUpReplyError, setSignUpReplyError] = useState("");
  const signUpFormRef = useRef(null);
  const loginFormRef = useRef(null);
  const navigate = useNavigate();

  const { signUp, signIn, user } = useAuth(); // Use the AuthContext

  useEffect(() => {
    if (user) {
      navigate("/shop");
    }
  }, [user, navigate]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signUp(email, password, username);
      setSignUpReply("Sign-up successful!");
      navigate("/shop");
    } catch (error) {
      console.error("Error signing up:", error.message);
      setSignUpReplyError(error.message);
    }

    setLoading(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      setSignUpReply("Login successful!");
      navigate("/shop");
    } catch (error) {
      console.error("Error logging in:", error.message);
      setSignUpReplyError(error.message);
    }

    setLoading(false);
  };

  const handleSignUpClick_signup = () => {
    setSignUp(true);
    toggleForms(true);
    setTargetPosition({ x: 6, y: 3, z: 5 });
  };

  const handleSignUpClick_login = () => {
    setSignUp(false);
    toggleForms(false);
    setTargetPosition({ x: 9, y: 3, z: 9.2 });
  };

  const toggleForms = (showSignUp) => {
    const formToShow = showSignUp
      ? signUpFormRef.current
      : loginFormRef.current;
    const formToHide = showSignUp
      ? loginFormRef.current
      : signUpFormRef.current;

    gsap.to(formToHide, {
      x: -150,
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => {
        setSignUp(showSignUp);
        gsap.fromTo(
          formToShow,
          { x: 150, opacity: 0 },
          { x: 0, opacity: 1, duration: 1.0, ease: "power2.Out" }
        );
      },
    });
  };

  return (
    <div className="w-screen h-screen block lg:grid grid-cols-2 justify-center items-center bg-[#FDFDFB]">
      {/* Forms Card Container */}
      <div className="absolute lg:relative h-screen lg:h-full w-full bg-transparent m-auto justify-center flex items-center p-4 md:p-8 z-10">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#EADBC8]/40 shadow-[0_15px_40px_rgba(42,26,14,0.06)] p-8 md:p-10 flex flex-col justify-between h-auto min-h-[580px]">
          {/* Sign Up Form */}
          <div
            ref={signUpFormRef}
            className={`${
              signup ? "block" : "hidden"
            } flex flex-col w-full`}
          >
            <div>
              <h1 className="font-display text-3xl font-bold text-[#2A1A0E] tracking-tight w-full mb-2">
                Create Account
              </h1>
              <p className="text-sm font-semibold text-[#5C4A3C]/70 mb-6">
                Join The Breakfast Place to explore our morning favorites.
              </p>
              
              <form onSubmit={handleSignUp} className="w-full">
                <label
                  htmlFor="usernameSignUp"
                  className="block text-sm font-bold text-[#2A1A0E] mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="usernameSignUp"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full bg-[#FDFDFB] border border-[#EADBC8] text-[#2A1A0E] placeholder-[#5C4A3C]/40 rounded-md px-4 py-2.5 shadow-sm transition-all focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 outline-none text-sm"
                  placeholder="Choose a username"
                  required
                />
                
                <label
                  htmlFor="emailSignUp"
                  className="block text-sm font-bold text-[#2A1A0E] mb-2 mt-5"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="emailSignUp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full bg-[#FDFDFB] border border-[#EADBC8] text-[#2A1A0E] placeholder-[#5C4A3C]/40 rounded-md px-4 py-2.5 shadow-sm transition-all focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 outline-none text-sm"
                  placeholder="name@example.com"
                  required
                />
                
                <label
                  htmlFor="passwordSignUp"
                  className="block text-sm font-bold text-[#2A1A0E] mb-2 mt-5"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="passwordSignUp"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full bg-[#FDFDFB] border border-[#EADBC8] text-[#2A1A0E] placeholder-[#5C4A3C]/40 rounded-md px-4 py-2.5 shadow-sm transition-all focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 outline-none text-sm"
                  placeholder="••••••••"
                  required
                />
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D97706] hover:bg-[#C26405] text-white py-3 px-4 rounded-md font-bold transition-all duration-300 shadow-md shadow-amber-600/10 mt-8 text-sm uppercase tracking-wider"
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </form>
            </div>

            <div className="w-full mt-4 text-center text-xs">
              {signUpReply && <p className="text-green-600 font-semibold">{signUpReply}</p>}
              {signUpReplyError && (
                <p className="text-red-600 font-semibold">{signUpReplyError}</p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-[#EADBC8]/40 flex items-center justify-between text-sm">
              <span className="text-[#5C4A3C] font-medium">Already have an account?</span>
              <button
                className="text-[#D97706] hover:text-[#C26405] font-bold transition-colors"
                onClick={handleSignUpClick_login}
              >
                Sign In
              </button>
            </div>
          </div>

          {/* Login Form */}
          <div
            ref={loginFormRef}
            className={`${
              signup ? "hidden" : "block"
            } flex flex-col w-full`}
          >
            <div>
              <h1 className="font-display text-3xl font-bold text-[#2A1A0E] tracking-tight w-full mb-2">
                Welcome Back
              </h1>
              <p className="text-sm font-semibold text-[#5C4A3C]/70 mb-6">
                Sign in to access your culinary shop and start ordering.
              </p>
              
              <form onSubmit={handleLogin} className="w-full">
                <label
                  htmlFor="emailLogin"
                  className="block text-sm font-bold text-[#2A1A0E] mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="emailLogin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full bg-[#FDFDFB] border border-[#EADBC8] text-[#2A1A0E] placeholder-[#5C4A3C]/40 rounded-md px-4 py-2.5 shadow-sm transition-all focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 outline-none text-sm"
                  placeholder="name@example.com"
                  required
                />
                
                <label
                  htmlFor="passwordLogin"
                  className="block text-sm font-bold text-[#2A1A0E] mb-2 mt-5"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="passwordLogin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full bg-[#FDFDFB] border border-[#EADBC8] text-[#2A1A0E] placeholder-[#5C4A3C]/40 rounded-md px-4 py-2.5 shadow-sm transition-all focus:border-[#D97706] focus:ring-4 focus:ring-[#D97706]/10 outline-none text-sm"
                  placeholder="••••••••"
                  required
                />
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#D97706] hover:bg-[#C26405] text-white py-3 px-4 rounded-md font-bold transition-all duration-300 shadow-md shadow-amber-600/10 mt-8 text-sm uppercase tracking-wider"
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>
            </div>

            <div className="w-full mt-4 text-center text-xs">
              {signUpReply && <p className="text-green-600 font-semibold">{signUpReply}</p>}
              {signUpReplyError && (
                <p className="text-red-600 font-semibold">{signUpReplyError}</p>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-[#EADBC8]/40 flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-[#5C4A3C] font-medium">New to our place?</span>
                <button
                  className="text-[#D97706] hover:text-[#C26405] font-bold transition-colors"
                  onClick={handleSignUpClick_signup}
                >
                  Create Account
                </button>
              </div>
              <Link
                to="/forgotPassword"
                className="text-xs text-[#5C4A3C]/60 hover:text-[#D97706] font-semibold transition-colors mt-1"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Model Column */}
      <div className="hidden lg:block relative w-full h-full z-0 bg-[#FFF5EA]">
        <Canvas className="canvas-style">
          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={1.5} />
          <color
            attach="background"
            args={["#FFF5EA"]}
          />
          <Suspense fallback={null}>
            <Sandwich />
          </Suspense>
          <CameraControls targetPosition={targetPosition} />
        </Canvas>
      </div>
    </div>
  );
};
