import Register from './pages/register/Register.jsx';
import { useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createAppRouter } from './routes.jsx';

function App() {

  const [isRegisterModalOpen, setRegisterModalState] = useState(false);

  function handleRegisterModal() {
    setRegisterModalState(!isRegisterModalOpen);
  }

  const [router] = useState(() => createAppRouter(handleRegisterModal));

  return (
    <>
      {isRegisterModalOpen && <Register closeRegisterModal={handleRegisterModal} />}
      <RouterProvider router={router} />
    </>
  )
}

export default App