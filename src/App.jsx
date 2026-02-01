import React, {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {

  const [userdata, setUserData] = useState([])
  const [index, setIndex] = useState(1)

  const getData = async () => {

    const response=await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=100`)
    setUserData(response.data)

    // axios.post('https://picsum.photos/v2/list?page=2&limit=100', {username:'shoaib', password:'abcdefgh'}) // link ke sath data bhi bhej sakte hai aur config bhi bahut kuch
  }

  useEffect(function() {
    getData()
  },[index])

 let printUserData = <h3 className='text-gray-300 text-xs absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-semibold'>Loading...</h3>
 if(userdata.length>0){
  printUserData = userdata.map(function(elem,idx) {

    return <div key={idx}>
      <a href={elem.url} target='_blank'>
        <div className='h-40 w-44 overflow-hidden rounded-xl'>
      <img className='h-full w-full object-cover' src={elem.download_url} alt=""/>
      </div>
    <h2 className='font-bold text-lg'>{elem.author}</h2>
      </a>
      </div>
  } )
 }

  return (
    <div className='bg-black overflow-auto h-screen text-white'>
      {/* <h1 className='fixed text-6xl bg-red-400'>{index}</h1> */}
      <div className='flex flex-wrap gap-4'>
        {printUserData}
      </div>
      <div className='flex justify-center gap-6 items-center p-4 '>
        <button
         className='bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold'
          onClick={()=>{
            // console.log('prev button clicked')
            if(index>1){
              setIndex(index-1)
              setUserData([])
            }
          }}
          >
          Prev
          </button>
          <h4>page{index}</h4>
        <button
         className='bg-amber-400 text-sm cursor-pointer active:scale-95 text-black rounded px-4 py-2 font-semibold'
          onClick={()=> {
            setUserData([])
            // console.log('next button clicked')
            setIndex(index+1)
          }}
          >
          Next
          </button>
      </div>
    </div>
  )
}

export default App
