import { ReactNode } from "react";
import Loader from "../Global/Loader";

const NoneLayout = ({ children }: { children: ReactNode }) => {
    return (
      <>
        {children}
   
        <Loader/>
      </>
    );
  };
  
  export default NoneLayout;
  