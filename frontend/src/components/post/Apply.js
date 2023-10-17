import React, { useId, useState } from 'react'

export default function (props) {
    const [id, setId]  = useState(props.id);
    
    
  return (
    <div>
        
        {id}
    </div>
  )
}
