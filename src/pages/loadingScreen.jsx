import { useProgress } from "@react-three/drei";
import { useEffect } from "react";
import { MdEmojiFoodBeverage } from "react-icons/md";

// Cup icon that fills with amber as loading progresses
export const CupProgress = ({ progress, size = 70 }) => (
  <div className="relative">
    <div
      className="absolute left-0 top-0 overflow-hidden truncate text-clip transition-all duration-500"
      style={{
        width: `${progress}%`,
      }}
    >
      <MdEmojiFoodBeverage
        color="#D97706"
        size={size}
      />
    </div>
    <div className="opacity-30">
      <MdEmojiFoodBeverage
        color="#5C4A3C"
        size={size}
      />
    </div>
  </div>
);

export const LoadingScreen = (props) => {
  const { loading, setLoading, hidden } = props;
  const { progress } = useProgress();

  useEffect(() => {
    if (progress === 100 && setLoading) {
      const timer = setTimeout(() => {
        setLoading(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [progress, setLoading]);

  // Pages with their own loading overlay (e.g. the shop) suppress this one;
  // the progress effect above still runs so the app-level state stays in sync.
  if (hidden) return null;

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-200 transition-opacity duration-1000 pointer-events-none
  flex flex-col items-center justify-center gap-6 bg-brand-butter
  ${loading ? "opacity-0" : "opacity-100"}`}
    >
      <CupProgress progress={progress} />
      <p className="font-display text-xl text-brand-mocha animate-pulse">
        Warming up the griddle…
      </p>
    </div>
  );
};
