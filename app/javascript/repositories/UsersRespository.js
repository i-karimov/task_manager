import * as routes from "../routes/ApiRoutes.js";
import FetchHelper from "../utils/fetchHelper.js";

export default {
  index(params) {
    const path = routes.apiV1UsersPath();
    return FetchHelper.get(path, params);
  },

  show(id) {
    const path = routes.apiV1UserPath(id);
    return FetchHelper.get(path);
  },
};
