import React from 'react';

import { Routes, Route } from 'react-router-dom';
import NewProduc from './pages/Newproduc';
import Produc from './pages/produc';
import Pedidos from './pages/Pedidos';
import NewPedido from './pages/NewPedido';

function App() {
  
  return (
   
      <div>
     
        <Routes>
          <Route path="newproduc" element={<NewProduc/>}></Route>
          <Route path="pedidos" element={<Pedidos/>}></Route>
          <Route path="newPedido" element={<NewPedido/>}></Route>
          <Route path="/" element={<Produc/>}></Route>
        </Routes>
      </div>
      
  );
}

export default App;