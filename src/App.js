import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Screens/Store/Home';
import ProductPage from './Screens/Store/ProductPage';
import HomeScreen from './Screens/Store/Home/home';
import Cart from './GlobalContexts/ChartContext';
import ProductCategoryPage from './Screens/Store/ProductCategoryPage';
import CartPage from './Screens/Store/CartPage';
import GenderSwitch from './GlobalContexts/GenderSwitch';
import AuthProvider from './GlobalContexts/AuthProvider';
import Signin from './Screens/Auth/Signin';
import Signup from './Screens/Auth/Signup';
import { RequireNoAuth } from './GlobalContexts/RequireNoAuth';
import { connect } from 'react-redux';
import Dashboard from './Screens/Dashboard';
import { RequireAuth } from './GlobalContexts/RequireAuth';
import Main from './Screens/Dashboard/Main';
import Products from './Screens/Dashboard/Product';

function App(props) {
    const { user } = props;
    return (
        <div className="w-full h-screen overflow-hidden relative">
            <AuthProvider currentUser={user}>
                <Cart>
                    <GenderSwitch>
                        <Routes>
                            <Route path="/" element={<Home />} >
                                <Route index path="/home" element={<HomeScreen />} />
                                <Route path="/product/:id" element={<ProductPage />} />
                                <Route path="/shop/:category" element={<ProductCategoryPage />} />
                                <Route path="/cart" element={<CartPage />} />
                            </Route>

                            <Route path="/signin" element={
                                <RequireNoAuth>
                                    <Signin />
                                </RequireNoAuth>
                            } />

                            <Route path="/signup" element={
                                <RequireNoAuth>
                                    <Signup />
                                </RequireNoAuth>
                            } />
                            <Route path="/dashboard" element={
                                <RequireAuth>
                                    <Dashboard />
                                </RequireAuth>
                            } >
                                <Route path="main" element={<Main/>} />
                                <Route path="order" element={<p>Order</p>} />
                                <Route path="product" element={<Products />} />
                                <Route path="chats" element={<p>Message</p>} />
                            </Route>
                        </Routes>
                    </GenderSwitch>
                </Cart>
            </AuthProvider>
            <div className='md:hidden flex w-full h-screen justify-center position absolute z-40 top-0 bg-white items-center'>
                <span>only extra-large screen devices are currently supported</span>
                <span></span>
            </div>
        </div >
    );
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(App)

