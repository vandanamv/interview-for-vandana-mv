// In useLaunches.ts
import { useEffect, useState } from "react";
import axios from "axios";

interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  rocket: string;
  launchpad: string;
  payloads: string[];
  links: {
    patch: {
      small?: string;
      large?: string;
    };
    wikipedia?: string;
    webcast?: string;
  };
  details?: string;
}

interface Rocket {
  id: string;
  name: string;
  type?: string;
  company?: string;
  country?: string;
}

interface Launchpad {
  id: string;
  locality: string;
  name: string;
}

interface Payload {
  id: string;
  orbit: string;
  type?: string;
}

export interface EnrichedLaunch extends Launch {
  rocketData?: Rocket;
  launchpadData?: Launchpad;
  payloadData?: Payload;
}

export type FilterType = {
  filter: "all" | "upcoming" | "successful" | "failed";
  dateRange: { start: Date; end: Date };
};

export const useLaunches = ({ filter, dateRange }: FilterType) => {
  const [launches, setLaunches] = useState<EnrichedLaunch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setError("");

        const [launchesRes, rocketsRes, padsRes, payloadsRes] = await Promise.all([
  axios.get<Launch[]>("https://api.spacexdata.com/v4/launches"),
  axios.get<Rocket[]>("https://api.spacexdata.com/v4/rockets"),
  axios.get<Launchpad[]>("https://api.spacexdata.com/v4/launchpads"),
  axios.get<Payload[]>("https://api.spacexdata.com/v4/payloads"),
]);
console.log('Launches:', launchesRes.data);
console.log('Rockets:', rocketsRes.data);
console.log('Launchpads:', padsRes.data);
console.log('Payloads:', payloadsRes.data);

        const rocketMap = new Map(rocketsRes.data.map((r) => [r.id, r]));
        const launchpadMap = new Map(padsRes.data.map((p) => [p.id, p]));
        const payloadMap = new Map(payloadsRes.data.map((p) => [p.id, p]));

        let enriched = launchesRes.data
          .filter((launch) => {
            const launchDate = new Date(launch.date_utc);
            return launchDate >= dateRange.start && launchDate <= dateRange.end;
          })
          .map((launch) => ({
            ...launch,
            rocketData: rocketMap.get(launch.rocket),
            launchpadData: launchpadMap.get(launch.launchpad),
            payloadData: launch.payloads.length > 0 ? payloadMap.get(launch.payloads[0]) : undefined,
            links: launch.links || { patch: {} },
            details: launch.details || "",
          }))
          .sort((a, b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime());

        switch (filter) {
          case "upcoming":
            enriched = enriched.filter((l) => l.upcoming);
            break;
          case "successful":
            enriched = enriched.filter((l) => !l.upcoming && l.success === true);
            break;
          case "failed":
            enriched = enriched.filter((l) => !l.upcoming && l.success === false);
            break;
        }

        setLaunches(enriched);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load launch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [filter, dateRange]);

  return { launches, loading, error };
};
