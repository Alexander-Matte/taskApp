import { serverSupabaseClient, serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);
  console.log(body.id, body.completed);

  const { data, error } = await supabase
    .from("tasks")
    .update({ completed: !body.completed })
    .eq("id", body.id)
    .eq("user_id", user.id)
    .select();

  if (error) {
    console.error(error);
    throw createError({
      statusCode: 500,
      statusMessage: "Failed To make patch for toggling complete",
      message: error.message,
    });
  }

  return { data };
});
