import React, { useEffect } from 'react'
import ChatRoom from '../../components/ChatRoom'
import styles from './styles.module.scss'
const HomePage = () => {
  useEffect(() => {
    //console.log('Homepage rendering...');
    
  
  })
  
  
  return (
    <div className={styles.wrapper}>
      <ChatRoom/>
    </div>
  )
}

export default HomePage