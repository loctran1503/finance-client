import { ReactNode } from "react";
import Loader from "../Global/Loader";
import Navbar from "../Navbar";


const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (
      <>
        <Navbar />
        <div>{children}</div>
  
        <Loader/>
      </>
    );
  };
  
  export default DefaultLayout;