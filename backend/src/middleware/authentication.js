import { validateToken } from "../services/authentication.js";


function checkForAuthenticationCookie(CookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[CookieName];
    if (!tokenCookieValue) {
     return next();
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      //console.log('User Payload',userPayload);
      req.user = userPayload;
      next();
    } catch (error) {
      next();
    }
  }
}
 export default checkForAuthenticationCookie;