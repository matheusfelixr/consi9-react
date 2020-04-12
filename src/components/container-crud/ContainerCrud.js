import React, { Component } from 'react';
import Header from '../header/Header';
import './ContainerCrud.css';
import Button from 'react-bootstrap/Button';
import Table from '../table-crud/TableCrud';

export default class ContainerCrud extends Component {

  constructor(props){
    super(props);

    this.state={
        showSearch: false,
        showCreate : false,
        classContainerInfo: 'container-info-none',
        tableHeaders: props.tableHeaders
    }

}
create= () =>{
  return(
      <h2> Vou adicionar um componente novo</h2>
  );
}

search= () =>{
  return(
      <h1> Vou pesquisar um componente novo</h1>
  );
}

  render() { 
    const {showCreate, showSearch} = this.state;
    return (
            <div className="container-crud">
              <Header/>
                <div className="container-body">
                  <div className="container-title">
                    <h1>Cadastro de Produto </h1>
                  </div> 
                  <div className={this.state.classContainerInfo}>
                    <div className="container-info-menu ">
                      <Button variant="success" size="lg" className="button-add" onClick={ () => this.setState({showCreate : true, showSearch : false, classContainerInfo: 'container-info'})}> Adicionar</Button>
                      <Button size="lg" className="button-search" onClick={ () => this.setState({showCreate : false, showSearch : true, classContainerInfo: 'container-info'})}> Pesquisar</Button>
                    </div>
                    
                    {showCreate && this.create()}
                    {showSearch &&  <Table header = {this.state.tableHeaders} />}
                  </div>
              </div>
            </div>
            );
  }
}
