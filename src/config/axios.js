import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_SERVER_ENDPOINT;
axios.defaults.headers.common["Authorization"] = !!localStorage.getItem("token")
  ? `Bearer ${localStorage.getItem("token")}`
  : "";

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    return response;
  },
  function(error) {
    ;
    if (
      error.response.status === 403 &&
      error.response.data.error === "TokenExpiredError"
    ) {
      alert("Your session has expired. Please sign-in again!")
      localStorage.clear();
      window.location.reload();
    } else {
      return Promise.reject(error);
    }
  }
);
