import { useEffect, useState } from 'react'
import './Todo.css'

//TodoItem Component
function TodoItems(props) {
    let checkedtoggle = (props.status) ? ["checked","selected"] : Array(2).fill("") // apply class style according to condition of checked items
    return(
            <div className={`todo-container ${checkedtoggle[1]}`} onClick={props.onClick}> {/* bind component click event to parrent component*/}
                <p className={`item-description ${checkedtoggle[0]}`}>{props.text}</p>
            </div>
    )
}

//InputNewTodoItem Component
function TodoItemsInput(props) {
    return(
        <div className={`input-container`}>
            <input className="input-field" name="Input" value={props.value} onInput={props.onChange} onKeyDown={props.onKeyDown}></input> {/* bind component input event to parrent component*/}
            <button className="Normal" onClick={props.onClick}>Add</button> {/* bind component click event to parrent component*/}
        </div>
    )
}

function Todo() {
    // type DataFormat = {id:number,description:string,checked:boolean} <-- trying to create type for consistent data type utilizing typescript, never actually tested
    // Sample data used while creating initial components & logic (no longer used)
    // const sampleData = [
    //     {id:1,description:"item1",checked:false},
    //     {id:2,description:"item2",checked:false},
    //     {id:3,description:"item3",checked:false},
    // ]

    // read local storage as initial data if exist
    const initialdata = () => {
        const localdata=JSON.parse(localStorage.getItem("data"))
        if (localdata != "") {
            //log it to console if local data exist, to check manually
            console.log("LOCAL DATA EXIST")
            console.log(localdata)
        }
        return localdata || []
    } 

    // hooks for data & input value
    const [data,setData] = useState(initialdata)
    const [input,setInput] = useState("")

    // store to local storage when data state changed
    useEffect(() => {
        localStorage.setItem("data",JSON.stringify(data));
    },[data])

    // nested function to flip the checked data
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

    // nested function to delete selected data
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

    // nested function to add new data
    function addNewData(newdata){
        if (newdata != "") {
            let temporarydata=data
            temporarydata.push({id:temporarydata.length+1,description:newdata,checked:false})
            // console.log(temporarydata)
            setData([...temporarydata])
        }
    }

    // dynamicaly create how many todo item component according to data
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
            onClick={()=>addNewData(input)} // call add new data function on mouse click 
            onChange={(e)=>setInput(e.target.value)} // bind value entered on input to input state
            onKeyDown={(e)=>{if(e.key === 'Enter') {addNewData(input)}}} // call add new data function on enter key press
            />
            <div className='button-group'>
                <button className="danger-button" onClick={()=>deleteData()}>Delete</button>
                <button className="normal-button" onClick={()=>flipCheck(undefined)}>Reset</button>
            </div>
        </div>
    )
}

export default Todo