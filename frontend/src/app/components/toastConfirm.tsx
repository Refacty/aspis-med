import toast from "react-hot-toast";
import { useEffect } from "react";

export function toastConfirm(message: string): Promise<boolean> {
  return new Promise((resolve) => {
    const toastId = toast.custom(
      ({ visible, id }) => (
        <div
          className={`max-w-md w-full bg-white rounded-lg shadow-lg pointer-events-auto flex p-4 transition-all duration-300 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          role="alert"
          aria-live="assertive"
        >
          <div className="w-full flex items-center justify-between gap-4">
            <p className="text-gray-800 flex-1">{message}</p>
            
            <div className="flex gap-2">
              <button
                onClick={() => {
                  resolve(true);
                  toast.dismiss(id);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                aria-label="Confirmar ação"
              >
                Confirmar
              </button>
              
              <button
                onClick={() => {
                  resolve(false);
                  toast.dismiss(id);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-800 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                aria-label="Cancelar ação"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
        ariaProps: {
          role: "alert",
          "aria-live": "assertive",
        },
        animate: {
          enter: { duration: 200 },
          exit: { duration: 150 },
        },
      }
    );

    return () => {
      toast.dismiss(toastId);
      resolve(false);
    };
  });
}