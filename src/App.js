import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import Home from './components/Home';
import ViewProduct from './components/ViewProduct';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/products'>
          <Route index element={<Products />} />
          <Route path='view/:productID' element={<ViewProduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
