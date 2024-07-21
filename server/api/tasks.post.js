import { serverSupabaseClient } from "#supabase/server";
import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  const { data, error } = await supabase
    .from("tasks")
    .insert([{ title: body.title, user_id: user.id }])
    .select();

  if (error) {
    console.log(error);
    return;
  }

  return data;
});
