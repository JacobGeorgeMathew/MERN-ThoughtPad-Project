import React from 'react';
import { Route, Routes } from 'react-router';
import { UserProvider } from './Context/UserContext';
import StartingPage from './pages/StartingPage';
import SignUpPage from './pages/SignUpPage';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';
import CreatePage from './pages/CreatePage';
import NoteDetailPage from './pages/NoteDetailPage';

const App = () => {
  return (
    <UserProvider>
      <div className="relative h-full w-full">
        <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_60%,#00FF9D40_100%)]" />
        <Routes>
          <Route path='/' element={<StartingPage />}/>
          <Route path='/home' element={<HomePage />}/>
          <Route path='/signup' element={<SignUpPage />}/>
          <Route path='/signin' element={<SignIn />}/>
          <Route path='/create' element={<CreatePage />}/>
          <Route path='/note/:id' element={<NoteDetailPage />}/>
        </Routes>
      </div>
    </UserProvider>
  )
}

export default App