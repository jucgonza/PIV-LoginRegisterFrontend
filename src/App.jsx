import { useState } from 'react';

import Login from './components/Login';
import Register from './components/Register';

function App() {

  const [page, setPage] = useState("login"); // login, register

  return (
    <>
      {page === 'login' && <Login setRegister={() => setPage('register')} />}
      {page === 'register' && <Register setLogin={() => setPage('login')} />}
    </>
  )
}

export default App
