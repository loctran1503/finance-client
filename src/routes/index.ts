import { ReactNode } from "react";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import Login from "../components/Auth/Login";
import HomePage from "../pages/HomePage";
import Profile from "../pages/Profile";

interface IRouter {
    path: string;
    component: () => JSX.Element;
    layout?: ({ children }: { children: ReactNode }) => JSX.Element;
  }

export const publicRoutes : IRouter[]=[

  {path:'/',component:HomePage ,layout: DefaultLayout}
 
]

export const privateRoutes : IRouter[] =[
  {path:'/profile',component:Profile,layout:DefaultLayout}
]