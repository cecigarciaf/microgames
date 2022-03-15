import React from 'react';


function Cell(props){

    return (
        <div style= {props.containerStyle(props.statusarray1, props.statusarray2) }>
            <div className= {props.cN(props.cell, props.statusarray2)} level = {props.level} statusarray = {props.statusarray2} style = {props.cellStyle(props.cell, props.statusarray2)} cell = {props.cell} row = {props.row} col = {props.col} onContextMenu = {(e) =>props.handleRightClick(props.row,props.col, e)} onClick = {() => props.handleClick(props.row,props.col)}>
                <tx style = {{fontWeight: "bold"}}> {props.result} </tx>
            </div>
        </div>
    )
}


function Row(props) {
    var style = {
        display: "flex",
    }

    var iC = props.initCell
    var lC = props.lastCell

    var row = []
        for (let i= iC; i < lC; i++) {
            row.push(<Cell initCell = {props.initCell} lastCell = {props.lastCell} cellStyle={props.cellStyle} containerStyle = {props.containerStyle} level = {props.level} cN = {props.cN} statusarray2 = {props.statusarray2[props.row][i]} result = {props.result[props.row][i]} key = {i} cell = {props.cells[i]} row = {props.row} col = {i} handleRightClick = {props.handleRClick} handleClick = {props.handleClick}/>)
        }

    return (
        <div className= "text-center justify-content-center" style = {style}>
        {row }
        </div>

    )
}

function Board(props) {
    var iC = props.initCell
    var lC = props.lastCell
    var board = []
        for (let i=iC; i<lC; i++) {
            board.push(<Row  initCell = {props.initCell} lastCell = {props.lastCell}  cellStyle={props.cellStyle} containerStyle = {props.containerStyle}  level = {props.level} cN = {props.cN} statusarray2 = {props.statusarray2} result = {props.result} key = {i} row = {i} cells = {props.cells[i]} handleRClick = {props.handleRClick} handleClick = {props.handleClick}/>)
        }
        return (
            <div  className = {props.boardclass} > 
            {board}
            </div>
        )
    }


    export default Board;