import './App.css'
import { gql,useQuery } from '@apollo/client'


const query = gql`
  query GetTodos {
      getTodos {
          title
          completed
      }
  }
`

type Todos =  {
    id: string
    title: string
    completed: boolean
}



function App() {
  const {data} = useQuery<{
    getTodos : Todos[]
  }>(query);
  return (
    <>
      {
          Array.isArray(data?.getTodos) && data.getTodos.length > 0 && data.getTodos.map((d,index) => (
            <span style={{
              color : 'black'
            }} key={index}>{d.title}</span>
          ))
      }
      
    </>
  )
}

export default App
