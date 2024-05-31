export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { id } = body;

  try {
    const response = await $fetch(`http://localhost:4000/tasks/${id}`, {
      method: "DELETE",
      body: JSON.stringify(id),
    });

    if (response) {
      return response;
    }
  } catch (error) {
    return false;
  }
});
