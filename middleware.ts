export { default } from "next-auth/middleware"

// protect user navigating to unathorised pages by url
// matcher used to protect required routes
// implement callback and revert user back to /
// Prevent accessing favourites or internal pages when logged out
export const config = { 
  matcher: [
    "/trips",
    "/reservations",
    "/properties",
    "/favorites"
  ]
};
