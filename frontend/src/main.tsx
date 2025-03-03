import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from './components/Auth/Auth0ProviderWithNavigate';
import './index.css'
import App from './App'

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("Root element with ID 'root' not found in the DOM.");
}

/**
 * The Auth0Provider from the Auth0 React SDK remembers the route the user wanted to access and, if authentication were successful, it
 * takes the user to that route. As such, the Auth0Provider needs to have access to the session history of the application. Thus,
 * you need to wrap the Auth0Provider with BrowserRouter from React Router
 */

createRoot(rootElement).render(
  <StrictMode>
    <BrowserRouter>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </BrowserRouter>
  </StrictMode>
);