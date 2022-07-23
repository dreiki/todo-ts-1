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
            <button className="normal-button" onClick={props.onClick}>Add</button> {/* bind component click event to parrent component*/}
        </div>
    )
}

//Main Todo App Container Component
export default function Todo() {
    // read local storage as initial data if exist
    const initialdata = () => {
        const localdata=JSON.parse(localStorage.getItem("data"))
        return localdata || []
    } 
    
    // some constant for database testing
    const URI_DOMAIN = "http://localhost:5000"
    const USERNAME = 'dennyrizram'
    const controller = new AbortController();
    // hooks for data & input value
    const [data,setData] = useState(initialdata)
    const [input,setInput] = useState("")

    // fetch function to get todo data from server
    async function getdatafromserver(){
        const serverresponse = await fetch(URI_DOMAIN+"/get",{
            signal: controller.signal,
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({'user': USERNAME})
        }).then((response)=> response.json()).catch((d)=>{console.error(d)})
        console.log(serverresponse)
        return serverresponse      
    }

    // fetch function to update todo data to server
    async function updatedatainserver() {
        const datatoserver = {
            'user': JSON.parse(localStorage.getItem('user')),
            'date': JSON.parse(localStorage.getItem('date')),
            'data': JSON.parse(localStorage.getItem('data'))
        }

        const serverresponse = await fetch(URI_DOMAIN+"/update",{
            signal: controller.signal,
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(datatoserver)
        }).then((response)=> response.json()).then((d)=>{console.log(d)}).catch((d)=>{console.error(d)}) 
    }

    // store to local storage & server when data state changed
    useEffect(() => {
        const updatealldata = async () => {
            await localStorage.setItem("data",JSON.stringify(data));
            updatedatainserver()
        }

        updatealldata()
        return () => {
        }
    },[data])

    // sync local data with server on intitial render
    useEffect(() => {
        localStorage.setItem("user",JSON.stringify(USERNAME));
        
        const synclocaltoremote = async () => {
            //local dan data server assignment
            const dataserver = await getdatafromserver()
            const datalocal = {
                'user': JSON.parse(localStorage.getItem('user')),
                'date': JSON.parse(localStorage.getItem('date')),
                'data': JSON.parse(localStorage.getItem('data'))
            }

            // logging to monitor local and server data
            console.log('LOCAL DATA')
            console.log(datalocal)
            console.log(datalocal.data.length)
            console.log(datalocal.date)
            console.log('SERVER DATA')
            console.log(dataserver)
            console.log(dataserver.data.length)
            console.log(dataserver.date)

            // compare the age of data with date object
            if (dataserver.date < datalocal.date) {
                console.log('DATA LOCAL LEBIH UPDATE')
                localStorage.setItem("date",JSON.stringify(Date.now()))
                if (datalocal.data.length > 0){
                    setData([...datalocal.data])
                } else {
                    setData([])
                }
            } else {
                console.log('DATA SERVER LEBIH UPDATE')
                localStorage.setItem("date",JSON.stringify(Date.now()))
                if (dataserver.data.length > 0){
                    setData([...dataserver.data])
                } else {
                    setData([])
                }
            }
        }
        // Please call function below on production only, react strict mode on first render call this twice and causing fetch data multiple time
        // synclocaltoremote() 
        
        return () => {
            // Please call function below on dev environment only
            synclocaltoremote()
        }
    },[])

    // nested function to flip the checked data
    function flipCheck(...flipdata){
        let temporarydata=data
        if (flipdata[0] === undefined) {
            for (let i of temporarydata) {
                i.checked=false
            }
        } else {
            temporarydata[(flipdata[0]-1)].checked=flipdata[1]
        }
        console.log(temporarydata)
        localStorage.setItem("date",JSON.stringify(Date.now()))
        setData([...temporarydata])
    }

    // nested function to delete selected data
    function deleteData(){
        let temporarydata=[]
        let count=1
        for (let i of data) {
            if (i.checked === false) {
                i.id = count
                temporarydata.push(i)
                count++
            }
        }
        console.log(temporarydata)
        localStorage.setItem("date",JSON.stringify(Date.now()))
        setData([...temporarydata])
    }

    // nested function to add new data
    function addNewData(newdata){
        if (newdata != "") {
            let temporarydata=data
            temporarydata.push({id:temporarydata.length+1,description:newdata,checked:false})
            console.log(temporarydata)
            localStorage.setItem("date",JSON.stringify(Date.now()))
            setData([...temporarydata])
        }
    }

    // dynamicaly create how many todo item component according to data
    let dataTodoComponent = []
    for (let i of data) {
        dataTodoComponent.push(<TodoItems key={i.id} text={i.description} status={i.checked} username={i.username} onClick={()=>flipCheck(i.id,!i.checked)}/>)
    }

    return(
        <div className='todo-app-container'>
            <div className="app-header">
                <h1>ToDo App</h1>
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