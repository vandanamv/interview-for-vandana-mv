export interface Launch {
  id: string;
  name: string;
  date_utc: string;
  success: boolean;
  upcoming: boolean;
  options: {
  sort: { date_utc: "desc" },
  populate: ["rocket", "launchpad", "payloads"], // 👈 Add "payloads"
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
