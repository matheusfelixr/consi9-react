import React from 'react';
import'./Header.css';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown'

const Header = () => {
    const handleSelect = (eventKey) => alert(`selected ${eventKey}`);
    return(
            <header id="main-header">
              <span className="logo">Cons i9</span>

              <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
                <NavDropdown className="itens" title="Cadastro" id="nav-dropdown">
                  <NavDropdown.Item eventKey="4.1">Cadastro de Pessoas</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2">Cadastro de Produtos</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
                <NavDropdown className="itens" title="Relatório" id="nav-dropdown">
                  <NavDropdown.Item eventKey="4.1">Relatório de Pessoas</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2">Relatório de Produtos</NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </header>
    )
}

export default Header ;