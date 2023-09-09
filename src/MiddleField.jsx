import React, { useEffect, useState } from 'react'
import LowerField from './LowerField'

const MidlleField = (props) => {

  const [isChosen, setIsChosen] = useState('not-chosen')
  
  const [isWonField, setIsWonField] = useState(false)

  const [winner, setWinner] = useState('')

  const [field, setField] = useState([0,0,0,0,0,0,0,0,0])

  const [draw, setDraw] = useState(false)

  let catchLowerMove = (id) => {
    let field1 = field
    field1.splice(id, 1, props.order) 
    setField(field1)
    unChooseField()
    if(props.isWin(field) === true){
      setIsWonField(props.isWin(field))
      setWinner(props.order)
      props.catchWonField(props.id)
    }else if(props.isWin(field) === 'draw'){
      setDraw(true)
      props.catchDrawField(props.id)
    }

    props.catchMidlleMove(id)
    
  }

  let lowerField = []
  for (let i = 0; i < 9; i++) {
    lowerField.push(<LowerField 
      key = {i}
      id = {i}
      order={props.order} 
      changeOrder={props.changeOrder}
      catchLowerMove={catchLowerMove} 
      chosen={isChosen}/>);
    
  }

  let chooseField = () => {
    if(isChosen === 'not-chosen' && 
      isWonField === false && 
      !draw && 
      (props.id === props.nextMove || 9 === props.nextMove)) {
        setIsChosen('chosen')
      }
  }

  let unChooseField = () => {
    setIsChosen('not-chosen')

  }
  
  let checkNextMove = () => { 
    if(props.nextMove === props.id || props.nextMove === 9){
      return true
    }
  }
  return (
    <>
    <div className={`midlle 
                    field 
                    ${isChosen} 
                    ${isWonField && 'won'}-${winner} 
                    ${draw && 'draw'}
                    ${checkNextMove() && 'next-move'}`
    } onClick={chooseField}>
      
    {lowerField}
    </div>
    {isChosen === 'chosen'&&<div className="background-cover" onClick={unChooseField}></div>}

    </>
  )
}

export default MidlleField