import React, { Component } from 'react';
import Header from '../header/Header';
import './ContainerCrud.css';
import Button from 'react-bootstrap/Button';


export default class ContainerCrud extends Component {

  render() {
    let className = 'container-info';
    return (
      
            <div className="container-crud">
              <Header/>
              <div className="container-title">
                <h1>Cadastro de Produto </h1>
              </div>
              <div className={className}>
                <div className="container-info-menu ">
                  <Button variant="success" size="lg" className="button-add"> Adicionar</Button>
                  <Button size="lg" className="button-search"> Pesquisar</Button>
                </div>
              </div>
            </div>
            );
  }
}
