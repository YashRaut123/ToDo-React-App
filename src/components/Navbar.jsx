import React from 'react'

const Navbar = () => {
  return (
    <div className = "flex justify-between bg-violet-900 to-20% text-white py-3 ">
        <div className="logo">
            <span className = "font-bold text-2xl mx-8 ">TaskZen</span>
        </div>
      <nav className="flex gap-7 mx-9">
        <ul className= "cursor-pointer hover:font-bold transition-all">Home</ul>
        <ul className= "cursor-pointer hover:font-bold transition-all">YourTasks</ul>
      </nav>
    </div>
  )
}

export default Navbar
