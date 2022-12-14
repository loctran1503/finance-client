import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Form, Formik, FormikHelpers } from "formik";
import { useState } from "react";
import Modal from "react-modal";
import { useAppDispatch } from "../../store/hook";
import { userLogin } from "../../store/reducers/authSlice";

import { customModalStyles } from "../../utils/constants/modal";
import { LoginByPassWord, SignUpByPassWord, UserResponse } from "../../utils/types/api";
import InputCustom from "../Global/InputCustom";
import { authSchema, loginSchema } from "../Global/InputCustom/Schemas";
import styles from "./styles.module.scss";

const Login = () => {
  //Modal
  Modal.setAppElement("#root");
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  //Redux
  const dispatch = useAppDispatch();

  // Login
  const initialValues: LoginByPassWord = { email: "", password: "" };
  //Displaying error
  const [errorMessage,setErrorMessage] = useState<string | null>(null)

  // Submit
  const handleSubmit = async (values : LoginByPassWord,actions : FormikHelpers<LoginByPassWord>) => {
    setErrorMessage(null)
    dispatch(userLogin(values))
      .then((data) => {
        if (data.payload) {
          const reduxResult = data.payload as UserResponse;
          if (reduxResult.success) {
            closeModal();
            alert("Login Successfully!");
            actions.setSubmitting(false)
            actions.resetForm()
          }else{
            setErrorMessage(reduxResult.message)
            actions.setSubmitting(false)
            actions.resetForm()
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <button
        className={clsx("btn", styles.btnLogin)}
        onClick={() => openModal()}
      >
        Log In
      </button>

      <Modal
        isOpen={isOpen}
        // Cannot close on outside clicking
        onRequestClose={() => false}
        style={customModalStyles}
      >
        <div className={styles.container}>
          <div className={styles.closeContainer}>
            <FontAwesomeIcon
              icon={faXmark}
              className={styles.closeIcon}
              onClick={() => closeModal()}
            />
          </div>
          <h2 className={styles.header}>Log In</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={loginSchema}
            onSubmit={(values, actions) => {
           
              
              
              handleSubmit(values,actions)
              }}
          >
            {({isSubmitting}) => (
              <Form>
                {errorMessage && <h3 className="error-message-header">{errorMessage}</h3>}
                <InputCustom
                  type="text"
                  label="Email"
                  placeholder="Enter your email address..."
                  name="email"
                />
                <InputCustom
                  type="password"
                  name="password"
                  placeholder="Enter your password..."
                  label="Password"
                />
                <button
                  className={clsx(styles.btnSubmit)}
                  type="submit"
                  disabled={isSubmitting}
                  onClick={() =>{console.log(123);
                  }}
                >
                  {isSubmitting ? 'Loading...' : 'Log In'}
                </button>
              </Form>
            )}
          </Formik>
          
        </div>
      </Modal>
    </div>
  );
};

export default Login;
