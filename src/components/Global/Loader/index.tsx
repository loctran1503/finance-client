import React, { ReactNode } from "react";
import { Bars } from "react-loader-spinner";
import { useAppSelector } from "../../../store/hook";
import { authSelector } from "../../../store/reducers/authSlice";
import styles from "./styles.module.scss";
const Loader = () => {
  const { isLoading } = useAppSelector(authSelector);
  return (
    <>
      {isLoading && (
        <div className={styles.overlay}>
          <div className={styles.loader}>
            <Bars
              height="40"
              width="40"
              color="#3f64e7"
              ariaLabel="bars-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Loader;
