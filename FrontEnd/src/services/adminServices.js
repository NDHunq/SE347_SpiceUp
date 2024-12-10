import axios from "../utils/axiosCustomize";
const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDY3YWYxZjBjYjRhNTI3ZWFkNzVhYiIsImVtYWlsIjoiYWRhbTExQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3MzM4MzM4MzUsImV4cCI6MTczMzg1MTgzNX0.dnNp_k6DwXn4WovsLMJvBB8LMgKxiupXIqLzACsdVK8";

const editRecipe = (recipeId, body) => {
  return axios.put("api/v1/recipe/update/" + recipeId, body, {
    headers: {
      Authorization: token,
    },
  });
};
export { editRecipe };
