import { Link, Outlet } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MainLayout() {
    return (
        <div className='flex flex-col min-h-screen '>
            {/* <nav className='w-full bg-slate-300 p-2'>
                <ul className='flex flex-row w-full  items-center justify-center  max-w-5xl mx-auto'>
                    <li >
                        <Link className='p-1 text-lg font-semibold  text-white' to="/">
                            Character Creator
                        </Link>
                    </li>
                    <li>
                        <Link className='p-1 text-lg font-semibold text-white' to="/midi">
                            MIDI to PBP
                        </Link>
                    </li>
                </ul>
            </nav> */}
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