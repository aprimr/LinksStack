import React from "react";
import { Layers2, Loader2 } from "lucide-react";

function Loading() {
  return (
    <div className="min-h-[100svh] w-full bg-gradient-to-b from-gray-900 via-gray-950 to-black flex flex-col items-center justify-center px-4 font-poppins select-none relative text-gray-900 dark:text-white">
      {/* Spinner */}
      <Loader2 className="animate-spin text-white h-24 w-24 mb-6" />

      {/* App Name at bottom */}
      <h1 className="absolute bottom-6 w-full text-center text-2xl font-medium sm:font-semibold">
        <Layers2 className="inline-block mr-2 h-7 w-7 font-inter" />
        LinksStack
      </h1>
    </div>
  );
}

export default Loading;
