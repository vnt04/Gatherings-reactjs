import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router-dom";
import router from "./Routers/router.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "./store.js";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
