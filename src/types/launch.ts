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


export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean | null;
  upcoming: boolean;
  links: {
    patch: {
      small?: string;
      large?: string;
    };
  };
  rocket: {
    name: string;
  };
  launchpad: {
    name: string;
    locality: string;
  };
  payloads: {
    orbit: string;
  }[];
}
export interface EnrichedLaunch {
  id: string;
  name: string;
  date_utc: string;
  upcoming: boolean;
  success?: boolean | null;
  launchpadData?: LaunchpadData;
  rocketData?: RocketData;
  payloadData?: PayloadData;
}