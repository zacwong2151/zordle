import { withAuthenticationRequired } from "@auth0/auth0-react";
import React, { ComponentType } from "react";
import LoadingPage from "../Misc/LoadingPage";

interface ProtectedRouteProps {
  component: ComponentType;
}

/*
  React.FC:
    Stands for React Functional Component.
    This is a TypeScript type alias for function components in React.
    It ensures that the component follows the structure of a valid React component (e.g., returns JSX and accepts props)  

  React.FC<ProtectedRouteProps> is the data type of the ProtectedRoute component
  <ProtectedRouteProps> is a generic type parameter that defines the shape of the props accepted by the component
*/

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <LoadingPage />
    ),
  });

  return <Component />;
};
