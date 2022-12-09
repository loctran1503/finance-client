import { ReactNode } from "react";
import Navbar from "../Navbar";


const DefaultLayout = ({ children }: { children: ReactNode }) => {
    return (
      <>
        <Navbar />
        <div>{children}</div>
  
  
      </>
    );
  };
  
  export default DefaultLayout;