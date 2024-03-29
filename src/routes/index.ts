import { ReactNode } from "react";
import DefaultLayout from "../components/Layouts/DefaultLayout";
import Login from "../components/Auth/Login";
import HomePage from "../pages/HomePage";
import Profile from "../pages/Profile";
import CryptoDetail from "../pages/CryptoDetail";
import AllUsers from "../pages/AllUsers";


interface IRouter {
    path: string;
    component: () => JSX.Element;
    layout?: ({ children }: { children: ReactNode }) => JSX.Element;
  }

export const publicRoutes : IRouter[]=[
  {path:'/',component:HomePage ,layout: DefaultLayout},
  {path:'/:page',component:HomePage ,layout: DefaultLayout},
  {path:'/crypto/:id',component:CryptoDetail ,layout: DefaultLayout},
  {path:'/all-users',component:AllUsers ,layout: DefaultLayout},
 
]

export const privateRoutes : IRouter[] =[
  {path:'/profile',component:Profile,layout:DefaultLayout}
]