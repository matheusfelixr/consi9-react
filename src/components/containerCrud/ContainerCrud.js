import React, { Component } from 'react';
import Header from '../header/Header';
import './ContainerCrud.css';
import Button from 'react-bootstrap/Button';


export default class ContainerCrud extends Component {

  constructor(props){
    super(props);

    this.state={
        showSearch: false,
        showCreate : false,
        classContainerInfo: 'container-info'
    }

}

  render() {
    
    return (
      
            <div className="container-crud">
              <Header/>
              <div className="container-title">
                <h1>Cadastro de Produto </h1>
              </div>
              <div className={this.state.classContainerInfo}>
                <div className="container-info-menu ">
                  <Button variant="success" size="lg" className="button-add"> Adicionar</Button>
                  <Button size="lg" className="button-search"> Pesquisar</Button>
                </div>
              </div>
            </div>
            );
  }
}
