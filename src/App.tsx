import React, { ReactNode, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loader from "./components/Global/Loader";
import NoneLayout from "./components/Layouts/NoneLayout";
import NotFound from "./pages/NotFound";
import { privateRoutes, publicRoutes } from "./routes";
import ProtectedRoute from "./routes/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "./store/hook";
import { appSelector } from "./store/reducers/appSlice";
import { authSelector } from "./store/reducers/authSlice";

function App() {

  useEffect(() => {
    //console.log("App rendering");
  });

  return (
    <>
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
    </>
  );
}

export default React.memo(App);
