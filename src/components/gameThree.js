import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav  from 'react-bootstrap/Nav';
import pic1 from "./pics/pic1.jpg";
import './gameThree.css';
import Button from 'react-bootstrap/Button';



class GameThree extends React.Component {
  constructor(props) {
    super(props);
    this.handlePlay = this.handlePlay.bind(this)
    this.dropEvent = this.dropEvent.bind(this)
    this.allowDrop = this.allowDrop.bind(this)
    this.onDrag = this.onDrag.bind(this)
    this.handleDropBack = this.handleDropBack.bind(this)
    this.state = {currentResult:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], playingState: "false", selectedCell: "no", assignedId: [0, 1, 2, 3, 4, 5,6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]}
  }

  correctOrder = ["col1 row1", "col2 row1", "col3 row1", "col4 row1", "col5 row1", "col1 row2", "col2 row2", "col3 row2", "col4 row2", "col5 row2", "col1 row3", "col2 row3", "col3 row3", "col4 row3", "col5 row3", "col1 row4", "col2 row4", "col3 row4", "col4 row4", "col5 row4"]
  
  
  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  handlePlay() {
  
  if (this.state.playingState === "false") {
    var assignedIdCopy = this.state.assignedId
    this.shuffleArray(assignedIdCopy)
   console.log("assignedIdCopy "+ assignedIdCopy)
    this.setState({assignedId: assignedIdCopy, playingState: "true"})
  }

  }

  assignClass(id){
      return this.correctOrder[id]   
  }

  dropEvent(event) {
    //if (this.state.playingState === "true") {
    
      event.preventDefault();
      var assignedIdCopy = this.state.assignedId
      var data = event.dataTransfer.getData("text");
      var currentResultCopy = this.state.currentResult
      const correctResult = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19]
      event.target.appendChild(document.getElementById(data));
      
      console.log("event target id" + event.target.id)
      console.log("assignedIdCopy[data]" + assignedIdCopy[data] )
      console.log("assignedIdCopy[data] type" + typeof(assignedIdCopy[data]) )
      console.log("data" + data)
      console.log("parseInt(event.target.id)- 100)" + (parseInt(event.target.id)- 100))
      console.log("parseInt(event.target.id)- 100 type)" + (typeof(parseInt(event.target.id)- 100)))
      console.log("result" + ((assignedIdCopy[data]) == (parseInt(event.target.id)- 100)))

      if ((assignedIdCopy[data]) == (parseInt(event.target.id)- 100)){
        
        console.log("correct!!!!")
        currentResultCopy[assignedIdCopy[data]] = assignedIdCopy[data]
        console.log(currentResultCopy)
        
        console.log("this.state.currentResult" + this.state.currentResult)
        console.log("correctResult" + correctResult)
        
        var ok = 0
        for (var i=0; i< correctResult.length; i++) {
          if (correctResult[i] == currentResultCopy[i]) {
            ok++
          }
        }
        
        if (ok == correctResult.length){
          console.log("You won")
      } 
        this.setState({currentResult: currentResultCopy})
      }
    //}
  }

  onDrag(event) {
  event.dataTransfer.setData("text", event.target.id);
  console.log("ondrag id" + event.target.id)
  console.log("assignedId" + this.state.assignedId)
  }

  allowDrop(event) {
      event.preventDefault();
  }

  handleDropBack(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
    console.log("data" + data)
 
    console.log("this.state.assignedID[data]" + this.state.assignedId[data])
    console.log("this.state.currentResult[this.state.assignedID[data]]" + this.state.currentResult[this.state.assignedId[data]])
  
    if(this.state.assignedId[data] === this.state.currentResult[this.state.assignedId[data]]){
      console.log("sacar correcto de current result")
    }
  }

  render() {
    
    
    return (
      <div className ="col-9">
        <div className = "row" > 
          <Navbar bg="white" variant="light">
            <Container >
              <Nav className="me-auto mx-auto">
                <Nav.Link href="#opcion 1">tbd</Nav.Link>
                <Nav.Link href="#opcion 2">tbd</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div>
        
        <div className = "row" > 
          <div className ="col-6">
          <Board dropHandle= {this.dropEvent} allowDrop2 = {this.allowDrop} handleClick = {this.handleClick}/>
          </div>
          
          <div className ="col-6">
            <div className = "row picRow"> 
              <div className = "row mt-2 picRow"> 
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="0" classNameImg={this.assignClass(this.state.assignedId[0])}/></div></div>
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="1" classNameImg={this.assignClass(this.state.assignedId[1])}/></div></div>
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="2" classNameImg={this.assignClass(this.state.assignedId[2])}/></div></div>
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="3" classNameImg={this.assignClass(this.state.assignedId[3])}/></div></div>
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="4" classNameImg={this.assignClass(this.state.assignedId[4])}/></div></div>
              </div>

              <div className = "row mt-1 picRow"> 
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="5" classNameImg={this.assignClass(this.state.assignedId[5])}/></div></div>
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="6" classNameImg={this.assignClass(this.state.assignedId[6])}/></div></div>
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="7" classNameImg={this.assignClass(this.state.assignedId[7])}/></div></div>
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="8" classNameImg={this.assignClass(this.state.assignedId[8])}/></div></div>
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="9" classNameImg={this.assignClass(this.state.assignedId[9])}/></div></div>
              </div>

              <div className = "row mt-1 picRow"> 
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="10" classNameImg={this.assignClass(this.state.assignedId[10])}/></div></div>
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="11" classNameImg={this.assignClass(this.state.assignedId[11])}/></div></div>
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="12" classNameImg={this.assignClass(this.state.assignedId[12])}/></div></div>
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="13" classNameImg={this.assignClass(this.state.assignedId[13])}/></div></div>
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="14" classNameImg={this.assignClass(this.state.assignedId[14])}/></div></div>
              </div>

              <div className = "row mt-1 picRow"> 
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="15" classNameImg={this.assignClass(this.state.assignedId[15])}/></div></div>
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="16" classNameImg={this.assignClass(this.state.assignedId[16])}/></div></div>
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="17" classNameImg={this.assignClass(this.state.assignedId[17])}/></div></div>
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="18" classNameImg={this.assignClass(this.state.assignedId[18])}/></div></div>
                <div className= "col picCol"> <div onDragOver={this.allowDrop} onDrop = {this.handleDropBack} className = "picCell"> <ImagePiece handleDrag={this.onDrag} id="19" classNameImg={this.assignClass(this.state.assignedId[19])}/></div></div>
              </div>
            </div>
          </div>

      </div>
      
      <div className = "row mt-4 align-items-center" >
            <div className = "col-1" > </div>
            <div className = "col-2 text-center" > <PlayStopButton  text = {this.state.playingState === "false"?  "PLAY" : "QUIT"}  onButtonClick= {this.handlePlay}/> </div>
            <div className = "col-1" > </div>
      </div>
    </div>
    )
  }
}


class PlayStopButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event){
    this.props.onButtonClick(event)
  }
  render () { 
  return (
    
     <Button  id="playbutton" size="lg" variant="outline-dark"  onClick={this.handleClick}>{this.props.text}</Button>
   
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
        <div onDragStart={this.drag} draggable="true" id= {this.props.id}  className = "piece"  > <img draggable="false" id = {this.props.id} className = {this.props.classNameImg} src= {pic1}/> </div> 
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
        var color = "white"


        var style = {
            height:80,
            width:80,
            border:"1px solid grey",
            backgroundColor: color

        }

        return (
            <div  id= {this.props.col + this.props.row} row= {this.props.row} col= {this.props.col} style = {style} onDragOver={this.onDragOver2} onDrop = {this.handletheDrop}>

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
            row.push(<Cell allowDrop4 = {this.allowDrop3} handleDrop={this.drop} key = {i} row = {this.props.row} col = {i} />)
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
            board.push(<Row  allowDrop2 = {this.allowDrop5}   key = {i} row = {i}  dropHandle= {this.handleDrop}/>)
           
          }
        return (
            <div className = "row" > 
                {board}
            </div>
   
    )
}
}

export default GameThree;