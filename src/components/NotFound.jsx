import { Link } from "react-router-dom";
import { Layers2 } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-[100svh] flex flex-col justify-between items-center px-4 py-10 text-center bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white font-poppins">
      {/* Main Content */}
      <div className="flex flex-col items-center space-y-4 mt-40">
        <Layers2 className="h-16 w-16 text-sky-500" />
        <h1 className="text-4xl font-semibold ">Page Not Found</h1>
        <p className="text-md text-gray-400 max-w-md font-inter">
          The page you’re looking for doesn’t exist.
        </p>
        <Link to="/" className="mt-4 text-sm text-sky-100 hover:underline">
          Back to Home
        </Link>
      </div>

      <footer className=" text-gray-200 mt-12 text-center text-2xl font-semi">
        <Layers2 className="inline-block mr-2 h-7 w-7 font-inter" />
        LinksStack
      </footer>
    </div>
  );
};

export default NotFound;
