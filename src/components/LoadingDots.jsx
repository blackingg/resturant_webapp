import React from "react";

const LoadingDots = () => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div
        className="w-3 h-3 bg-[#6F4E37] rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="w-3 h-3 bg-[#6F4E37] rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-3 h-3 bg-[#6F4E37] rounded-full animate-bounce"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  );
};

export default LoadingDots;
