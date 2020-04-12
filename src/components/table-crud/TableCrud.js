import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';

export default class TableCrud extends Component {

  constructor(props ){
    super(props)
    this.state = {
        header : this.props.header
    }
  }

  render() {
    return  <div className="table">
                <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                      {this.state.header}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                    <tr>
                    <td>3</td>
                    <td colSpan="2">Larry the Bird</td>
                    <td>@twitter</td>
                    </tr>
                </tbody>
                </Table>
    </div>
  }
}
