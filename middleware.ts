export { default } from "next-auth/middleware"

/** Protect user navigating to unathorised pages by url 
    Matcher used to protect required routes
    Implement callback and revert user back to / (unrestriced)
    Prevent accessing favourites or internal pages when logged out 
*/
   
export const config = { 
  matcher: [
    "/trips",
    "/reservations",
    "/properties",
    "/favorites"
  ]
};
