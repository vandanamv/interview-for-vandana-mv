export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean| null;
  upcoming: boolean;
  links: {
    patch: {
      small?: string | null;
      large?: string | null;
    };
  };
  options: {
    sort: { date_utc: "desc" };
    populate: ["rocket", "launchpad", "payloads"];
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
