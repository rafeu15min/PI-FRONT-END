import ParkingSpotCard from "./ParkingSpotCard";

interface ParkingGridProps {
  spots: { id: string; isOccupied: boolean }[];
}

const ParkingGrid = ({ spots }: ParkingGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
      {spots.map((spot) => (
        <ParkingSpotCard
          key={spot.id}
          spotId={spot.id}
          isOccupied={spot.isOccupied}
        />
      ))}
    </div>
  );
};

export default ParkingGrid;
