export default defineEventHandler(async (event) => {
  try {
    const response = await $fetch("http://localhost:4000/tasks");
    if (response) {
      return response;
    }
  } catch (error) {
    return false;
  }
});
