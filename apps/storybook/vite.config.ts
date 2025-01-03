import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
      "@/lib": path.resolve(__dirname, "../../packages/ui/src/lib"),
      "@/hooks": path.resolve(__dirname, "../../packages/ui/src/hooks"),
      "@/components": path.resolve(
        __dirname,
        "../../packages/ui/src/components",
      ),
    },
  },
});
