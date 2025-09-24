import { Car } from "lucide-react";
import { Badge } from "./ui/badge";

interface AppHeaderProps {
  isConnected: boolean;
}

const AppHeader = ({ isConnected }: AppHeaderProps) => {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Car className="h-8 w-8" />
            <h1 className="text-xl font-semibold">Parking Monitor</h1>
          </div>
          <nav className="flex items-center gap-6">
            <Badge className="bg-slate-300" asChild>
              <div className="gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isConnected ? "bg-green-800" : "bg-red-800"
                  } animate-pulse`}
                ></div>
                <span className="text-sm font-medium text-black">
                  {isConnected ? "Online" : "Offline"}
                </span>
              </div>
            </Badge>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
