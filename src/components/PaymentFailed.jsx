import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentFailed = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 flex items-center justify-center p-4">
      <div className="relative max-w-sm sm:max-w-md md:max-w-lg w-full p-6 sm:p-8 bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-rose-900/30">
        {/* Glow effect */}
        <div className="absolute -inset-2 bg-red-900/10 rounded-3xl blur-xl"></div>

        {/* Main content */}
        <div className="relative z-10">
          {/* Animated icon */}
          <div className="relative w-20 sm:w-24 h-20 sm:h-24 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/40 to-rose-900/30 rounded-full animate-pulse"></div>
            <AlertTriangle
              className="w-16 h-16 text-rose-400"
              strokeWidth={1.5}
              style={{ position: "relative", zIndex: 20 }}
            />
          </div>

          {/* Title and description */}
          <div className="text-center mb-6 px-2">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-2">
              Payment Unsuccessful
            </h2>
            <p className="text-gray-300 font-poppins text-sm sm:text-base leading-relaxed">
              Unfortunately, we couldn’t process your payment at this time. No
              money has been deducted. Please try again later.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6 text-base font-medium font-poppins justify-center items-center px-2">
            <button
              onClick={() => navigate("/upgrade")}
              className="flex items-center justify-center gap-2 px-6 sm:px-10 py-3 bg-gradient-to-r from-rose-600 to-red-700 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] group overflow-hidden whitespace-nowrap w-full sm:w-auto"
            >
              <span>Try Again</span>
            </button>

            <button
              onClick={() => navigate("/help")}
              className="flex items-center justify-center gap-2 px-6 sm:px-10 py-3 bg-gray-700/50 text-gray-200 rounded-xl hover:bg-gray-600/60 transition-all duration-300 group border border-gray-600/30 whitespace-nowrap w-full sm:w-auto"
            >
              <span>Help Center</span>
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-600/80 text-xs text-gray-400 text-center italic px-2">
            We appreciate your patience. We're here to help you complete your
            purchase.
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes soft-bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-soft-bounce {
          animation: soft-bounce 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PaymentFailed;
