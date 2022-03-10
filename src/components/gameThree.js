import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav  from 'react-bootstrap/Nav';
import NavDropdown  from 'react-bootstrap/NavDropdown';
import PICS from "./pics/index.js";
import './gameThree.css';
import PlayStopButton from './playButton'
import Button from 'react-bootstrap/Button';
import Instructions from './Instructions'
import InstructionsButton from './InstructionsButton';

class GameThree extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlay = this.handlePlay.bind(this)
    this.dropEvent = this.dropEvent.bind(this)
    this.allowDrop = this.allowDrop.bind(this)
    this.onDrag = this.onDrag.bind(this)
    this.handleDropBack = this.handleDropBack.bind(this)
    this.handlePicChange = this.handlePicChange.bind(this)
    this.handleSubject = this.handleSubject.bind(this)
    this.instructions = this.instructions.bind(this)


      var cells2 = []
      for(let i = 0; i < 20; i++ ){
      cells2.push("empty")
      } 
    
    this.state = {show:false, subject: "", picSelected: "", leftCellsState: cells2, result: "", currentResult:["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"], playingState: "false", selectedCell: "no", assignedId: [0, 1, 2, 3, 4, 5,6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]}
  }

  correctOrder = ["col1 row1", "col2 row1", "col3 row1", "col4 row1", "col5 row1", "col1 row2", "col2 row2", "col3 row2", "col4 row2", "col5 row2", "col1 row3", "col2 row3", "col3 row3", "col4 row3", "col5 row3", "col1 row4", "col2 row4", "col3 row4", "col4 row4", "col5 row4"]
 


  handleSubject(event) {
    var subject = event.target.id
    console.log("subject" + subject)
    this.setState({subject: subject})
  }


  //cuenta cuántas imagenes hay en index js
  PicAmount(){
      let count = 0;
    for (var key in PICS){
    if (PICS.hasOwnProperty(key)) {
        count++;
    }
    }
  return count;
  }

  // elige random numero entre cantidad de fotos en index js:
  handlePicChange() {
    if (this.state.playingState === "false") {
    var picsArray = []
    var picSelectedCopy
    var random
    var randomSubject
    var picsArrayArgentina = []
    var picsArrayBirds = []
    random = Math.floor(Math.random() * ((this.PicAmount()) - 1)) + 0;
    // 4 es la cantidad de fotos de un subject:
    randomSubject = Math.floor(Math.random() * (4)) + 0;
    
    picsArray = (Object.values(PICS))

    //porque son 4 fotos por subject
    picsArrayArgentina = picsArray.slice(0, 4)
    picsArrayBirds = picsArray.slice(4, 8)

    if (this.state.subject === "birds") {
      picSelectedCopy = picsArrayBirds[randomSubject]
    } else if (this.state.subject === "argentina") {
      picSelectedCopy = picsArrayArgentina[randomSubject]
    } else {
      picSelectedCopy = picsArray[random]
    }
    this.setState({picSelected: picSelectedCopy})
 
    }
  }

  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  handlePlay() {
  console.log(this.state.leftCellsState)
  if (this.state.playingState === "false") {
    var assignedIdCopy = this.state.assignedId
    this.shuffleArray(assignedIdCopy)

    this.setState({assignedId: assignedIdCopy, playingState: "true", result: ""})
  } else if (this.state.playingState === "true") {
    assignedIdCopy = [0, 1, 2, 3, 4, 5,6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
    this.setState({assignedId: assignedIdCopy, playingState: "false", currentResult:["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a"], resultText: "", result: ""})
    window.location.reload();
    } 

  }

  assignClass(id){
      return this.correctOrder[id]   
  }

  dropEvent(event) {
    
    var leftCellsStateCopy = this.state.leftCellsState
    var resultCopy = this.state.result
    var leftCellsMovedPiece = leftCellsStateCopy.find(element => element === movedPiece)
    var assignedIdCopy = this.state.assignedId
    var data = event.dataTransfer.getData("text");
    var currentResultCopy = this.state.currentResult
    var movedPiece = assignedIdCopy[data]
    var leftCellsMovedPieceIndex = leftCellsStateCopy.indexOf(leftCellsMovedPiece)

    console.log(leftCellsStateCopy )
      if ((this.state.playingState === "true") & (leftCellsStateCopy[(event.target.id - 100)] === "empty")) {
      var leftCellsMovedPiece = leftCellsStateCopy.find(element => element === movedPiece)
      var leftCellsMovedPieceIndex = leftCellsStateCopy.indexOf(leftCellsMovedPiece)
      event.preventDefault();    
      event.target.appendChild(document.getElementById(data));
      
      if (leftCellsStateCopy[leftCellsMovedPieceIndex] === movedPiece) {
      leftCellsStateCopy[leftCellsMovedPieceIndex] = "empty"
      }
      leftCellsStateCopy[(event.target.id - 100)] = movedPiece 
      


    }
          //ver si esta todo OK
          var ok = 0
          for (var i=0; i< 20; i++) {
            
            if (leftCellsStateCopy[i] == i) {
              ok++
              
            }

          }
          
          if (ok == 20){
            console.log("You won")
            resultCopy = "Completed"
        } 
    this.setState({result: resultCopy, currentResult: currentResultCopy, leftCellsState: leftCellsStateCopy})
    
  }

  onDrag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

  allowDrop(event) {
    var leftCellsStateCopy = this.state.leftCellsState
    var data = event.dataTransfer.getData("text");
    var assignedIdCopy = this.state.assignedId
    var movedPiece = assignedIdCopy[data]

    if ((leftCellsStateCopy[(event.target.id - 100)] === "empty") || (leftCellsStateCopy[(event.target.id - 100)] === movedPiece)){
      event.preventDefault();
    
  }}
  
  instructions(){
    var showTemp = this.state.show
    if(showTemp === false){
        showTemp = true
    } else if (showTemp === true){
        showTemp = false
    }
    this.setState({show: showTemp})
}   

  handleDropBack(event) { 

    var assignedIdCopy = this.state.assignedId
    var data = event.dataTransfer.getData("text");
    var leftCellsStateCopy = this.state.leftCellsState
   
    var movedPiece = assignedIdCopy[data]
   
    var leftCellsMovedPiece = leftCellsStateCopy.find(element => element === movedPiece)
    var leftCellsMovedPieceIndex = leftCellsStateCopy.indexOf(leftCellsMovedPiece)

    if (!((parseInt(event.target.id)) >= 0 ) & ((leftCellsStateCopy[(event.target.id - 100)] === "empty") || (leftCellsStateCopy[leftCellsMovedPieceIndex] == movedPiece))){
      event.preventDefault();      
      event.target.appendChild(document.getElementById(data));

    if (leftCellsMovedPiece !== "empty") {

      leftCellsStateCopy[leftCellsMovedPieceIndex] = "empty"
    }
    this.setState({leftCellsState: leftCellsStateCopy})
  }
}
  render() {
    var color = "white"
    var border = "0.5px solid grey"
    if (this.state.result === "Completed") {
      border = "1px solid white"
    }

    var style = {
        height:80,
        width:80,
        border: border,
        backgroundColor: color

    }
    var howtoplay =    
   
    <ol className= "font-face-zkgam">   
    <li>Buscar una foto aleatoria con el botón "Select a pic"</li>     
    <li>O elegir primero un tema en el menu "Themes"</li>
    <li>Al hacer click en "PLAY" se mezcla el rompecabezas </li>
    <li>Arrastrar las piezas con el mouse para re-armar la foto</li>
    </ol>

    return (
      <div className ="col-9">
        <div className = "row" > 
          <Navbar bg="white" variant="light">
            <Container >
              <Nav className="me-auto mx-auto">
              
              <NavDropdown   title="Themes" id="basic-nav-dropdown">
                <NavDropdown.Item className = "select font-face-zkgam " onClick={this.handleSubject} id="argentina">Argentina</NavDropdown.Item>
                <NavDropdown.Item className = "select font-face-zkgam " onClick={this.handleSubject} id="birds" >Birds</NavDropdown.Item>
                 
              </NavDropdown>
              </Nav>
            </Container>
          </Navbar>
        </div>
        
        <div className = "align-items-center  row" > 
          <div className ="col-6">
          <Board dropHandle= {this.dropEvent} style = {style} allowDrop2 = {this.allowDrop} handleClick = {this.handleClick}/>
          </div>
          
        <div className ="col-6">
          <div className = "row picRow borderBox justify-content-center"> 

            <div className = "row mt-2 picRow "> 
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="0" classNameImg={this.assignClass(this.state.assignedId[0])}/></div></div>
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="1" classNameImg={this.assignClass(this.state.assignedId[1])}/></div></div>
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="2" classNameImg={this.assignClass(this.state.assignedId[2])}/></div></div>
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="3" classNameImg={this.assignClass(this.state.assignedId[3])}/></div></div>
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="4" classNameImg={this.assignClass(this.state.assignedId[4])}/></div></div>
            </div>

            <div className = "row mt-1 picRow"> 
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="5" classNameImg={this.assignClass(this.state.assignedId[5])}/></div></div>
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="6" classNameImg={this.assignClass(this.state.assignedId[6])}/></div></div>
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="7" classNameImg={this.assignClass(this.state.assignedId[7])}/></div></div>
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="8" classNameImg={this.assignClass(this.state.assignedId[8])}/></div></div>
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="9" classNameImg={this.assignClass(this.state.assignedId[9])}/></div></div>
            </div>

            <div className = "row mt-1 picRow"> 
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="10" classNameImg={this.assignClass(this.state.assignedId[10])}/></div></div>
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="11" classNameImg={this.assignClass(this.state.assignedId[11])}/></div></div>
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="12" classNameImg={this.assignClass(this.state.assignedId[12])}/></div></div>
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="13" classNameImg={this.assignClass(this.state.assignedId[13])}/></div></div>
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="14" classNameImg={this.assignClass(this.state.assignedId[14])}/></div></div>
            </div>

            <div className = "row mt-1 picRow"> 
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="15" classNameImg={this.assignClass(this.state.assignedId[15])}/></div></div>
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="16" classNameImg={this.assignClass(this.state.assignedId[16])}/></div></div>
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="17" classNameImg={this.assignClass(this.state.assignedId[17])}/></div></div>
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="18" classNameImg={this.assignClass(this.state.assignedId[18])}/></div></div>
              <div className= "col picCol d-flex justify-content-center"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} picSelected = {this.state.picSelected} id="19" classNameImg={this.assignClass(this.state.assignedId[19])}/></div></div>
            </div>
   
          </div>
         
        </div>

      </div>
      
      <div className = "row mt-4 align-items-center justify-content-center " >
          <div className = "col-sm-12 col-md-4 col-lg-2 col-xl-2 d-md-block text-center" >
            <Button  className = "font-face-zkga select" id="selectbutton" size="sm" variant="outline-dark"  onClick={this.handlePicChange}>Select a Pic</Button>
          </div>

          <div className = "col-sm-12 col-md-4 col-lg-2 col-xl-2 d-md-block text-center" > 
            <PlayStopButton   text = {this.state.playingState === "false"?  "PLAY" : "QUIT"}  onButtonClick= {this.handlePlay}/> 
          </div>

          <div className = "col-sm-12 col-md-4 col-lg-2 col-xl-2 d-md-block text-center" >
            <InstructionsButton instructions = {this.instructions}/>
            <Instructions instructions = {this.instructions} show= {this.state.show} instructDetails= {howtoplay} /> 
          </div>  
            
      </div>


      <div className = "row mt-4 align-items-center text-center" >
        <h1 className = "font-face-zkga" id = "result">{this.state.result}</h1> 
      </div>
    </div>
    )
  }
}




class ImagePiece extends React.Component {
    constructor(props) {
      super(props);
      this.drag = this.drag.bind(this)
    }

    drag(event) {
        this.props.handleDrag(event)
    }

    render () { 

        return (
        <div onDragStart={this.drag} draggable="true" id= {this.props.id}  className = "piece"  > <img draggable="false" id = {this.props.id} className = {this.props.classNameImg} alt=""  src= {this.props.picSelected}/> </div> 
        )
    }
}
    
class Cell extends React.Component {
    constructor(props) {
          super(props);
          this.handletheDrop = this.handletheDrop.bind(this)
          this.onDragOver2 = this.onDragOver2.bind(this)
          
        }

handletheDrop(event) {
    this.props.handleDrop(event)
}

onDragOver2(event){
 this.props.allowDrop4(event)
}

    render() {


        return (
            <div  id= {this.props.col + this.props.row} row= {this.props.row} col= {this.props.col} style = {this.props.style} onDragOver={this.onDragOver2} onDrop = {this.handletheDrop}>

            </div>
        )
    }
}

class Row extends React.Component {
    constructor(props) {
          super(props);
          this.drop = this.drop.bind(this)
          this.allowDrop3 = this.allowDrop3.bind(this)
          
        }

    allowDrop3(event){
        this.props.allowDrop2(event);
    }

    drop(event) {
        this.props.dropHandle(event, this.props.row, this.props.col);
    }


    render () { 
        var style = {
            display: "flex"}    
        var row = []
      
        
        for (var i=100; i<105; i++) {
            row.push(<Cell allowDrop4 = {this.allowDrop3} style = {this.props.style} handleDrop={this.drop} key = {i} row = {this.props.row} col = {i} />)
          }

        return (
            <div className = "justify-content-center" style = {style}>
            {row}
            </div>
        )
    }
}

class Board extends React.Component {
    constructor(props) {
          super(props);
          this.handleDrop = this.handleDrop.bind(this)
          this.allowDrop5 = this.allowDrop5.bind(this)
        }
handleDrop(event) {
    this.props.dropHandle(event);
}

allowDrop5(event) {
    this.props.allowDrop2(event);
}

    render () {
        var board = []
        for (var i=0; i<20; i = i + 5) {
            board.push(<Row  allowDrop2 = {this.allowDrop5}  style = {this.props.style} key = {i} row = {i}  dropHandle= {this.handleDrop}/>)
           
          }
        return (
            <div className = "row" > 
                {board}
            </div>
   
    )
}
}



  

export default GameThree;