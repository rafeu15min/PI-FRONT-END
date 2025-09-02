import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import "./index.css";

import { ParkingSpotProvider } from "./providers/ParkingSpotProvider";

import { routes } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ParkingSpotProvider>
      <RouterProvider router={routes} />
    </ParkingSpotProvider>
  </StrictMode>
);
