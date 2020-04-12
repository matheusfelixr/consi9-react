import React, { Component } from 'react';
import ContainerCrud from '../../components/container-crud/ContainerCrud';

export default class ProductCrud extends Component {
    constructor(props){
        super(props);
    
        this.state={
            tableHeaders: (
              <>
                  <th>Codigo</th>
                  <th>Nome</th>
                  <th>Valor de custo</th>
                  <th>Valor de venda</th>
                  <th>Data de cadastro</th>
                  <th>Data de cancelamento</th>
                  <th>Data de Update</th>
                  <th>#</th>
        
              </>
          )
        }  
    }
  
    render() {
    return (
            <div className="product">
                <ContainerCrud tableHeaders = {this.state.tableHeaders}/>

            </div>
        )
  }
}
