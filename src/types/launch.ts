interface RocketData {
  type?: string;
  name?: string;
  company?: string;
  country?: string;
}

interface LaunchpadData {
  name?: string;
  locality?: string;
}

interface PayloadData {
  type?: string;
  orbit?: string;
}

interface Links {
  patch?: {
    small?: string;
    large?: string;
  };
  wikipedia?: string;
  webcast?: string;
}

export interface EnrichedLaunch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  rocketData?: RocketData;
  launchpadData?: LaunchpadData;
  payloadData?: PayloadData;
  details?: string;
  links: Links;
  flight_number?: number;
}
