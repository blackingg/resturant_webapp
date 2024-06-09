import { Link } from "react-router-dom";

function Developer() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-4">Developer</h1>
      <p className="text-lg mb-4 text-center max-w-2xl">
        Hi, I'm Mubarak Odetunde, the developer behind this amazing project.
        With years of experience in software development, I specialize in
        creating dynamic and user-friendly web applications.
      </p>
      <p className="text-lg mb-4 text-center max-w-2xl">
        My goal is to leverage the latest technologies to build solutions that
        not only meet but exceed user expectations. I'm passionate about coding
        and continuously learning to improve my skills.
      </p>
      <Link
        to="/about"
        className="text-blue-500 hover:underline"
      >
        Back to About Us
      </Link>
    </div>
  );
}

export default Developer;
