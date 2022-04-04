const authProvider = {
    isAuthenticated: false,
    signin (callback) {
        authProvider.isAuthenticated = true;
        callback()
    },
    signout(callback){
        authProvider.isAuthenticated = false;
        callback()
    },
    getuser(callback){
        return callback()
    }
}

export { authProvider }

export const login = async (email, password) => {

   
}

export const load_user = async () => {
   
}

export const sign_out_user = async () => {
   
}

export const get_user = async () => {
    
}