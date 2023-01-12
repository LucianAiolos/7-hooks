import {useEffect, useRef, useState } from 'react'
import axios from 'axios'

function Posts() {
  const mounted = useRef(false)
  const [posts, setPosts] = useState([])

  useEffect(()=> {
    if(mounted.current === false) {
      getPosts()
    }
  }, [])

  const getPosts = async () => {
    try {
      const res = await axios.get(`https://dummyjson.com/posts?limit=13`)
      // console.log(res.data)
      setPosts(res.data.posts)
    } catch (error) {
      alert(error)
    }
  }

  return (
    <div className='posts-container'>
      {posts.length > 0 &&  
        posts.map((post, i) => 
          <div key={i}>
            <p className="title">{post.title}</p>
          </div>
        )
      }
    </div>
  )
}

export default Posts