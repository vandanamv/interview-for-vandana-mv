import { Launch } from "@/types/launch";

interface Props {
  launch: Launch;
  onClick: () => void;
}

export default function LaunchCard({ launch, onClick }: Props) {
  return (
    <div
      className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer border hover:border-blue-500"
      onClick={onClick}
    >
      <img
        src={launch.links.patch.small || "/fallback.png"}
        alt={launch.name}
        className="w-16 h-16 object-contain mb-4"
      />
      <h2 className="text-lg font-semibold mb-2">{launch.name}</h2>
      <p className="text-sm text-gray-500">{new Date(launch.date_utc).toLocaleDateString()}</p>
      <p className={`text-xs mt-1 font-medium ${launch.success ? "text-green-600" : "text-red-600"}`}>
        {launch.upcoming ? "Upcoming" : launch.success ? "Success" : "Failed"}
      </p>
    </div>
  );
}


