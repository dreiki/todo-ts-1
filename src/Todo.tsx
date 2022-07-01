import { useEffect, useState } from 'react'
import './Todo.css'

function TodoItems(props) {
    let checkedtoggle = (props.status) ? ["checked","selected"] : Array(2).fill("")
    return(
            <div className={`todo-container ${checkedtoggle[1]}`} onClick={props.onClick}>
                <p className={`item-description ${checkedtoggle[0]}`}>{props.text}</p>
            </div>
    )
}

function TodoItemsInput(props) {
    return(
        
        <div className={`input-container`}>
            <input className="input-field" name="Input" value={props.value} onInput={props.onChange} onKeyDown={props.onKeyDown}></input>
            <button className="Normal" onClick={props.onClick}>Add</button>
        </div>
    )
}

function Todo() {
    // type DataFormat = {id:number,description:string,checked:boolean}
    // const sampleData = [
    //     {id:1,description:"item1",checked:false},
    //     {id:2,description:"item2",checked:false},
    //     {id:3,description:"item3",checked:false},
    // ]

    const [data,setData] = useState([])
    const [input,setInput] = useState("")

    
    function flipCheck(...flipdata){
        // console.log(flipdata)
        let temporaryflipdata=data
        if (flipdata[0] === undefined) {
            for (let i of temporaryflipdata) {
                i.checked=false
            }
        } else {
            temporaryflipdata[(flipdata[0]-1)].checked=flipdata[1]
        }
        setData([...temporaryflipdata])
    }

    function deleteData(){
        let temporaryflipdata=[]
        let count=1
        for (let i of data) {
            if (i.checked === false) {
                i.id = count
                temporaryflipdata.push(i)
                count++
            }
        }
        // console.log(temporaryflipdata)
        setData([...temporaryflipdata])
    }

    function addNewData(newdata){
        if (newdata != "") {
            let temporarydata=data
            temporarydata.push({id:temporarydata.length+1,description:newdata,checked:false})
            // console.log(temporarydata)
            setData([...temporarydata])
        }
    }

    let dataTodoComponent = []
    for (let i of data) {
        dataTodoComponent.push(<TodoItems key={i.id} text={i.description} status={i.checked} onClick={()=>flipCheck(i.id,!i.checked)}/>)
    }

    return(
        <div className='todo-app-container'>
            <div className="app-header">
                <h1>TODO APP</h1>
            </div>
            {dataTodoComponent}
            <TodoItemsInput 
            onClick={()=>addNewData(input)} 
            onChange={(e)=>setInput(e.target.value)} 
            onKeyDown={(e)=>{if(e.key === 'Enter') {addNewData(input)}}}
            />
            <div className='button-group'>
                <button className="danger-button" onClick={()=>deleteData()}>Delete</button>
                <button className="normal-button" onClick={()=>flipCheck(undefined)}>Reset</button>
            </div>
        </div>
    )

    
}


export default Todo