import React from 'react';
import { connect } from 'react-redux';
import { User } from '../../databse';
import { authProvider, sign_out_user } from '../../functions/authFunctions';
import { remove_user_data, store_user_data } from '../../store/actions/authActions';

const inital_user = {
    user: null,
    signin: () => null,
    signup: () => null,
    signout: () => null,
    getuser: () => null,
    closeError: () => null,
    error: null,
    user_data: null,
    setUserData: () => null
}
const user_db = new User()


const AuthContext = React.createContext(inital_user)

function AuthProvider({ children, currentUser, signOutUser, loginUser, _user }) {


    let [user, setUser] = React.useState(currentUser.data ? currentUser.data : null);
    let [user_data, setUserData] = React.useState(currentUser.data ? currentUser.data : null);
    let [error, setError] = React.useState(null);

    let signin = (newUser, callback) => {
        const stat = user_db.login(newUser.email, newUser.password)
        if (!user_db.loggedIn && stat.error) {
            setError(stat.error)
            setTimeout(() => {
                setError(null)
            }, 10000)
            console.log(stat)
            return
        }
        setUser(user_db.loggedIn)
        setUserData(user_db.get_user())
        loginUser(user_db.get_user())
    };

    let signup = (user) => {
        const stat = user_db.signup(user)
        if (!user_db.loggedIn && stat.error) {
            setError(stat.error)
            setTimeout(() => {
                setError(null)
            }, 10000)
            console.log(stat)
            return
        }
        setUser(user_db.loggedIn)
        setUserData(user_db.get_user())
        loginUser(user_db.get_user())
    }

    let signout = (callback) => {
        user_db.logout()
        setUser(null)
        signOutUser()
        setUserData(null)
        console.log(_user.data, currentUser.data, user_db.loggedIn)
    }

    let getuser = (callback) => {
        const dat = user_db.get_user()
        console.log(dat)
        return dat
    }

    let closeError = () => {
        setError(null)
    }

    let value = { user, signin, signout, getuser, signup, closeError, error, user_data, setUserData };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => React.useContext(AuthContext);

const mapStateToProps = (state) => {
    return {
        _user: state.user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loginUser: (data) => dispatch(store_user_data(data)),
        signOutUser: () => dispatch(remove_user_data())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider)