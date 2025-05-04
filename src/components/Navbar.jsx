import { NavLink } from "react-router-dom"

const navbar = () => {
  return (
    <nav className='flex justify-around bg-green-600 text-white py-2'>
      <div className="logo">
        <span className='font-bold text-xl mx-8'>ToDoList</span>
      </div>
      <ul className="flex gap-8 mx-8 ">
        <NavLink to='/'><li className='cursor-pointer hover:font-bold transition-all duration-50'>Home</li></NavLink>
        <NavLink to='/tasks'><li className='cursor-pointer hover:font-bold transition-all duration-50'>Your Tasks</li></NavLink>
      </ul>
    </nav>
  )
}

export default navbar
