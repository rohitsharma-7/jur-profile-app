import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import PageNotFound from "./components/NoPageFound";
import ProfileForm from "./components/ProfileForm";
import ViewProfile from "./components/ViewProfile";
import { APP_ROUTES, LOCAL_STORAGE_KEYS } from "./utils/enums";
import { extractJson } from "./utils/helper";
import CustomNavigator from "./components/CustomNavigator";

import "antd/dist/antd.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path={APP_ROUTES.ROOT}
            element={
              <Navigate
                replace
                to={
                  extractJson(LOCAL_STORAGE_KEYS.PROFILE_DATA)
                    ? APP_ROUTES.VIEW_PROFILE
                    : APP_ROUTES.CREATE_PROFILE
                }
              />
            }
          />
          <Route
            path={APP_ROUTES.EDIT_PROFILE}
            element={
              <CustomNavigator
                component={ProfileForm}
                redirectTo={APP_ROUTES.CREATE_PROFILE}
              />
            }
          />
          <Route
            path={APP_ROUTES.VIEW_PROFILE}
            element={
              <CustomNavigator
                component={ViewProfile}
                redirectTo={APP_ROUTES.CREATE_PROFILE}
              />
            }
          />
          <Route
            path={APP_ROUTES.CREATE_PROFILE}
            element={
              extractJson(LOCAL_STORAGE_KEYS.PROFILE_DATA) ? (
                <Navigate to={APP_ROUTES.VIEW_PROFILE} />
              ) : (
                <ProfileForm />
              )
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
