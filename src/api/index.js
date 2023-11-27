import { appConfig } from "src/config";
import {
  reqAnonGet,
  reqAnonPost,
  reqGet,
  reqPatch,
  reqPost,
  getAuthHeaders,
} from "../utils/requests";

const hostname = window.location.hostname;
const tenantHostPrefix = hostname.split(".")[0];
let apiBaseUrl = `http://${tenantHostPrefix}.localhost:5000`;

const apiCalls = {
  login: async (data) => await reqAnonPost(`${apiBaseUrl}/login/`, data),
  thisTenant: async () => await reqAnonGet(`${apiBaseUrl}/`),
};

export default apiCalls;
