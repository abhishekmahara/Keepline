import React, { useState } from 'react'

const Home = () => {
 const [title , setTitle] = useState("")

  return (
    <div>
      <input className='p-2 rounded-xl bg-gray-400 mt-2 ' type="text" placeholder='Enter title here' value={title} onChange={(e)=>setTitle(e.target.value)} />
    </div>
  )
}

export default Home
