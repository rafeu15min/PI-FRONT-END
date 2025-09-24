import { createContext, useEffect, useState, type ReactNode } from "react";

import { wsParkingSpotService } from "@/services/WSParkingSpotService";

type ParkingSpotProps = { id: string; isOccupied: boolean };

type ParkingContextType = {
  sendMessage: (msg: any) => void;
  isConnected: boolean;
  spots: ParkingSpotProps[];
};

export const ParkingContext = createContext<ParkingContextType | undefined>(
  undefined
);

export const ParkingSpotProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [spots, setSpots] = useState<ParkingSpotProps[]>([]);

  useEffect(() => {
    wsParkingSpotService.connect();

    const handleOpen = () => setIsConnected(true);
    const handleClose = () => setIsConnected(false);
    const handleSpots = (data: ParkingSpotProps) =>
      setSpots((prev) => [...prev, data]);

    // MOCK DATA
    // setSpots(() => [
    //   { id: "MOCK-01", isOccupied: true },
    //   { id: "MOCK-02", isOccupied: false },
    //   { id: "MOCK-03", isOccupied: false },
    //   { id: "MOCK-04", isOccupied: false },
    // ]);

    wsParkingSpotService.on("open", handleOpen);
    wsParkingSpotService.on("close", handleClose);
    wsParkingSpotService.on("spots", handleSpots);

    return () => {
      wsParkingSpotService.off("open", handleOpen);
      wsParkingSpotService.off("close", handleClose);
      wsParkingSpotService.off("spots", handleSpots);

      (wsParkingSpotService as any).socket?.close();
    };
  }, []);

  return (
    <ParkingContext.Provider
      value={{
        sendMessage:
          wsParkingSpotService.sendMessage.bind(wsParkingSpotService),
        isConnected,
        spots,
      }}
    >
      {children}
    </ParkingContext.Provider>
  );
};
