import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

export default ({ children }) => (
  <div>
    <div className="w-full flex flex-col items-center justify-center mt-20 pt-20">
      <div className="py-10" />
      {children}
    </div>
    <Toaster />
    <SonnerToaster />
  </div>
);
