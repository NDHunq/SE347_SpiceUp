import axios from "../utils/axiosCustomize";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDY3YWYxZjBjYjRhNTI3ZWFkNzVhYiIsImVtYWlsIjoiYWRhbTExQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzM0MDY0NzcsImV4cCI6MTczMzQyNDQ3N30.278Ao8XGt23yugBi73fxHTYJSgEodIlFSgFqudxEs8U";
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
export { createStep, uploadImage, createRecipe, upload1Image, getAllRecipes };
