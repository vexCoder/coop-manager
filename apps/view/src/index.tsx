import { createRoot } from "react-dom/client";
import App from "./App";
import "./base.css";

const rootElement =
  document.getElementById("root") ?? document.createElement("body");

const root = createRoot(rootElement);

root.render(<App />);
