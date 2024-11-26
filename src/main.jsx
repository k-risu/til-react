import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Pop from "./components/Pop";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Pop></Pop>
  </StrictMode>,
);
