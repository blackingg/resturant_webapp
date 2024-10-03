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
      console.log("Login successful!");
      setSignUpReply("Login successful!");
      navigate("/shop");
    } catch (error) {
      console.error("Error logging in:", error.message);
      setSignUpReplyError(error.message);
    }

    setLoading(false);
  };

  useEffect(() => {
    console.log("signUpReply:", signUpReply);
  });

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
    <div className="w-screen h-screen block lg:grid grid-cols-2 grid-rows-1 justify-center items-center">
      <div className="absolute lg:relative h-screen lg:h-[80%] w-full bg-[#fff] m-auto justify-center flex items-center">
        <div className="z-10 w-[80%] lg:w-[70%] h-[78%] lg:h-full my-auto shadow-inner lg:shadow-2xl bg-[#fff] justify-center flex items-center">
          <div
            ref={signUpFormRef}
            className={`${
              signup ? "block" : "hidden"
            } flex flex-col m-auto w-[80%] h-full justify-left items-center pt-5`}
          >
            <div className="h-[70%] w-full flex flex-col justify-left items-center">
              <h1 className="text-[#6F4E37] text-4xl font-bold p-5 w-full">
                SignUp
              </h1>
              <form
                onSubmit={handleSignUp}
                className="p-5 w-full h-[60%]"
              >
                <label
                  htmlFor="username"
                  className="font-medium text-[#6F4E37]"
                >
                  Username:
                </label>
                <input
                  type="text"
                  id="usernameSignUp"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="h-8 block w-full bg-inherit border-b-2 border-[#ffa500] transition-colors focus:border-[#ffa60077] text-[#6F4E37] outline-none"
                />
                <label
                  htmlFor="email"
                  className="font-medium text-[#6F4E37] block mb-1 mt-8"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="emailSignUp"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-8 block w-full bg-inherit border-b-2 border-[#ffa500] transition-colors focus:border-[#ffa60077] text-[#6F4E37] outline-none"
                />
                <label
                  htmlFor="password"
                  className="font-medium text-[#6F4E37] block mb-1 mt-8"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="passwordSignUp"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-8 block w-full bg-inherit border-b-2 border-[#ffa500] transition-colors focus:border-[#ffa60077] text-[#6F4E37] outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#6F4E37] text-white py-2 px-3 rounded-md font-bold text-lg mt-8"
                >
                  {loading ? "Signing Up..." : "Sign Up"}
                </button>
              </form>
            </div>

            <div className="w-full h-[10%] mt-10 flex justify-center items center text-sm">
              {signUpReply && <p className="text-green-600">{signUpReply}</p>}
              {signUpReplyError && (
                <p className="text-red-600">{signUpReplyError}</p>
              )}
            </div>
            <div className="flex flex-col h-[20%] w-full p-5 py-5 px-0 md:px-10 gap-5 border-t-2">
              <div className="flex items-center gap-2">
                <h4>Login here:</h4>
                <button
                  className="bg-[#eb7623] w-fit text-white rounded-md px-3 py-1"
                  onClick={handleSignUpClick_login}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
          <div
            ref={loginFormRef}
            className={`${
              signup ? "hidden" : "block"
            } flex flex-col m-auto w-[80%] h-full justify-left items-center pt-5`}
          >
            <div className="h-[70%] w-full flex flex-col justify-left items-center">
              <h1 className="text-[#6F4E37] text-4xl font-bold p-5 w-full">
                Login
              </h1>
              <form
                onSubmit={handleLogin}
                className="p-5 w-full h-full"
              >
                <label
                  htmlFor="email"
                  className="font-medium text-[#6F4E37]"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="emailLogin"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-8 block w-full bg-inherit border-b-2 border-[#ffa500] transition-colors focus:border-[#ffa60077] text-[#6F4E37] outline-none"
                />
                <label
                  htmlFor="password"
                  className="font-medium text-[#6F4E37] block mb-1 mt-8"
                >
                  Password:
                </label>
                <input
                  type="password"
                  id="passwordLogin"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-8 block w-full bg-inherit border-b-2 border-[#ffa500] transition-colors focus:border-[#ffa60077] text-[#6F4E37] outline-none"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#6F4E37] text-white py-2 px-3 rounded-md font-bold text-lg mt-8"
                >
                  {loading ? "Logging In..." : "Login"}
                </button>
              </form>
            </div>
            <div className="w-full h-[10%] relative buttom-0 m-auto flex justify-center items-center text-sm">
              {signUpReply && <p className="text-green-600">{signUpReply}</p>}
              {signUpReplyError && (
                <p className="text-red-600">{signUpReplyError}</p>
              )}
            </div>

            <div className="flex flex-col h-[20%] w-full py-5 px-0 md:px-10 gap-3 border-t-2">
              <div className="flex items-center gap-2">
                <h4 className="text-sm">No account? Sign up here:</h4>
                <button
                  className="bg-[#eb7623] w-fit text-white rounded-md px-3 py-1"
                  onClick={handleSignUpClick_signup}
                >
                  SignUp
                </button>
              </div>
              <Link
                to="/forgotPassword"
                className="w-full underline text-[#eb7623]"
              >
                Forgot password?
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="relative w-full h-full lg:w-full lg:h-full z-0">
        <Canvas className="canvas-style">
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <color
            attach="background"
            args={["#ffa500"]}
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
