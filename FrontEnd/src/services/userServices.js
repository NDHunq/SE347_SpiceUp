import axios from "../utils/axiosCustomize";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDY3YWYxZjBjYjRhNTI3ZWFkNzVhYiIsImVtYWlsIjoiYWRhbTExQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzI4NzAxMDYsImV4cCI6MTczMjg4ODEwNn0.kUYVhawdP_rpCtMOnQW61ZcAqfOYa_20cimAieP4fwg";
const getARecipe = (id) => {
  return axios.get("api/v1/recipe/get/" + id, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const getUserInfo = (id) => {
  return axios.get("api/v1/user/info/" + id, {
    headers: {
      Authorization: token,
    },
  });
};
const getBillingAddress = (id) => {
  return axios.get("api/v1/user/billingAddress/" + id, {
    headers: {
      Authorization: token,
    },
  });
};

export { getARecipe, getUserInfo, getBillingAddress };
