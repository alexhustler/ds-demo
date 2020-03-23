import axios from "axios";

import { logout } from "./authentication/authentication-actions";

export const initializeHttpService = () => {
  return async (dispatch: Function) => {
    axios.interceptors.response.use(
      function(response) {
        return response;
      },
      function(error) {
        // intercepts 401 errors and redirects user to /login page
        if (error.message === "Request failed with status code 401") {
          logout()(dispatch);
        }
        return Promise.reject(error);
      }
    );
  };
};

const httpService = {
  axios,
  axiosWithoutInterceptors: axios.create(),
};

export default httpService;
