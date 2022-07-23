import Todo from './Todo'
import Loading from './Loading'
import Login from './Login'
import { useEffect, useState } from 'react'

function App() {
  const [component,changeComponent] = useState(<Loading />)
  console.log({...localStorage})
  
  return(
    <div className='App'>
      {/* {component} */}
      <Todo />
    </div>
  )
}

export default App