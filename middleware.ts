export { default } from "next-auth/middleware"

// protect user navigating to unathorised pages by url
// matcher used to protect required routes
// implement callback and revert user back to /
export const config = { 
  matcher: [
    "/trips",
    "/reservations",
    "/properties",
    "/favorites"
  ]
};
