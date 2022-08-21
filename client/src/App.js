import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Product from './Pages/Product';
import NavigationBar from './components/NavigationBar';
function App() {
  return (
    <div>
      <NavigationBar/>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Product" element={<Product />} />
      </Routes>
    </div>
  );
}

export default App;
