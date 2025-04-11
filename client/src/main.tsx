import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Set default background and text color for the entire app
document.documentElement.classList.add("dark");
document.body.className = "min-h-screen bg-[#121212] text-[#F5F5F5] font-sans antialiased";

createRoot(document.getElementById("root")!).render(<App />);
