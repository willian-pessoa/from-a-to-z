import { Toaster } from "react-hot-toast";

export default function AppToaster() {
  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 2000,
        error: {
          className:
            "!bg-red-900 !text-red-50 !border !border-red-500 !rounded-lg",
        },
        success: {
          className:
            "!bg-emerald-900 !text-emerald-50 !border !border-emerald-600 !rounded-lg",
        },
        loading: {
          className:
            "!bg-emerald-900 !text-emerald-50 !border !border-emerald-600 !rounded-lg",
        },
      }}
    />
  );
}
