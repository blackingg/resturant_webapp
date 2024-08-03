import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
import { MdEmojiFoodBeverage } from "react-icons/md";

export const LoadingScreen = (props) => {
  const { loading, setLoading } = props;
  const { progress, total, loaded, item } = useProgress();

  useEffect(() => {
    console.log(progress, total, loaded, item);
    if (progress === 100) {
      setTimeout(() => {
        setLoading(true);
      }, 1000);
    }
  }, [progress, total, loaded, item]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 pointer-events-none
  flex items-center justify-center bg-[#ffa500]
  ${loading ? "opacity-0" : "opacity-100"}`}
    >
      <div className="text-4xl md:text-9xl font-bold text-[6F4E37] relative">
        <div
          className="absolute left-0 top-0  overflow-hidden truncate text-clip transition-all duration-500"
          style={{
            width: `${progress}%`,
          }}
        >
          <MdEmojiFoodBeverage
            color="#6F4E37"
            size={70}
          />
        </div>
        <div className="opacity-40">
          <MdEmojiFoodBeverage
            color="#6F4E37"
            size={70}
          />
        </div>
      </div>
    </div>
  );
};
