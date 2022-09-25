import React, { CSSProperties } from "react";
import { PulseLoader } from "react-spinners";

const override: CSSProperties = {
  opacity: "1",
};

const Loading = () => {
  return (
    <div className="flex flex-col items-center p-20 gap-y-5">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png"
        alt="WhatsApp Logo"
        className="h-64 w-64 sm:h-80 sm:w-80 object-contain opacity-50"
      />
      <PulseLoader size={20} color="#3cbc28" cssOverride={override} />
    </div>
  );
};

export default Loading;
