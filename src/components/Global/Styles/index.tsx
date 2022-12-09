import React, { ReactNode } from 'react'
import './reset.scss'
import './grid.scss'
import './base.scss'


const GlobalStyles = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
  };

export default GlobalStyles