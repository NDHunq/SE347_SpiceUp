import axios from "../utils/axiosCustomize";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDY3YWYxZjBjYjRhNTI3ZWFkNzVhYiIsImVtYWlsIjoiYWRhbTExQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzM5ODUwOTEsImV4cCI6MTczNDAwMzA5MX0.gGTELzTd_IIBfE4LNMMVL6-3HctSLruIkZp-DpTbWUA";

const editRecipe = (recipeId, body) => {
  return axios.put("api/v1/recipe/update/" + recipeId, body, {
    headers: {
      Authorization: token,
    },
  });
};

const deleteRecipe = (recipeId) => {
  return axios.delete("api/v1/recipe/delete/" + recipeId, {
    headers: {
      Authorization: token,
    },
  });
};
const getAnalysis = async (year) => {
  const response = await axios.get(`api/v1/admin/analysis?year=${year}`);
  return response ? response.data : null;
};
export { editRecipe, deleteRecipe, getAnalysis };
