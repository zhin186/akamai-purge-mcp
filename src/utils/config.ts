import dotenv from "dotenv";

dotenv.config();

export const config = {
  akamai: {
    host: process.env.AKAMAI_HOST!,
    clientToken: process.env.AKAMAI_CLIENT_TOKEN!,
    clientSecret: process.env.AKAMAI_CLIENT_SECRET!,
    accessToken: process.env.AKAMAI_ACCESS_TOKEN!,
  },
};