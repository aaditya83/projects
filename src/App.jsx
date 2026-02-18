import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid'

function App() {
  const [todo, settodo] = useState("")
  const [finish, setfinish] = useState(true)
  const [todos, settodos] = useState(() => {
    const stored = localStorage.getItem("todos")
    return stored ? JSON.parse(stored) : []
  })

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const handleadd = () => {
    settodos([...todos, { todo, iscomplete: false, id: uuidv4() }])
    settodo("")
  }

  const handleedit = (e, id) => {
    let t = todos.filter(item => item.id === id)
    settodo(t[0].todo)
    settodos(todos.filter(item => item.id !== id))
  }

  const handledelete = (e, id) => {
    if (confirm("Delete this todo?")) {
      settodos(todos.filter(item => item.id !== id))
    }
  }

  const handlecheck = (e) => {
    let id = e.target.name
    settodos(todos.map(item =>
      item.id === id ? { ...item, iscomplete: !item.iscomplete } : item
    ))
  }

  return (
    <>
      <Navbar />

      <div className="px-3 md:px-0 max-w-xl mx-auto bg-purple-500 p-4 md:p-6 my-5 border:4px solid black-300">
        
        {/* Add Todo */}
        <div className="my-5">
          <h1 className="text-lg font-semibold mb-2">Add a new todo</h1>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              value={todo}
              onChange={(e)=>settodo(e.target.value)}
              type="text"
              placeholder="Enter a todo"
              className="bg-white w-full px-3 py-2 rounded"
            />
            <button
              disabled={todo.length < 3}
              onClick={handleadd}
              className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
            >
              Add
            </button>
          </div>
        </div>

        {/* Toggle */}
        <label className="flex items-center gap-2 my-3">
          <input type="checkbox" checked={finish} onChange={()=>setfinish(!finish)} />
          Show completed
        </label>

        <h1 className="text-lg font-bold mb-3">Welcome to iTodo</h1>

        {/* Todos */}
        <div>
          {todos.length === 0 && (
            <div className="text-center my-5">No todos yet</div>
          )}

          {todos.map(item =>
            (finish || !item.iscomplete) && (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3 rounded my-2"
              >
                <div className="flex items-center gap-3 flex-1">
                  <input
                    type="checkbox"
                    checked={item.iscomplete}
                    name={item.id}
                    onChange={handlecheck}
                  />
                  <span className={item.iscomplete ? "line-through" : ""}>
                    {item.todo}
                  </span>
                </div>

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={(e)=>handleedit(e,item.id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e)=>handledelete(e,item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )}
        </div>

      </div>
    </>
  )
}

export default App