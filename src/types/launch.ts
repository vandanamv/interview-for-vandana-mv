export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean;
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

export interface LaunchOptions {
  sort: {
    date_utc: "asc" | "desc";
  };
  populate: string[];
}

export interface LaunchWithOptions {
  options: LaunchOptions;
}
