import './Todo.css'

function TodoItems(props) {
    return(
        <div className="TodoContainer">
            <input type="checkbox"></input>
            <p className='ItemDesc'>{props.text}</p>
        </div>
    )
}

function Todo() {
    const data = ["item1","item2","bitsch","NIG"]
    let dataTodo = []
        for (let i of data) {
            dataTodo.push(<TodoItems text={i} />)
            console.log(i)
        }
    return(
        <div className='Todo'>
            {dataTodo}
            <div className='ResetButton'><button>Reset</button></div>
        </div>
    )
}


export default Todo