import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route } from "react-router-dom"
import Auth from './components/auth';
import Dashboard from './components/dashboard/index';
import PrivateRoute from './components/state/privateRouter';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route exact path='/dashboard' element={<PrivateRoute/>}>
            <Route exact path='/dashboard' element={<Dashboard/>}/>
          </Route>
          <Route path="/" element={<Auth />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
