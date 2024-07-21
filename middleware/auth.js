export default defineNuxtRouteMiddleware(async (to, from) => {
  const supabase = useSupabaseClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.log("No User is logged in!");
    return;
  }

  if (user && to.path === "/login") {
    return navigateTo("/");
  }
});
