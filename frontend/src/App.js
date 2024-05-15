import Chart from 'react-apexcharts';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ChartModel from './Components/ChartModel';
import ChartModelExample from './Components/ChartModelExample';
import GraphListPage from './Components/GraphListPage';
import Authentication from './Components/Authentication';
import Register from './Components/Register';
import Login from './Components/Login';
import GraphFillForm from './Components/GraphFillForm';
import './App.css';
import Navbar from './Components/Navbar';

function App() {
  let isAuth = null
  if(localStorage.getItem('token')){
    console.log(localStorage.getItem('token'));
    isAuth = 'token';
  }
  return (
    <BrowserRouter>
        <Routes>
          {/* <Navbar/> */}
        <Route path='/navbar' element={<Navbar />} /> {/* Allow access to register page without authentication */}
        <Route path='/graph-list-page' element={<GraphListPage />} /> {/* Allow access to register page without authentication */}
        <Route path='/login' element={<Login />} /> {/* Allow access to register page without authentication */}
        <Route path='add-graph' element={<GraphFillForm />} /> {/* Allow access to register page without authentication */}
        <Route path='showGraph' element={<ChartModel />} /> {/* Allow access to register page without authentication */}
        {/* <Route path='showGraph' element={<ChartModel />} /> Allow access to register page without authentication */}
          <Route path='/' element={!isAuth  ? <Navigate to={'login'} /> : <GraphListPage />} >
        </Route>
    </Routes  >
  </BrowserRouter>
  );
}

export default App;
