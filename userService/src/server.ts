import express, { Application, Request, Response } from 'express';
import { auth, requiresAuth } from 'express-openid-connect'

const app: Application = express();
const PORT = 7000;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'EM5hrJpyO2170obNd45NcnlWCM8PlE_hGYeXoKqN3o6nb7xOwvYbJ0jL6UUO4_BR', // A long, random string
    baseURL: 'http://localhost:7000', // The URL where the application is served
    clientID: 'od6BO25yGX1PSYfqNdk1JqWhWBwAEY7J', // The Client ID found in your Application settings
    issuerBaseURL: 'https://dev-ujz80pajt2irh243.us.auth0.com' // The Domain as a secure URL found in your Application settings
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

/**
 * For testing purposes.
 */
app.get('/', (req, res) => {
    res.send('hello worldd')
});

/**
 * Add the requiresAuth middleware for routes that require authentication. Any route using this middleware will check for a valid
 * user session and, if one does not exist, it will redirect the user to log in.
 */
app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});

app.listen(PORT, () => {
    console.log(`userService is running at https://localhost:${PORT}`);
});