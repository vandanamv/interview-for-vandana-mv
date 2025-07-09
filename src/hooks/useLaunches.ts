//src/hooks/useLaunches.ts
import { useEffect, useState } from "react";
import axios from "axios";

// Types from SpaceX API
interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | undefined;
  upcoming: boolean;
  rocket: string;
  launchpad: string;
  payloads: string[];
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
  details?: string;
  links: {
    patch: {
      small?: string;
      large?: string;
    };
    wikipedia?: string;
    webcast?: string;
    [key: string]: unknown;
  };
  flight_number?: number;
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

        const [launchesRes, rocketsRes, padsRes, payloadsRes] = await Promise.all([
          axios.get<Launch[]>("https://api.spacexdata.com/v4/launches"),
          axios.get<Rocket[]>("https://api.spacexdata.com/v4/rockets"),
          axios.get<Launchpad[]>("https://api.spacexdata.com/v4/launchpads"),
          axios.get<Payload[]>("https://api.spacexdata.com/v4/payloads"),
        ]);

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
            payloadData: payloadMap.get(launch.payloads[0]),
          }));

        if (filter === "upcoming") {
          enriched = enriched.filter((l) => l.upcoming);
        } else if (filter === "successful") {
          enriched = enriched.filter((l) => !l.upcoming && l.success === true);
        } else if (filter === "failed") {
          enriched = enriched.filter((l) => !l.upcoming && l.success === false);
        }

        setLaunches(enriched);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load launch data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [filter, dateRange]);

  return { launches, loading, error };
};
