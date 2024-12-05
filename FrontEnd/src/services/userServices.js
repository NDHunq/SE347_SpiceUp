import axios from "../utils/axiosCustomize";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDY3YWYxZjBjYjRhNTI3ZWFkNzVhYiIsImVtYWlsIjoiYWRhbTExQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzM0MDcyMjksImV4cCI6MTczMzQyNTIyOX0.bC_8GhLOYu5al-D8nczXv72q5W6eg5rS_TriRA5MusA";
const getARecipe = (id) => {
  return axios.get("api/v1/recipe/get/" + id, {
    headers: {
      Authorization: token,
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
const increaseView = (id) => {
  return axios.get("api/v1/recipe/view/increase/" + id, {
    headers: {
      Authorization: token,
    },
  });
};
const getComment = (id) => {
  return axios.get("api/v1/recipe/comment/get/" + id, {
    headers: {
      Authorization: token,
    },
  });
};
const getUser = (id) => {
  return axios.get("api/v1/user/info/" + id, {
    headers: {
      Authorization: token,
    },
  });
};
const postComment = (comment) => {
  return axios.post("api/v1/recipe/comment", comment, {
    headers: {
      Authorization: token,
    },
  });
};
const getReicpeByUser = (id) => {
  return axios.get("api/v1/recipe/user/" + id, {
    headers: {
      Authorization: token,
    },
  });
};
const getSavedRecipe = (id) => {
  return axios.get("api/v1/recipe/save/get/" + id, {
    headers: {
      Authorization: token,
    },
  });
};
const change_password = (userId, obj) => {
  return axios.get("api/v1/user/change_password/" + userId, obj, {
    headers: {
      Authorization: token,
    },
  });
};
const saveReicpe = (recipeId, body) => {
  return axios.post("api/v1/recipe/save/" + recipeId, body, {
    headers: {
      Authorization: token,
    },
  });
};
const getAllRecipe = () => {
  return axios.get("api/v1/recipe/get", {
    headers: {
      Authorization: token,
    },
  });
};
const changUserInfo = (userId, obj) => {
  return axios.put("api/v1/user/info/update/" + userId, obj, {
    headers: {
      Authorization: token,
    },
  });
};
const getImage = async (avatarId) => {
  const res = await axios.get(`api/v1/image/${avatarId}`, {
    responseType: "arraybuffer",
    headers: {
      Authorization: token,
    },
  });
  const blob = new Blob([res.data], {
    type: `${res.headers["content-type"]}`,
  });
  const url = URL.createObjectURL(blob);
  return url;
};
const pushImage = (formData) => {
  return axios.post("api/v1/image/upload", formData, {
    headers: {
      Authorization: token,
      "Content-Type": "multipart/form-data",
    },
  });
};

export {
  getARecipe,
  getUserInfo,
  getBillingAddress,
  increaseView,
  getComment,
  getUser,
  postComment,
  getReicpeByUser,
  getSavedRecipe,
  change_password,
  saveReicpe,
  getAllRecipe,
  changUserInfo,
  getImage,
  pushImage,
};
