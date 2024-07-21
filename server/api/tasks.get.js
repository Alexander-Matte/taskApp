import { serverSupabaseClient } from "#supabase/server";
import { serverSupabaseUser } from "#supabase/server";

export default defineEventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const user = await serverSupabaseUser(event);

  try {
    const { data, error } = await supabase.from("tasks").select("*");

    if (error) {
      return error;
    }
    return data;
  } catch (error) {
    throw new Error("ERROR FETCHING DATA!!!");
  }
});
