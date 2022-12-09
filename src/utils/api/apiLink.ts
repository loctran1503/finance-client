const urlServer = 'http://localhost:4000'
export const apiLink ={
    users:{
        signUp:`${urlServer}/users/signUp`,
        login:`${urlServer}/users/login`,
        checkAuth:`${urlServer}/users/checkAuth`,
        logout:`${urlServer}/users/logout`,
    }
}