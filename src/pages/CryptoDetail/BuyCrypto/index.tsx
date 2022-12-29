import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import React, { useState } from "react";
import Modal from "react-modal";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { authSelector, buyCrypto } from "../../../store/reducers/authSlice";
import { customModalStyles } from "../../../utils/constants/modal";
import { decimalConverterWithoutCurrency } from "../../../utils/funnctions/decimal";
import styles from "./styles.module.scss";

import { UserResponse } from "../../../utils/types/api";
import { toast, ToastContainer } from "react-toastify";

interface BuyCryptoType {
  id: string;
  price: number;
}

const BuyCrypto = ({ id, price }: BuyCryptoType) => {
  Modal.setAppElement("#root");
  const [amount, setAmount] = useState<string>("");
  const { isAuthenticated, user } = useAppSelector(authSelector);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAppDispatch();
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    //setAmount(0);
    setAmount('');
    setErrorMessage(null);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage(null);
 
    setAmount(e.target.value);
   
    
    
  };

  const handleSubmit = async () => {
    try {
      if (!amount || +amount <= 0) {
        setErrorMessage("Amount Invalid");
        return;
      }
      if (user && user?.usdt < Number.parseFloat(amount) * price) {
        setErrorMessage("Not Enough USDT");
        return;
      }

      await dispatch(
        buyCrypto({
          id,
          amount:Number.parseFloat(amount),
        })
      )
        .then((result) => {
          
          const data = result.payload as UserResponse;
          console.log(data);
          if(data && data.success && data.user){
            closeModal()
            toast.success(data.message)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <button
        id="btn-buy"
        disabled={!isAuthenticated}
        className={clsx(
          "btn",
          styles.btnControl,
          styles.btnBuy,
          !isAuthenticated && styles.btnDeactive
        )}
        onClick={openModal}
      >
        Buy
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => false}
        style={customModalStyles}
      >
        <div className="closeContainer">
          <FontAwesomeIcon
            icon={faXmark}
            className="closeIcon"
            onClick={() => closeModal()}
          />
        </div>
        <div className={styles.container}>
          <h2 className={styles.header}>Buy Cryptocurrency</h2>
          {errorMessage && (
            <h3 className="error-message-header">{errorMessage}</h3>
          )}
          <p className={styles.porfolioAmount}>
            Your USDT:{" "}
            <span>{decimalConverterWithoutCurrency(user?.usdt || 0)}</span>
          </p>
          <label className={clsx(styles.labelCustom, "label-custom")}>
            Enter {id} amount you want to buy
          </label>
          <input
            className={clsx("input-custom", errorMessage && "input-error")}
            value={amount}
            onChange={(e) => handleAmountChange(e)}
            type="number"
            placeholder="Enter your amount..."
          />
          {Number.parseFloat(amount) > 0 && (
            <p className={styles.buyDescription}>
              You'll pay{" "}
              <span className={styles.moneyHightlight}>{decimalConverterWithoutCurrency(price * Number.parseFloat(amount))}</span>{" "}
              USDT for {amount} {id.toUpperCase()}
            </p>
          )}
          <p className={styles.notice}>
            Notice:This price may changing in real time
          </p>

          <div className={styles.btnSubmit}>
            <button onClick={handleSubmit} className="btn">
              Buy
            </button>
          </div>
        </div>
      </Modal>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default BuyCrypto;
