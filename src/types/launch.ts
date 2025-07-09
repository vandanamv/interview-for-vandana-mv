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
    // If you have other known properties in links, specify them here.
    // For example:
    // wikipedia?: string;
    // video_link?: string;
    // Add other properties as needed with specific types.
  };
  rocket: {
    name: string;
    // Add other properties of rocket if available
  };
  launchpad: {
    name: string;
    locality: string;
    // Add other properties of launchpad if available
  };
  payloads: {
    orbit: string;
    // Add other properties of payloads if available
  }[];
}

export interface LaunchOptions {
  sort: {
    date_utc: "asc" | "desc";
  };
  populate: string[];
}

// If you need to use options within the Launch interface, you can do it like this:
export interface LaunchWithOptions {
  options: LaunchOptions;
  // Include other properties from Launch if needed
}
