import axios from "../utils/axiosCustomize";

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDY3YWYxZjBjYjRhNTI3ZWFkNzVhYiIsImVtYWlsIjoiYWRhbTExQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzU1NzMwNzcsImV4cCI6MTczNTU5MTA3N30.lKEFOvQgEx0Ze89keKB6nmHxX4kpJ1_HDtIBuAri8ZU";

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
const getAnalysis2 = async (year) => {
  const response = await axios.get(`api/v1/admin/analysis?year=${year}`);
  return response ? response.data : null;
};
const getAnalysis = async (month, year) => {
  try {
    const response = await axios.get(
      `/api/v1/admin/analysis?year=${year}&month=${month}`
    );
    return response;
  } catch (e) {
    return e;
  }
};
export { editRecipe, deleteRecipe, getAnalysis, getAnalysis2 };
