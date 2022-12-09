import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { Form, Formik, FormikHelpers } from "formik";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { clearScreenDown } from "readline";
import { useAppDispatch } from "../../store/hook";
import { userSignup } from "../../store/reducers/authSlice";
import { signUpApi } from "../../utils/api/users";
import { customModalStyles } from "../../utils/constants/modal";
import { SignUpByPassWord, UserResponse } from "../../utils/types/api";
import InputCustom from "../Global/InputCustom";
import { authSchema } from "../Global/InputCustom/Schemas";
import styles from "./styles.module.scss";

const SignUp = () => {
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
  const dispatch = useAppDispatch()

  // SignUp
  const initialValues: SignUpByPassWord = { email: "", password: "" };
  //Displaying error
  const [errorMessage,setErrorMessage] = useState<string | null>(null)

  // Submit
  

  const handleSubmit = async (values : SignUpByPassWord,actions : FormikHelpers<SignUpByPassWord>) =>{
    dispatch(userSignup(values))
    .then((data) => {
      if (data.payload) {
        const reduxResult = data.payload as UserResponse;
        if (reduxResult.success) {
          alert("Registing Successfully!");
          actions.setSubmitting(false)
          actions.resetForm()
          closeModal();
        }else{
          setErrorMessage(reduxResult.message)
          actions.setSubmitting(false)
          
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
      <button
        className={clsx("btn", styles.btnSignUp)}
        onClick={() => openModal()}
      >
        Sign up
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
          <h2 className={styles.header}>Sign Up</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={authSchema}
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
                  className={clsx(styles.btnSubmit2)}
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Loading...' : 'Sign up'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
};

export default SignUp;
