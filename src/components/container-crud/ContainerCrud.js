import React, { Component } from 'react';
import Header from '../header/Header';
import './ContainerCrud.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import api from '../../services/Api';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';

export default class ContainerCrud extends Component {

  constructor(props){
    super(props);

    this.state={
        showSearch: false,
        showCreate : false,
        classContainerInfo: 'container-info-none',
        tableHeaders: props.tableHeaders,

        responseProduct: [],


        domain : {  
          id:"",
          description:"",
          barCode:"",
          costValue:"",
          saleValue: "",
          registrationDate: "",
          updateDate: "",
          cancellation: "",
          cancellationDate: ""
      },
    }

}

// intens da tabela
table= () =>{
  return(
    <Table striped bordered hover size="sm">
    <thead>
        <tr>
          <th>Codigo</th>
          <th>Codigo de barras</th>
          <th>Descrição</th>
          <th>Valor de custo</th>
          <th>Valor de venda</th>
          <th>Data de cadastro</th>
          <th>Data de cancelamento</th>
          <th>Data de Update</th>
          <th>#</th>
        </tr>
    </thead>
    <tbody>
    { this.state.responseProduct.map(e=>{
                        return  <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.barCode} </td>
                                <td>{e.description} </td>
                                <td>R${e.costValue}</td>
                                <td>R$ {e.saleValue}</td>
                                <td>{e.registrationDate} </td>
                                <td>{e.cancellationDate} </td>
                                <td>{e.updateDate} </td>
                                <td>
                                <Button variant="warning" onClick={()=>this.update(e)}> Editar</Button>
                                {!e.cancellation&&<Button variant="danger" type="button" onClick={()=>this.cancellation(e)}>Cancelar</Button> }
                                </td>
                            </tr>
                        })
                        }
    </tbody>
    </Table>
  );
}

findAllProduct = async () =>{
  try {
      const response = await api.get(`/product/list-all`);
      this.setState({showCreate : false, showSearch : true, classContainerInfo: 'container-info', responseProduct: response.data })
      console.log(this.state.responseProduct)
    } catch (error) {
      console.error(error);
    }
    
}





//inserir usuario
createProduct = () =>{
  api.post('/product/new', {  
    id:null,
    barCode:this.state.domain.barCode,
    description:this.state.domain.description,
    costValue:this.state.domain.costValue,
    saleValue:this.state.domain.saleValue,
    registrationDate:null,
    updateDate:null,
    cancellation:false,
    cancellationDate:null 
})
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  this.setState({showSearch : true, showCreate : false,  domain: {id:"",description:"",costValue:"",saleValue: "",registrationDate: "",updateDate: "",cancellation: "",cancellationDate: "" }});
  this.findAllProduct();

}

onChangeHandler = (e) =>{
  e.preventDefault();
  e.persist()
  this.setState((prevState) => ({
      domain: {
          ...prevState.domain,
          [e.target.name] : e.target.value
      }
  }))
}


create= () =>{
  return(
    <div className="container-form">
      <Form>
        <Form.Row>
          <Form.Group as={Col} md="3" controlId="barCode">
              <Form.Label>Código de barras</Form.Label>
              <Form.Control  type="number" name="barCode" value={this.state.domain.barCode} onChange={this.onChangeHandler} placeholder="Código de barras" />
          </Form.Group>
          <Form.Group as={Col} md="9" controlId="description">
              <Form.Label>Descrição<span className="required">*</span></Form.Label>
              <Form.Control required type="text" name="description" value={this.state.domain.description} onChange={this.onChangeHandler} placeholder="Descrição" />
          </Form.Group>
        </Form.Row>

        <Form.Row>
          <Form.Group as={Col} md="2" controlId="costValue">
              <Form.Label>Valor de custo<span className="required">*</span> </Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="saleValue">R$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control  type="text" name="costValue" value={this.state.domain.costValue} onChange={this.onChangeHandler} placeholder="Valor de custo" />
              </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="2" controlId="saleValue">
              <Form.Label>Valor de venda <span className="required">*</span> </Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="saleValue">R$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control  type="text" name="saleValue" value={this.state.domain.saleValue} onChange={this.onChangeHandler} placeholder="Valor de venda" />
              </InputGroup>
          </Form.Group>

        </Form.Row>
      </Form>
      <div className="container-button-save">
          {this.state.showCreate && <Button size="lg" variant="success" type = "submit"  onClick={this.createProduct}>Salvar</Button>}
          {this.state.showUpdate && <Button size="lg" variant="success"   onClick={this.updateApi}>Salvar update</Button>}
          {this.state.showSearch && <Button size="lg" variant="secondary" onClick={this.findProduct}>Buscar</Button>}
      </div>
    </div>
  );
}


  render() { 
    const {showCreate, showSearch} = this.state;
    return (
            <div className="container-crud">
              <Header/>
              <div className="container-body-center">
                <div className="container-body">
                  <div className="container-title">
                    <h1>Cadastro de Produto </h1>
                  </div> 
                  <div className={this.state.classContainerInfo}>
                    <div className="container-info-menu ">
                      <Button variant="info" size="lg" className="button-add" onClick={ () => this.setState({showCreate : true, showSearch : false, classContainerInfo: 'container-info'})}> Adicionar</Button>
                      <Button size="lg" className="button-search" onClick={ () => this.findAllProduct() }> Pesquisar</Button>
                    </div>
                    
                    {showCreate && this.create()}
                    {showSearch && this.table( )}
                  </div>
              </div>
              </div>
            </div>
            );
  }
}
