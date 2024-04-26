import logo from './logo.svg';
import { BrowserRouter,Routes, Route} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/routes/About';
import Products from './pages/routes/Products';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
        <BrowserRouter>
          <ToastContainer position="bottom-center" autoClose="3000" closeOnClick="true"/>
          <Routes>
              <Route path="/" element={<About />} />
              <Route path="login" element={<Login />}></Route>
              <Route path="signup" element={<Signup />}></Route>
              <Route path="home" element={<About />}>
                <Route path="products" element={<Products />}></Route>
              </Route>
          </Routes>
        </BrowserRouter>
    </div>
  );
}
export default App;