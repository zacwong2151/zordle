import { Auth0Provider, AppState } from "@auth0/auth0-react";
import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

interface Auth0ProviderWithNavigateProps {
  children: React.ReactNode;
}

export const Auth0ProviderWithNavigate = ({ children } : PropsWithChildren<Auth0ProviderWithNavigateProps>): JSX.Element | null => {
  const navigate = useNavigate();

  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{ // these are the query parameters that are sent when you make a call to the Auth0 /authorize endpoint
        redirect_uri: `${window.location.origin}/callback`, // this is the URL where Auth0 will redirect your users back to your React application after successful authentication
      }}
      onRedirectCallback={onRedirectCallback} // the login and logout buttons define the value of the appState.returnTo property
    >
      {children}
    </Auth0Provider>
  );
};

