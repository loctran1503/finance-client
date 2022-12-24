import React, { useEffect } from 'react'
import ChatRoom from '../../components/ChatRoom'
import CryptoList from '../../components/CryptoList'
import styles from './styles.module.scss'
const HomePage = () => {
  useEffect(() => {
    
    
  
  })
  
  
  return (
    <div className={styles.wrapper}>
      <ChatRoom/>
      <CryptoList/>
    </div>
  )
}

export default HomePage