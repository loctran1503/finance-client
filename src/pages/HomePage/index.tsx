import React from 'react'
import ChatRoom from '../../components/ChatRoom'
import styles from './styles.module.scss'
const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <ChatRoom/>
    </div>
  )
}

export default HomePage