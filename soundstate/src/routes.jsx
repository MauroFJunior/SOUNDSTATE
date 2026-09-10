import { createBrowserRouter } from 'react-router-dom';
import Index from './pages/index/Index.jsx';
import Browse from './pages/Browse/Browse.jsx';

export function createAppRouter(openRegisterModal) {
    return createBrowserRouter([
        {
            path: '/',
            element: <Index openRegisterModal={openRegisterModal} />,
            errorElement: <div>Something went wrong.</div>,
        },
        {
            path: '/browse',
            element: <Browse />,
            errorElement: <div>Something went wrong.</div>,
        }
    ]);
}
