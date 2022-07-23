import Todo from './Todo'
import Loading from './Loading'
import Login from './Login'
import { useEffect, useState } from 'react'

function App() {
  const [component,changeComponent] = useState(<Loading />)
  console.log({...localStorage})
  
<<<<<<< HEAD
=======
    useEffect(() => {
      setTimeout(()=>{
        changeComponent(<Todo />)
      },2000)
    },[])

>>>>>>> origin/master
  return(
    <div className='App'>
      {/* {component} */}
      <Todo />
    </div>
  )
}

export default App