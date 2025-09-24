import { Outlet } from "react-router";

import { useParkingSpots } from "@/hooks/useParkingSpots";

import AppFooter from "@/components/AppFooter";
import AppHeader from "@/components/AppHeader";

const DefaultLayout = () => {
  const { isConnected } = useParkingSpots();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <AppHeader isConnected={isConnected} />

      <div className="flex-1">
        <Outlet />
      </div>
      <AppFooter />
    </div>
  );
};

export default DefaultLayout;
