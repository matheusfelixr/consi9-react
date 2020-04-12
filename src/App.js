import React from 'react';
import './App.css';
import './styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductCrud from './pages/product-crud/ProductCrud';

function App() {
  return (
    <div className="App">
      <ProductCrud></ProductCrud>
    </div>
  );
}

export default App;
