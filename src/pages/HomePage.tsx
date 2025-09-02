import { useParkingSpots } from "@/hooks/useParkingSpots";

import ParkingGrid from "@/components/ParkingGrid";

const HomePage = () => {
  const { spots } = useParkingSpots();

  return spots ? (
    <div>
      <p className="mt-6 text-gray-400 font-semibold text-lg text-center">
        No momento não há vagas registradas...
      </p>
    </div>
  ) : (
    <main className="container mx-auto px-4 py-8">
      <ParkingGrid spots={spots} />
    </main>
  );
};

export default HomePage;
