import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';

const App = () => {
  const [authUser, setAuthUser] = useState(null); 
  return (
    <div className='flex flex-col items-center justify-start'>
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to='/login' />} />
        <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to='/' />} />
        <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to='/' />} />
      </Routes>
    </div>
  );
};

export default App;
