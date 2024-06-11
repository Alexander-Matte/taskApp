export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  try {
    const response = await $fetch(`http://localhost:4000/tasks`, {
      method: "POST",
      body: body,
    });

    if (response) {
      return response;
    }
  } catch (error) {
    return false;
  }
});
