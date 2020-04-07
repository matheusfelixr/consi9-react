import React, { Component } from 'react';
import './Product.css';
import Button from 'react-bootstrap/Button';

export default class Product extends Component {
    
constructor(props){
    super(props);

    this.state={
        domain : {  
                    id:"",
                    name:"",
                    costValue:"",
                    saleValue: "",
                    registrationDate: "",
                    updateDate: "",
                    cancellation: "",
                    cancellationDate: ""
                },
        
        showSearch: false,
        showCreate : false,
        showUpdate : false,
        productRet:[],
    }

}
createProduct = () =>{
    let url = `http://localhost:8080/api/product/new`
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  
                                id:null,
                                name:this.state.domain.name,
                                costValue:this.state.domain.costValue,
                                saleValue:this.state.domain.saleValue,
                                registrationDate:null,
                                updateDate:null,
                                cancellation:false,
                                cancellationDate:null 
                            })
        
    };
    fetch(url, requestOptions)
        .then(response => response.json(), this.findProduct ,
        this.setState({showSearch : true, showCreate : false, showUpdate : false, domain: {id:"",name:"",costValue:"",saleValue: "",registrationDate: "",updateDate: "",cancellation: "",cancellationDate: "" }}) );

        
}

findProduct = () => {
    let url  = `http://localhost:8080/api/product/list-all`;
    fetch(url).then(res=>{
        return res.json()
    }).then(response=>{
            this.setState({productRet : response.map((product)=> product)})
            this.setState({showSearch : true})
            console.log( this.state);
    })
 } 

cancellation = (selected)=>{
    let url  = `http://localhost:8080/api/product/cancel?idProduct=${selected.id}`;
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        
    };
    fetch(url, requestOptions)
        .then(response => response.json());

    this.findProduct();
}

update = (selected) =>{
    this.setState({domain: selected, showUpdate : true, showSearch : false})
}

updateApi = () =>{
    let url  = `http://localhost:8080/api/product/update`;
    fetch(url, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.domain)
        }).then((response) => {
            return response;
     });

     this.setState({ showUpdate : false, showSearch : true})
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

formInput = () =>{
    return(
            <div>
                <div>
                    <h4>Nome</h4>
                    <input type="text" name="name" value={this.state.domain.name} onChange={this.onChangeHandler}></input> 
                </div>
                <div>
                    <h4>Valor Custo</h4>
                    <input type="text" name="costValue" value={this.state.domain.costValue} onChange={this.onChangeHandler}></input> 
                </div>
                <div>
                    <h4>Valor Venda</h4>
                    <input type="text" name="saleValue" value={this.state.domain.saleValue} onChange={this.onChangeHandler}></input> 
                </div>
                <div>
                {this.state.showCreate && <Button variant="success" onClick={this.createProduct}>Salvar</Button>}
                {this.state.showUpdate && <Button  onClick={this.updateApi}>Salvar update</Button>}
                {this.state.showSearch && <Button variant="secondary" onClick={this.findProduct}>Buscar</Button>}
                </div>
            </div>
        )
}

table = () =>{
        return(
                <div>
                    <table  className="table-container">
                            <thead>
                            <tr>
                                <th>Codigo</th>
                                <th>nome</th>
                                <th>Valor de custo</th>
                                <th>Valor de venda</th>
                                <th>Data de cadastro</th>
                                <th>Data de cancelamento</th>
                                <th>Data de Update</th>
                                <th>#</th>
                                </tr>
                            </thead>
                            <tbody>    
                        { this.state.productRet.map(e=>{
                        return  <tr key={e.id}>
                                <td>{e.id}</td>
                                <td>{e.name} </td>
                                <td>R${e.costValue}</td>
                                <td>R$ {e.saleValue}</td>
                                <td>{e.registrationDate} </td>
                                <td>{e.cancellationDate} </td>
                                <td>{e.updateDate} </td>
                                <td>
                                <Button variant="primary" onClick={()=>this.update(e)}> Editar</Button>
                                {!e.cancellation&&<Button variant="warning" type="button" onClick={()=>this.cancellation(e)}>Cancelar</Button> }
                                </td>
                            </tr>
                        })
                        }
                        </tbody>
                    </table>
                </div>
        )
}

    render() {
        const {showCreate, showSearch} = this.state;

        return (
            <div className="product">
                <h1>Cadastro de produto</h1>
                {!showSearch && <Button variant="secondary" onClick={() =>  this.setState({showSearch : true, showCreate : false, showUpdate : false, domain: {id:"",name:"",costValue:"",saleValue: "",registrationDate: "",updateDate: "",cancellation: "",cancellationDate: "" }}) } >Pesquisar</Button>}
                {!showCreate && <Button variant="success" onClick={ () => this.setState({showCreate : true, showSearch : false})} >Adicionar Novo</Button>}
                
                {this.formInput()}
                
                {showSearch && this.table()}
            </div>
        )
    }

}
