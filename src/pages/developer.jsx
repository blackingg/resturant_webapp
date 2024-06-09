import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { IoArrowBackCircle } from "react-icons/io5";

function Developer() {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate("/about");
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center space-x-8">
        <h1 className="text-4xl font-bold mb-4">Developer</h1>
        <button
          onClick={handleBackClick}
          className="mb-4 text-[#B22222] font-semibold hover:underline"
        >
          <IoArrowBackCircle size={30} />
        </button>
      </div>
      <p className="text-lg mb-4 text-center max-w-2xl">
        Hi, I'm Mubarak Odetunde, the developer behind this project. With years
        of experience in software development, I specialize in creating dynamic
        and user-friendly web applications.
      </p>
      <p className="text-lg mb-4 text-center max-w-2xl">
        My goal is to leverage the latest technologies to build solutions that
        not only meet but exceed user expectations. I'm passionate about coding
        and continuously learning to improve my skills.
      </p>
    </div>
  );
}

export default Developer;
