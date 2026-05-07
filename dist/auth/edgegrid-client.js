import EdgeGrid from "akamai-edgegrid";
import { config } from "../utils/config.js";
export const edgeGrid = new EdgeGrid({
    path: "",
    clientToken: config.akamai.clientToken,
    clientSecret: config.akamai.clientSecret,
    accessToken: config.akamai.accessToken,
    host: config.akamai.host,
});
