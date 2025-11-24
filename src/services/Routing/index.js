import React, { useContext, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { ProfileContext } from '../../Components/CustomComponent/ContextProviders/ProfileContext'
import LandingPage from '../../Components/SidebarPages/LandingPage'
import Staking from '../../Components/SidebarPages/Staking'





const Routing = () => {
    // const token = sessionStorage.getItem('token');
    // const [,] = useContext(ProfileContext);
    // const location = useLocation();

    // useEffect(() => {
    //     if (!token && (location.pathname === '/home' || location.pathname === '/')) {
    //         document.body.classList.add('main_wrapper');
    //     } else {
    //         document.body.classList.remove('main_wrapper');
    //     }
    // }, [token, location.pathname]);


    return (

        <>
            {/* {token ? ( */}
            <>

                {/* <Header /> */}
                <Routes>
                    <Route exact path="/" element={<LandingPage />} />
                    <Route exact path="/home" element={<LandingPage />} />
                    <Route exact path="/staking" element={<Staking />} />
                    <Route path="*" element={<LandingPage />} />
                </Routes>



            </>
            {/* ) : (
                <>
                    <Routes>
                        <Route exact path="/home" element={<LandingPage />} />
                        <Route exact path="/" element={<LandingPage />} />
                        <Route exact path="/login" element={<Login />} />
                        <Route exact path="/register" element={<Register />} />
                        <Route exact path="/forget-password" element={<ForgetPassword />} />
                        <Route path="*" element={<LandingPage />} />
                    </Routes>

                </>

            )} */}

        </>
    )
}

export default Routing