import clsx from "clsx";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hook";
import { authSelector, userLogout } from "../../store/reducers/authSlice";
import { DefaultResponse } from "../../utils/types/api";
import styles from "./styles.module.scss";

const Profile = () => {
  const { user } = useAppSelector(authSelector);
  //React-router-dom
  const navigate = useNavigate()

  //Redux
  const dispatch = useAppDispatch()
  
  const handleLogout = async () =>{
    dispatch(userLogout()).then((data) =>{
      const result  = data.payload as DefaultResponse
      if(result.success){
        navigate('/')
      }else{
        alert(result.message)
      }
    }).catch(error =>{console.log(error)})
  }
  return (
    <div className={styles.wrapper}>
      <div className="grid wide">
        <div className="row">
          <div className="col l-8 l-o-2 m-8 m-o-2 c-12">
            {user && (
              <div className={styles.container}>
                <div className="row">
                  <div className="col l-9 m-9 c-12">
                    <div className={styles.userProfile}>
                      <img
                        className={styles.userAvatar}
                        src={user.avatar}
                        alt=""
                      />
                      <h3 className={styles.userName}>{user?.name}</h3>
                    </div>
                  </div>
                  <div className="col l-3 m-3 c-12">
                    <div className={styles.userController}>
                      <button className={clsx('btn',styles.btnLogout)} onClick={handleLogout}>Log out</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
