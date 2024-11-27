import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useNavigate } from 'react-router-dom'

function NavBar() {
  let navigate = useNavigate()

  return <div className='nav-wrapper'>

    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand style={{ cursor: "pointer" }} onClick={() => navigate('/')}>Home</Navbar.Brand>
        <Nav className="me-auto">
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav style={{ marginLeft: '800px' }}>
              <Nav.Link onClick={() => navigate('/create')} >New</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Nav>
      </Container>
    </Navbar>
  </div>
}

export default NavBar