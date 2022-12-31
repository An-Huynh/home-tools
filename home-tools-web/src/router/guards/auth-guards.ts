import store from "@/store";

export function AuthGuard(): boolean | string {
  if (store.state.auth.isAuthenticated) {
    return true; // Allow access to route.
  } else {
    return "/login"; // Redirect to login page if user is not authorized.
  }
}

export function UnauthGuard(): boolean | string {
  if (!store.state.auth.isAuthenticated) {
    return true; // Allow access to route.
  } else {
    // Redirect user to home page since user is already
    // authorized but attempting to access unauthorized
    // page such as the login page.
    return "/";
  }
}
