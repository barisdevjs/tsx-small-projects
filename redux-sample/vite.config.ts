import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

export interface ImportMetaEnv {
  readonly VITE_KEY: string;
  // more env variables...
}
