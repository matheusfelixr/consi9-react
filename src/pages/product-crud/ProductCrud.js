import React, { Component } from 'react';
import ContainerCrud from '../../components/container-crud/ContainerCrud';
import api from '../../services/Api';
import Button from 'react-bootstrap/Button';

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

    findAllProduct = async () =>{
        try {
            const response = await api.get(`/product/list-all`);
            console.log(response);
          } catch (error) {
            console.error(error);
          }
    }
  
    render() {
    return (
            <div className="product">
                <ContainerCrud tableHeaders = {this.state.tableHeaders}/>
                <Button variant="success" onClick={this.findAllProduct}>Salvar</Button>
            </div>
        )
  }
}
