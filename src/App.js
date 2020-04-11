import React from 'react';
import './App.css';
import './styles.css';
import Product from './components/product/Product';
import 'bootstrap/dist/css/bootstrap.min.css';
import ContainerCrud from './components/containerCrud/ContainerCrud';

function App() {
  return (
    <div className="App">
      {/* <Product></Product> */}
      <ContainerCrud></ContainerCrud>
    </div>
  );
}

export default App;
