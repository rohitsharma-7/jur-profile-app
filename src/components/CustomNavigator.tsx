import { Navigate } from "react-router-dom";
import { LOCAL_STORAGE_KEYS } from "src/utils/enums";
import { extractJson } from "src/utils/helper";

interface CustomNavigatorProps {
  redirectTo: string;
  component: React.ElementType;
}

const CustomNavigator = ({
  component: Component,
  redirectTo,
}: CustomNavigatorProps) => {
  const profileData = extractJson(LOCAL_STORAGE_KEYS.PROFILE_DATA);
  return profileData ? <Component /> : <Navigate to={redirectTo} />;
};

export default CustomNavigator;
