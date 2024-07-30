import { Link } from "react-router-dom";

function About() {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-8 pt-24 ">
      <h1 className="text-4xl font-bold mb-4 text-[#B22222]">About Us</h1>
      <div className="text-lg mb-4 text-left max-w-2xl ">
        <p className="mb-4">
          Welcome to our The Breakfast Place's website! Here, you can explore
          our delicious menu, discover new promotions, and learn more about our
          commitment to delivering the best breakfast experience.
        </p>
        <p className="mb-4">
          At The Breakfast Place, we pride ourselves on using high-quality
          ingredients to create breakfast that not only taste great but also
          bring people together.
        </p>
        <p className="mb-4">
          Our website makes it easy for you to order your favorite breakfast
          dishes online, find a nearby Breakfast Place location, and stay
          updated with our latest deals and offers. We aim to provide a seamless
          online experience so you can enjoy our delicious breakfast with
          minimal hassle.
        </p>
        <p className="mb-4">
          Thank you for choosing The Breakfast Place. We look forward to serving
          you!
        </p>
      </div>
      <div className="text-lg mb-4 max-w-2xl">
        <h2 className="text-3xl font-bold mb-2 text-center text-[#B22222]">
          About the Developer
        </h2>
        <p className="mb-4 text-left">
          Hi, I'm Mubarak Odetunde, the developer behind this amazing The
          Breakfast Place project. With years of experience in software
          development, I specialize in creating dynamic and user-friendly web
          applications.
        </p>
        <p className="mb-4 text-left">
          My goal is to leverage the latest technologies to build solutions that
          not only meet but exceed user expectations. I'm passionate about
          coding and continuously learning to improve my skills.
        </p>
        <Link
          to="/developer"
          className="text-blue-500 hover:underline"
        >
          Meet the Developer
        </Link>
      </div>
    </div>
  );
}

export default About;
