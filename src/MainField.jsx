import React, { useState } from 'react'
import MidlleField from './MiddleField'

const MainField = () => {

  const [order, setOrder] = useState('x')

  const [field, setField] = useState([0,0,0,0,0,0,0,0,0])

  const [nextMove, setNextMove] = useState(9)

  const [winner, setWinner] = useState('')

  let isWin = (field) => {
    let winVariants = [
      [1,2,3],
      [4,5,6],
      [7,8,9],
      [1,4,7],
      [2,5,8],
      [3,6,9],
      [1,5,9],
      [3,5,7]
    ]
    let result = false
    winVariants.forEach(elem => {
      if(field[elem[0]-1] !== 'draw' &&field[elem[0]-1] === field[elem[1]-1] && field[elem[0]-1] === field[elem[2]-1] && field[elem[0]-1] !== 0){
        result = true
      }

    });
      if(field.indexOf(0) === -1){
        result = 'draw'
      }
    return result
  }

  let changeOrder = () => {
    order === 'x'? setOrder('o') : setOrder('x')
  }

  let catchMidlleMove = (id) => {  
      if(field[id] === 0){
        setNextMove(id)
      }else{
        setNextMove(9)
      
    }
  }

  let catchDrawField = (id) => {
    console.log('a')
    let field1 = field
    field1.splice(id, 1, 'draw') 
    setField(field1)
  }

  let catchWonField = (id) => {
    let field1 = field
    field1.splice(id, 1, order) 
    setField(field1)
    if(isWin(field) === true){
      setWinner(`winner ${order}`)
    }else if(isWin(field) === 'draw'){
      setWinner('draw')
    }
  }

  let midlleFields = []
  for (let i = 0; i < 9; i++) {
    midlleFields.push(
      <MidlleField
      key = {i}
      id = {i}
      order={order} 
      changeOrder={changeOrder} 
      isWin={isWin}
      nextMove={nextMove}
      catchMidlleMove={catchMidlleMove}
      catchDrawField={catchDrawField}
      catchWonField={catchWonField}/>
    )
    
  }

  return (
    <>        
    <div className="order">{order}</div>
    {winner !== ''&& <> 
      <div className="popup-win">{winner}</div>
      <div className="background-cover" onClick={window.location.reload()}></div>
    </>}
    <main>
        {midlleFields}
    </main>
    </>
  )
}

export default MainField