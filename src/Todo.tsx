import { useEffect, useState } from 'react'
import './Todo.css'

function TodoItems(props) {
    let checkedtoggle = (props.status) ? ["Checked","Selected"] : Array(2).fill("")
    return(
        <div className={`TodoContainer ${checkedtoggle[1]}`} onClick={props.onClick}>
            {/* <input type="checkbox"></input> */}
                <p className={`ItemDesc ${checkedtoggle[0]}`}>{props.text}</p>
        </div>
    )
}

function TodoItemsInput(props) {
    return(
        <div className={`TodoContainer`}>
            <input className="InvisibleInput" name="Input" value={props.value} onInput={props.onChange}></input>
            <button className="Normal" onClick={props.onClick}> Add</button>
            {/* <p className={`ItemDesc ${checkedtoggle[0]}`}>{props.text}</p> */}
        </div>
    )
}

function Todo() {
    // type DataFormat = {id:number,description:string,checked:boolean}
    const originData = [
        {id:1,description:"item1",checked:false},
        {id:2,description:"item2",checked:false},
        {id:3,description:"item3",checked:false},
    ]

    const [data,setData] = useState(originData)
    const [input,setInput] = useState("")

    
    function FlipCheck(index,checkstatus){
        console.log(index)
        let temporaryFlipData=data
        temporaryFlipData[(index-1)].checked=checkstatus
        console.log(temporaryFlipData[(index-1)])
        setData([...temporaryFlipData])
    }

    function FlipCheckResetAll(){
        let temporaryFlipData=data
        for (let i of temporaryFlipData) {
            i.checked=false
        }
        setData([...temporaryFlipData])
    }

    function DeleteData(){
        let temporaryFlipData=[]
        let count=1
        for (let i of data) {
            if (i.checked === false) {
                i.id = count
                temporaryFlipData.push(i)
                count++
            }
        }
        console.log(temporaryFlipData)
        setData([...temporaryFlipData])
    }

    function AddNewData(newdata){
        if (newdata != "") {
            let temporaryData=data
            temporaryData.push({id:temporaryData.length+1,description:newdata,checked:false})
            console.log(temporaryData)
            setData([...temporaryData])
        }
    }

    let dataTodoComponent = []
    for (let i of data) {
        dataTodoComponent.push(<TodoItems text={i.description} status={i.checked} onClick={()=>FlipCheck(i.id,!i.checked)}/>)
    }

    return(
        <div className='Todo'>
            {dataTodoComponent}
            <TodoItemsInput onClick={()=>AddNewData(input)} onChange={(e)=>setInput(e.target.value)}/>
            <div className='ButtonGroup'>
                <button className="Deleter" onClick={()=>DeleteData()}>Delete</button>
                <button className="Normal" onClick={()=>FlipCheckResetAll()}>Reset</button>
            </div>
        </div>
    )

    
}


export default Todo