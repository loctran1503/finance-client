import React from 'react'
import styles from './styles.module.scss'
const ChatRoom = () => {

  return (
  
      <div className="grid wide">
        <div className="row">
          <div className="col l-8 l-o-2 m-12 m-o-2 c-12">
              <div className={styles.container}>
                <h3 className={styles.header}>Community</h3>
              </div>
          </div>
        </div>
      </div>
   
  )
}

export default React.memo(ChatRoom)