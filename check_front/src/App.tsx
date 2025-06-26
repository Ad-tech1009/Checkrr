import { Route, Routes } from 'react-router';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import Signup from './pages/Signup.tsx';
import Cfood from './pages/Cfood.tsx';
import Cride from './pages/Cride.tsx';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path='/'>
          <Route index element={<Home />} />
          <Route path='compare-rides' element={<Cride/>} />
          <Route path='compare-food' element={<Cfood/>} />
          <Route path='login' element={<Login/>} />
          <Route path='signup' element={<Signup/>} />
          <Route path='*' element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </div>
  );
}