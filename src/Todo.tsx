import { useEffect, useState } from 'react'
import './Todo.css'

function TodoItems(props) {
    let checkedtoggle = (props.status) ? "Checked" : ""
    return(
        <div className="TodoContainer" onClick={props.onClick}>
            <input type="checkbox"></input>
            <p className={`ItemDesc ${checkedtoggle}`}>{props.text}</p>
        </div>
    )
}

function Todo() {
    const originData = [
        {id:1,description:"item1",checked:false},
        {id:2,description:"item2",checked:false},
        {id:3,description:"item3",checked:false},
    ]

    // let data = [...originData]

    const [data,setData] = useState(originData)

    
    function FlipCheck(index,checkstatus){
        let temporaryFlipData=data
        temporaryFlipData[(index-1)].checked=checkstatus
        console.log(temporaryFlipData[(index-1)])
        setData([...temporaryFlipData])
    }

    let dataTodoComponent = []
    for (let i of data) {
        dataTodoComponent.push(<TodoItems text={i.description} status={i.checked} onClick={()=>FlipCheck(i.id,!i.checked)}/>)
    }

    return(
        <div className='Todo'>
            {dataTodoComponent}
            <div className='ResetButton'><button>Reset</button></div>
        </div>
    )

    
}


export default Todo