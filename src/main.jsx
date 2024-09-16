import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import AuntProvider from "./context/AuntProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuntProvider>
    <RouterProvider router={router} />
  </AuntProvider>
);
