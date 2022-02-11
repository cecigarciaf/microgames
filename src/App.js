import React, {Component} from "react"
import Sidebar from "./components/Sidebar"
import NavbarTop from "./components/Navbar"

import './App.css';
import Container from 'react-bootstrap/Container';

class App extends Component {
  render() {
    return(
      
    <Container fluid>
      <div class="row">
      <NavbarTop />
      </div>
      
      <div className = "row" >    
        <Sidebar/>
     </div>
    </Container>
    )
  }
}

export default App; 