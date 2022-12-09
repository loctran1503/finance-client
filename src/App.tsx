import React, { ReactNode, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NoneLayout from "./components/Layouts/NoneLayout";
import Loader from "./components/Global/Loader";
import NotFound from "./pages/NotFound";
import { privateRoutes, publicRoutes } from "./routes";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { authSelector, checkAuthenticate } from "./store/reducers/authSlice";
import { UserResponse } from "./utils/types/api";

function App() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector(authSelector);
  useEffect(() => {
 
    const checkAuth = async () => {
    dispatch(checkAuthenticate())
    };
    checkAuth();
  }, [isAuthenticated]);

  return (
    <>
      <Loader>
        <BrowserRouter>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              const Layout: ({
                children,
              }: {
                children: ReactNode;
              }) => JSX.Element = route.layout || NoneLayout;

              return (
                <Route
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                  key={index}
                />
              );
            })}

            {privateRoutes.map((route, index) => {
              const Page = route.component;
              const Layout: ({
                children,
              }: {
                children: ReactNode;
              }) => JSX.Element = route.layout || NoneLayout;

              return (
                <Route
                  path={route.path}
                  element={
                    <Layout>
                      <ProtectedRoute component={Page} />
                    </Layout>
                  }
                  key={index}
                />
              );
            })}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </Loader>
    </>
  );
}

export default App;
