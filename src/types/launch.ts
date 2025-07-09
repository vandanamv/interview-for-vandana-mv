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
    [key: string]: any;
  };
  options: {
    sort: { date_utc: "desc" },
    populate: ["rocket", "launchpad", "payloads"],
  },
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
