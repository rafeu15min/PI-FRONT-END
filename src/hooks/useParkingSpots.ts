import { useContext } from "react";

import { ParkingContext } from "@/providers/ParkingSpotProvider";

export function useParkingSpots() {
  const ctx = useContext(ParkingContext)
  if (!ctx) throw new Error("useParkingSpots deve ser usado dentro do ParkingContext")
  return ctx
}
