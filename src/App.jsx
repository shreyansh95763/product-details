import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import ProductDetails from './pages/ProductDetails'; // Import your ProductDetails component
import Home from './pages/Home';

const App = () => {
  return (
    <>    
    <BrowserRouter>
      <Routes>
        {/* Route for displaying product details */}
        <Route path='/' element={<Home/>}/>
        <Route path="/product" element={<ProductDetails/>} />
      </Routes>
    </BrowserRouter>

    </>
  );
};

export default App;
