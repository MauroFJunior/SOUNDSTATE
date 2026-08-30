import Index from './pages/index/Index.jsx';
import Browse from './pages/Browse/Browse.jsx';
import Organize from './pages/Organize/Organize.jsx';
import Register from './pages/register/Register.jsx';
import { useState } from 'react';

function App() {

  const [isRegisterModalOpen, setRegisterModalState] = useState(false);

  function handleRegisterModal() {
    setRegisterModalState(!isRegisterModalOpen);
  }

  return (
    <>
      {isRegisterModalOpen && <Register closeRegisterModal={handleRegisterModal} />}
      <Index openRegisterModal={handleRegisterModal} />
    </>
  )
}

export default App
