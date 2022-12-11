// const urlServer = 'http://localhost:4000'
const urlServer = 'https://gentlevn.com/finance/api'
export const apiLink ={
    users:{
        signUp:`${urlServer}/users/signUp`,
        login:`${urlServer}/users/login`,
        checkAuth:`${urlServer}/users/checkAuth`,
        logout:`${urlServer}/users/logout`,
    }
}