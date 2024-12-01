import axios from "../utils/axiosCustomize";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDY3YWYxZjBjYjRhNTI3ZWFkNzVhYiIsImVtYWlsIjoiYWRhbTExQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzMwNjExODEsImV4cCI6MTczMzA3OTE4MX0.rdYnJvqyhBCx6sa6U93rpUdhTNCFe6ZcQoYawFqyyJ0";
const createStep = async (data) => {
  const response = await axios.post("api/v1/recipe/step/create", data);
  console.log("response", response);
};
const uploadImage = (imageArr) => {
  try {
    imageArr.map(async (image) => {
      const formData = new FormData();
      formData.append("file", image);

      const response = await axios.post("api/v1/image/upload", formData, {
        headers: {
          "Content-Type":
            "multipart/form-data; boundary=<calculated when request is sent>",
          Authorization: token,
        },
      });
      console.log("response", response);
    });
  } catch (error) {
    console.log("error", error);
  }
};
export { createStep, uploadImage };
