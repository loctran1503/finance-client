import  { ReactNode } from 'react'
import './reset.scss'
import './grid.scss'
import './base.scss'
import './pagnation.scss'
import 'react-multi-carousel/lib/styles.css';
import 'react-toastify/dist/ReactToastify.css';

const GlobalStyles = ({ children }: { children: ReactNode }) => {
    return <>{children}</>;
  };

export default GlobalStyles