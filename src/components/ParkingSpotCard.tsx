import { Car } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardContent } from "./ui/card";

interface ParkingSpotProps {
  spotId: string;
  isOccupied: boolean;
}

const ParkingSpotCard = ({ spotId, isOccupied }: ParkingSpotProps) => {
  return (
    <Card
      className={cn(
        "relative rounded-xl p-6 ",
        isOccupied
          ? "bg-red-100 border-2 border-red-300"
          : "bg-green-100 border-2 border-green-300 hover:bg-green-200",
        "transition-all duration-300 hover:scale-105 cursor-pointer shadow-md"
      )}
    >
      <CardContent className="flex flex-col items-center justify-center space-y-4">
        <Car
          className={cn(
            "h-16 w-16 transition-colors",
            isOccupied ? "text-red-600" : "text-green-600"
          )}
        />
        <div className="text-center">
          <p className="text-sm font-medium text-gray-600 mb-1">Vaga</p>
          <p className="text-2xl font-bold text-gray-900">{spotId}</p>
        </div>
        <div
          className={cn(
            "px-3 py-1 rounded-full text-xs font-medium",
            isOccupied
              ? "bg-red-200 text-red-800"
              : "bg-green-200 text-green-800"
          )}
        >
          {isOccupied ? "Ocupada" : "Livre"}
        </div>
      </CardContent>
    </Card>
  );
};

export default ParkingSpotCard;
