import React, { useState } from 'react'

const LowerField = (props) => {

  const [value, setValue] = useState('')

  let pointField = () => {
    if(value === '' && props.chosen === 'chosen'){
      setValue(props.order)
      props.catchLowerMove(props.id)
      props.changeOrder()
    }
  }

  return (
    <div className={"lower field "+value} onClick={pointField}>{value}</div>
    )
}

export default LowerField