export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { task, action } = body;
  let response;

  if (!action) {
    console.log("No action was passed!");
    return;
  }
  switch (action) {
    case "toggleTaskCompleted":
      try {
        response = await $fetch(`http://localhost:4000/tasks/${task.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            completed: !task.completed,
          }),
        });

        if (response) {
          return response;
        }
      } catch (error) {
        return false;
      }

      break;
    case "updateTaskTitle":
      try {
        response = await $fetch(`http://localhost:4000/tasks/${task.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            title: body.params.title,
            updated_at: body.params.updated_at,
          }),
        });

        if (response) {
          return response;
        }
      } catch (error) {
        return false;
      }

      break;

    case "updateTaskDescription":
      try {
        response = await $fetch(`http://localhost:4000/tasks/${task.id}`, {
          method: "PATCH",
          body: JSON.stringify({
            description: body.params.description,
            updated_at: body.params.updated_at,
          }),
        });

        if (response) {
          return response;
        }
      } catch (error) {
        return false;
      }

      break;

    default:
      console.log("Default was reached");
      break;
  }
});
