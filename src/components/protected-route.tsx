import { ReactElement } from "react";
import { useSelector } from "../hooks/react-redux";
import { Navigate, useLocation } from "react-router-dom";

type ProtectedProps = {
  onlyUnAuth?: boolean;
  component: ReactElement;
}

function Protected({ onlyUnAuth = false, component }: ProtectedProps) {
  const isAuthChecked = useSelector((store) => store.auth.isAuthChecked);
  const user = useSelector((store) => store.auth.user);
  const location = useLocation();

  if (!isAuthChecked) {
    return null;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return component;
};

export const OnlyAuth = Protected;
export const OnlyUnAuth = ({ component }: {component: ReactElement}) => (
  <Protected onlyUnAuth={true} component={component} />
);
