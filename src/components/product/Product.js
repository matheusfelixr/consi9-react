import React, { Component } from 'react';
import './Product.css';
import Button from 'react-bootstrap/Button';

export default class Product extends Component {
    
constructor(props){
    super(props);

    this.state={
        name:"",
        costValue:"",
        saleValue: "",
        showSearch: false,
        showCreate : false,
        showUpdate : false,
        productRet:[],
    }

}
createProduct = () =>{
    let url = `http://localhost:8080/api/product/new?name=${this.state.name}&costValue=${this.state.costValue}&saleValue=${this.state.saleValue}`
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        
    };
    fetch(url, requestOptions)
        .then(response => response.json());
}

findProduct = () => {
    let url  = `http://localhost:8080/api/product/list`;
    fetch(url).then(res=>{
        return res.json()
    }).then(response=>{
            this.setState({productRet : response.map((product)=> product)})
            this.setState({showSearch : true})
            console.log( this.state);
    })   
}

cancellation = () =>{
    let url  = `http://localhost:8080/api/product/cancel?idProduct=1`;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        
    };
    fetch(url, requestOptions)
        .then(response => response.json());
}

update = (selected) =>{
    this.setState({showUpdate : true});
    let product ={ 
        id:selected.id,
        name:selected.name,
        costValue:selected.costValue,
        saleValue:selected.saleValue,
        registrationDate:selected.registrationDate,
        updateDate:null,
        cancellation:selected.cancellation,
        cancellationDate:selected.cancellationDate,
    }
    console.log(product);
    this.updateApi(product);
}

updateApi = (product) =>{
    let url  = `http://localhost:8080/api/product/update`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
        }).then((response) => {
            return response;
     });
}

formInput = () =>{
   return <div>
   <div>
       <h4>Nome</h4>
       <input type="text" onChange={(event)=>{this.setState({name:event.target.value })}}></input> 
   </div>
   <div>
       <h4>Valor Custo</h4>
       <input type="text" onChange={(event)=>{this.setState({costValue:event.target.value })}}></input> 
   </div>
   <div>
       <h4>Valor Venda</h4>
       <input type="text" onChange={(event)=>{this.setState({saleValue:event.target.value })}}></input> 
   </div>
   <div>
   <Button variant="success" style={!this.state.showUpdate ? {} : { display: 'none' }} onClick={this.createProduct}>Salvar</Button>
   <Button variant="success" style={this.state.showUpdate ? {} : { display: 'none' }} onClick={this.updateApi}>Salvar</Button>
   </div>
</div>
}
formInput = () =>{
    return<div>
            <div>
                <h4>Nome</h4>
                <input type="text" onChange={(event)=>{this.setState({name:event.target.value })}}></input> 
            </div>
            <div>
                <h4>Valor Custo</h4>
                <input type="text" onChange={(event)=>{this.setState({costValue:event.target.value })}}></input> 
            </div>
            <div>
                <h4>Valor Venda</h4>
                <input type="text" onChange={(event)=>{this.setState({saleValue:event.target.value })}}></input> 
            </div>
            <div>
            <Button variant="success" style={!this.state.showUpdate ? {} : { display: 'none' }} onClick={this.createProduct}>Salvar</Button>
            <Button variant="success" style={this.state.showUpdate ? {} : { display: 'none' }} onClick={this.updateApi}>Salvar</Button>
            </div>
        </div>
}
    render() {
        return (
            <div className="product">
                <h1>Cadastro de produto</h1>
                <Button onClick={this.showSearch = true} >Buscar</Button>
                <Button onClick={this.showCreate = true} >Adicionar Novo</Button>
                {this.showCreate ? this.formInput():""}
                <div>
                 <Button variant="secondary" onClick={this.findProduct}>Buscar</Button>
                </div>

                <div>
                    <table  className="table-container" style={this.state.showSearch ? {} : { display: 'none' }}>
                            <tr>
                                <th>ID</th>
                                <th>nome</th>
                                <th>Valor de custo</th>
                                <th>Valor de venda</th>
                                <th>Data de cadastro</th>
                                <th>Data de cancelamento</th>
                                <th>Data de Update</th>
                                <th>#</th>
                            </tr>
                        { this.state.productRet.map(e=>{
                        return  <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.name} </td>
                                <td>{e.registrationDate} </td>
                                <td>R${e.costValue}</td>
                                <td>R$ {e.saleValue}</td>
                                <td>{e.cancellationDate} </td>
                                <td>{e.updateDate} </td>
                                <td>
                                <Button variant="primary" onClick={()=>this.update(e)}> Editar</Button>{' '}
                                {!e.cancellation&&<Button variant="warning" type="button" onClick={this.cancellation}>Cancelar</Button> }
                                </td>
                            </tr>
                        })
                        }
                    </table>
                </div>
            </div>
        )
    }
}
