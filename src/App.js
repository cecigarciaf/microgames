import React, {Component} from "react"
import Sidebar from "./components/Sidebar"
import NavbarTop from "./components/Navbar"
import Container from 'react-bootstrap/Container';
import Footer from "./components/footer"

class App extends Component {
  render() {
    return(
      
    <div className = "page-container">
      <div className= "content-wrap" >
          <div class="row">
          <NavbarTop />
          </div>
          
          <div className = "row" style={{minHeight: "80vh"}}>    
            <Sidebar/>
          </div>

        
            <Footer/>
     
     </div>
    </div>
    )
  }
}

export default App 