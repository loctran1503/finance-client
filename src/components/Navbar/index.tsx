import React, { useEffect, useState } from "react";
import styles from "./index.module.scss";

import clsx from "clsx";
import logo from "../../assets/images/logo-removebg-preview.png";
import Search from "./Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown } from "@fortawesome/free-solid-svg-icons";
import Login from "../Auth/Login";
import SignUp from "../Auth/Signup";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { authSelector, checkAuthenticate, setIsLoading } from "../../store/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const { isAuthenticated, user } = useAppSelector(authSelector);
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  useEffect(() => {
    axios.defaults.withCredentials =true
    const checkAuth = async () => {
      dispatch(checkAuthenticate());
    };
    checkAuth();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div className="grid wide">
        <div className="row">
          <div className="col l-12 m-12 c-12">
            <div className={styles.container}>
              <div className={clsx(styles.navbarLeft)}>
                <img className={styles.logo} src={logo} onClick={() =>{navigate('/')}} />
                <div
                  className={clsx(
                    styles.leftItemContainer,
                    "d-flex align-items-center"
                  )}
                >
                  <h3 className={styles.leftItem} onClick={() => {
                    dispatch(setIsLoading(true))
                    navigate('/all-users')
                  }}>All Users</h3>
                
                </div>
              </div>
              <div className={styles.navbarRight}>
                {/* <div className={styles.languageContainer}>
                  <div className={styles.languageDisplay}>
                    <h3>English</h3>
                    <span className={styles.languageIcon} />
                  </div>
                  <div className={styles.changeLanguageContainer}>
                    <h4 className={styles.changeLanguageItem}>English</h4>
                    <h4 className={styles.changeLanguageItem}>Vietnamese</h4>
                  </div>
                </div>

                <Search /> */}

                {isAuthenticated && (
                  <div className={styles.userProfile} >
                  <p onClick={() => navigate('/profile')}>{user?.name}</p>
                  
                  </div>
                )}
                {!isAuthenticated && <Login />}
                {!isAuthenticated && <SignUp />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
