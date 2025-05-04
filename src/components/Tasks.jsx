import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";

function Tasks() {
    const [todos, setTodos] = useState([]);
    const [showFinished, setShowFinished] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        let todoString = localStorage.getItem("todos");
        if (todoString) {
            try {
                let todos = JSON.parse(todoString);
                setTodos(todos);
            } catch (e) {
                console.error("Failed to parse todos from localStorage", e);
                setTodos([]);
            }
        }
    }, []);

    const saveToLS = (newTodos) => {
        localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    const toggleFinished = () => {
        setShowFinished(!showFinished);
    };

    const handleDelete = (id) => {
        const newTodos = todos.filter(item => item.id !== id);
        setTodos(newTodos);
        saveToLS(newTodos);
    };

    const handleCheckbox = (e) => {
        let id = e.target.name;
        let index = todos.findIndex(item => item.id == id);
        let newTodos = [...todos];
        newTodos[index].isCompleted = !newTodos[index].isCompleted;
        setTodos(newTodos);
        saveToLS(newTodos);
    };

    const handleEdit = (id) => {
        let t = todos.filter(i => i.id === id)[0];

        let newTodos = todos.filter(item => item.id !== id);
        setTodos(newTodos);
        saveToLS(newTodos);

        navigate('/', { state: { todo: t.todo, id: t.id } });
    };

    return (
        <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-green-100 min-h-[80vh] md:w-[35%] flex flex-col justify-between">
            <div>
                <div className='flex justify-between items-center p-2'>
                    <h2 className="text-2xl font-bold">Your Todos</h2>
                    <div>
                        <input type="checkbox" id="show" checked={showFinished} onChange={toggleFinished} />
                        <label className="mx-2" htmlFor="show">Show Finished</label>
                    </div>
                </div>

                <div className="todos mt-4">
                    {todos.length === 0 && <div className="m-5">No Todos to display.</div>}
                    {todos.map(item => (
                        (showFinished || !item.isCompleted) && (
                            <div key={item.id} className="todo flex my-3 justify-between">
                                <div className="flex gap-5">
                                    <input
                                        name={item.id}
                                        onChange={handleCheckbox}
                                        type="checkbox"
                                        checked={item.isCompleted}
                                    />
                                    <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                                </div>
                                <div className="buttons flex h-full">
                                    <button onClick={() => handleEdit(item.id)} className="bg-green-600 hover:bg-green-700 p-2 py-1 font-bold text-sm text-white rounded-md mx-1">
                                        <FaEdit />
                                    </button>
                                    <button onClick={() => handleDelete(item.id)} className="bg-green-600 hover:bg-green-700 p-2 py-1 font-bold text-sm text-white rounded-md mx-1">
                                        <AiFillDelete />
                                    </button>
                                </div>
                            </div>
                        )
                    ))}
                </div>
            </div>
            <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        </div>
    );
}

export default Tasks;