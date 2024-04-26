//is user logged in
export const isLoggedin = () => {
    let data = localStorage.getItem("token");
    console.log("In Method - isLoggedin, value of token ---" + data)
    if(data == null) {
        return false;
    }else{
        return true;
    }
};

//save token to local storage
export const doLogin = (token, next) => {
    console.log("In Method - doLogin")
    localStorage.setItem("token", JSON.stringify(token))
    next()
    //redirect to home page

};

//remove token from local storage
export const doLogout=(next)=>{
    console.log("In Method --- doLogout")
    localStorage.removeItem("token")
    next()
};

//get current user
export const getCurrentUser=()=>{
    if(isLoggedin){
        console.log("In Method --- getCurrentUser, User is loggedIn !!!")
        return JSON.parse(localStorage.getItem("token"))?.userReqDetails;
    }else{
        console.log("In Method --- getCurrentUser, User is not loggedIn !!!")
        return false;
    }
}