// routes which can be accessed by the logged out users/ public 
// JS docs so that when we hover on the publicRoutes we can see these comments

/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error"
];

// this route should be always allowed for user to login /signup

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication process
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

// this is the place where we will redirect whenever the user is logged in, unless specified differently
/**
 * The default redirect path after logging in 
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings"