import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import QueryProvider from "./utils/Api/QueryProvider";

import App from "./App";
import "./index.css";
import "swiper/swiper-bundle.css";
import "react-toastify/dist/ReactToastify.css";
import { CurrencyProvider } from "./context/CurrencyContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryProvider>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
    </QueryProvider>
  </StrictMode>
);
