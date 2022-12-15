// const severUrl = 'http://localhost:4444/finance/api'
  const severUrl = 'https://gentlevn.com/finance/api'

 // export const socketUrl ='http://localhost:4444/finance/api'
 export const socketUrl ='wss://gentlevn.com/finance/api'

export const apiLink ={
    users:{
        signUp:`${severUrl}/users/signUp`,
        login:`${severUrl}/users/login`,
        checkAuth:`${severUrl}/users/checkAuth`,
        logout:`${severUrl}/users/logout`,
    }
}