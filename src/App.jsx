import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa"
import { AiFillDelete } from "react-icons/ai"
import { v4 as uuidv4 } from 'uuid'

function App() {

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)


  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"))
    if (storedTodos) {
      setTodos(storedTodos)
    }
  }, [])


  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])

  const toggleFinished = () => {
    setShowFinished(!showFinished)
  }

  const handleAdd = () => {
    if (todo.trim() === "") return

    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
  }

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
  }

  const handleEdit = (id) => {
    const itemToEdit = todos.find(item => item.id === id)
    setTodo(itemToEdit.todo)

    const newTodos = todos.filter(item => item.id !== id)
    setTodos(newTodos)
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }


  const handleCheckbox = (id) => {
    const newTodos = todos.map(item =>
      item.id === id
        ? { ...item, isCompleted: !item.isCompleted }
        : item
    )

    setTodos(newTodos)
  }
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-linear-to-br from-violet-600 via-purple-600 to-indigo-700 flex items-start justify-center py-10">

        <div className="w-full max-w-xl bg-white/20 backdrop-blur-lg rounded-2xl shadow-2xl p-8 text-white">

          <h1 className="text-3xl font-bold text-center mb-6">
            TaskZen - Manage your todos
          </h1>


          <div className="flex flex-col gap-4 mb-6">
            <h2 className="text-xl font-semibold">Add a Todo</h2>

            <div className="flex gap-3">
              <input
                type="text"
                value={todo}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-full border-2 border-violet-400 focus:border-violet-600 outline-none text-black"
              />

              <button
                onClick={handleAdd}
                disabled={todo.length <= 3}
                className="bg-white text-violet-700 font-bold px-6 py-2 rounded-full hover:bg-violet-100 transition disabled:bg-gray-300 disabled:text-gray-500"
              >
                Save
              </button>
            </div>
          </div>


          <div className="flex items-center gap-2 mb-4">
            <input
              type="checkbox"
              checked={showFinished}
              onChange={toggleFinished}
            />
            <label>Show Finished</label>
          </div>

          <div className=" bg-white/40 w-full mb-4"></div>

          {/* Todo List */}
          <h2 className="text-xl font-semibold mb-4">Your Todos</h2>

          <div className="flex flex-col gap-3">

            {todos.length === 0 && (
              <div className="text-center opacity-70">
                No Todos to display
              </div>
            )}

            {todos.map(item => {
              if (!showFinished && item.isCompleted) return null

              return (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-white text-black px-4 py-3 rounded-xl shadow-md hover:scale-[1.02] transition-transform duration-200"
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={() => handleCheckbox(item.id)}
                    />

                    <div className={item.isCompleted ? "line-through opacity-60" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="bg-violet-600 hover:bg-violet-700 text-white p-2 rounded-md transition"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() => handleDelete(item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-md transition"
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

        </div>
      </div>
    </>
  )
}

export default App