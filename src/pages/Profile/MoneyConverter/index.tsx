import React, { useState } from "react";
import styles from "./styles.module.scss";
import Modal from "react-modal";
import { customModalStyles } from "../../../utils/constants/modal";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { authSelector, setUserMoneyAndEvents } from "../../../store/reducers/authSlice";
import { convertToUsdApi, convertToUsdtApi } from "../../../utils/api/coins";
import { ToastContainer,toast } from "react-toastify";
const MoneyConverter = ({ type }: { type: string }) => {
  Modal.setAppElement("#root");
  const [isOpen, setIsOpen] = useState(false);
  const {user} = useAppSelector(authSelector)
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    setErrorMessage(null)
    setAmount("")
  };

  //Displaying error
  const [errorMessage,setErrorMessage] = useState<string | null>(null)
//Initial Value
  const [amount,setAmount] = useState<string>("")

 //Redux
 const dispatch = useAppDispatch()

  const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    if(errorMessage) setErrorMessage(null)
    setAmount(e.target.value)
  }
  const handleConvert =async () =>{
    if(user){
      if(!amount){
        setErrorMessage('Value Invalid')
        return
      }
      if(type==='USDT'){
        if(user.usd<Number.parseFloat(amount)) {
          setErrorMessage('Not Enough USD')
          return
        }
      
        //All thing is good
        const result = await convertToUsdtApi(Number.parseFloat(amount))
        if(!result.success) setErrorMessage(result.message)
        dispatch(setUserMoneyAndEvents({
          usd:result.user?.usd,
          usdt:result.user?.usdt,
          events:result.user?.events || []
        }))
        closeModal()
        toast.success(result.message)
      }
      //type===USD
      else{
        if(user.usdt<Number.parseFloat(amount)) {
          setErrorMessage('Not Enough USDT')
          return
        }
        const result = await convertToUsdApi(Number.parseFloat(amount))
        if(!result.success) setErrorMessage(result.message)
        dispatch(setUserMoneyAndEvents({
          usd:result.user?.usd,
          usdt:result.user?.usdt,
          events:result.user?.events || []
        }))
        closeModal()
        toast.success(result.message)
      }
    }
  }
  return (
    <span>
      {type === "USDT" ? (
        <span className={styles.convertToUSDT} onClick={openModal}>Convert To USDT</span>
      ) : (
        <span className={styles.convertToUSD} onClick={openModal}>Convert To USD</span>
      )}

      <Modal
        isOpen={isOpen} // Cannot close on outside clicking
        onRequestClose={() => false}
        style={customModalStyles}
      >
        <div className={styles.container}>
          <div className="closeContainer">
            <FontAwesomeIcon
              icon={faXmark}
              className="closeIcon"
              onClick={() => closeModal()}
            />  
          </div>
          <h2 className={styles.header}>{type==="USDT" ? "Convert USD To USDT" : "Convert USDT To USD"}</h2>
          {errorMessage && <h3 className="error-message-header">{errorMessage}</h3>}
          <label className="label-custom">{type==='USDT' ? "Enter your USD" : " Enter your USDT" }</label>
          <input type="number" value={amount} placeholder={type==='USDT' ? 'USDT -> USD' : 'USDT -> USD'} onChange={(e) =>{
            handleInputChange(e)
          }} className={clsx("input-custom",errorMessage && "input-error")} />
          <p className={styles.convertPreview}>You'll receive {amount ? amount : 0} {type==='USDT' ? "USDT" : "USD" }</p>
          <div className={styles.btnSubmit}>
            <button className="btn" onClick={handleConvert}>Convert</button>
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
    </span>
  );
};

export default MoneyConverter;
