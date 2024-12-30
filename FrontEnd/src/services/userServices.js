import axios from "../utils/axiosCustomize";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDY3YWYxZjBjYjRhNTI3ZWFkNzVhYiIsImVtYWlsIjoiYWRhbTExQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzU1NjgxNTEsImV4cCI6MTczNTU4NjE1MX0.hac7ZQeyuQ_Dr6hdWvRYrNsj6jAxAoq-Uw-U2cCB66M";

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

const createStep = async (data) => {
  console.log("data", data);

  const response = await axios.post("api/v1/recipe/step/create", data, {
    headers: {
      Authorization: token,
    },
  });
  return response ? response.data.recipeIds : null;
};
const createRecipe = async (data) => {
  const response = await axios.post("api/v1/recipe/create", data, {
    headers: {
      Authorization: token,
    },
  });
  return response ? response.data.id : null;
};
const uploadImage = async (imageArr) => {
  try {
    const uploadImages = await Promise.all(
      imageArr.map(async (image) => {
        const formData = new FormData();
        formData.append("file", image);

        const response = await axios.post("api/v1/image/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: token,
          },
        });

        return response.data.file.fileId.toString();
      })
    );

    return uploadImages;
  } catch (error) {
    console.log("error", error);
    return null;
  }
};
const upload1Image = async (image) => {
  try {
    let uploadImage = "";

    const formData = new FormData();
    formData.append("file", image);

    const response = await axios.post("api/v1/image/upload", formData, {
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=<calculated when request is sent>",
        Authorization: token,
      },
    });
    // console.log("response", response);
    uploadImage = response.data.file.fileId;

    return uploadImage;
  } catch (error) {
    console.log("error", error);

    return null;
  }
};
const getAllRecipes = async () => {
  const response = await axios.get("api/v1/recipe/get", {
    headers: {
      Authorization: token,
    },
  });
  return response ? response.data : null;
};
const updateStatus = async (recipeId, status) => {
  const response = await axios.put(
    `api/v1/recipe/status/update/${recipeId}?status=${status}`,
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response ? response.data : null;
};

const getTopProducts = async (limit, field, order) => {
  try {
    const requestedBody = {
      sort: {
        field: field, //[created_at, price, average_ratings, discount]
        order: order, // [asc, desc]
      }, // || null
      category: null, // || null
      price: null, // || null
      average_ratings: null, // || null
      product_name: null, // || null
    };
    const response = await axios.post(
      `/api/v1/product/filter?page=1&limit=${limit}`,
      requestedBody
    );
    return response;
  } catch (e) {
    return e;
  }
};

const getLastestRecipe = async (page, limit) => {
  try {
    const response = await axios.post(
      `/api/v1/recipe/get?page=${page}&limit=${limit}`
    );
    return response;
  } catch (e) {
    return e;
  }
};

const changePassword = async (userId, oldPassword, newPassword) => {
  try {
    const response = await axios.post(
      `/api/v1/user/change_password/${userId}`,
      {
        method: "POST",
        body: {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
      }
    );
    return response;
  } catch (e) {
    return e;
  }
};

const sendResetMail = async (email) => {
  try {
    const response = await axios.post(
      `/api/v1/user/reset_password/send?user_email=${email}`
    );
    return response;
  } catch (e) {
    return e;
  }
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
  createStep,
  uploadImage,
  createRecipe,
  upload1Image,
  getAllRecipes,
  updateStatus,
  getTopProducts,
  getLastestRecipe,
  changePassword,
  sendResetMail,
};
