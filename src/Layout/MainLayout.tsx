import { Outlet } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MainLayout() {
    return (
        <div className='flex flex-col min-h-screen max-w-7xl mx-auto'>
            <Outlet />
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />


        </div>
    )
}

export default MainLayout