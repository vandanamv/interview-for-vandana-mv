//src/hooks/useLaunches.ts
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

type FilterType = "all" | "upcoming" | "successful" | "failed";

export const useLaunches = (filter: FilterType) => {
  const [launches, setLaunches] = useState<EnrichedLaunch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        // 🔄 Fetch all data
        const [launchesRes, rocketsRes, padsRes, payloadsRes] = await Promise.all([
          axios.get<Launch[]>("https://api.spacexdata.com/v4/launches"),
          axios.get<Rocket[]>("https://api.spacexdata.com/v4/rockets"),
          axios.get<Launchpad[]>("https://api.spacexdata.com/v4/launchpads"),
          axios.get<Payload[]>("https://api.spacexdata.com/v4/payloads"),
        ]);

        const rocketMap = new Map(rocketsRes.data.map((r) => [r.id, r]));
        const launchpadMap = new Map(padsRes.data.map((p) => [p.id, p]));
        const payloadMap = new Map(payloadsRes.data.map((p) => [p.id, p]));

        let enriched = launchesRes.data.map((launch) => ({
          ...launch,
          rocketData: rocketMap.get(launch.rocket),
          launchpadData: launchpadMap.get(launch.launchpad),
          payloadData: payloadMap.get(launch.payloads?.[0]),
        }));

        // 🔍 Filter launches
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
  }, [filter]);

  return { launches, loading, error };
};
