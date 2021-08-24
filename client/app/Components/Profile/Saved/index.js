import React, { useEffect, useState } from 'react'
import '@Components/Profile/Saved/index.scss'
import { PostThumb } from '@Components/PostThumb'
import { LoadMore } from '@Components/LoadMore'
import { getDataAPI } from '@Helpers'
import { TYPES } from '@Actions'

export const SavedPosts = ({ auth, dispatch }) => {
  const [posts, setPosts] = useState([])
  const [result, setResult] = useState(9)
  const [page, setPage] = useState(2)
  const [load, setLoad] = useState(false)
  const { ALERT } = TYPES

  useEffect(() => {
    setLoad(true)
    getDataAPI('/posts/saved', auth.token)
      .then(res => {
        setPosts(res.data.data)
        setResult(res.data.result)
        setLoad(false)
      })
      .catch(err => {
        dispatch({
          type: ALERT,
          payload: {
            error: err.response.data.error
          }
        })
      })
  }, [auth.token, dispatch])

  const handleLoadMore = async () => {
    setLoad(true)
    const res = await getDataAPI(`/posts/saved?limit=${page * 9}`, auth.token)
    setPosts(res.data.data)
    setResult(res.data.result)
    setPage(page + 1)
    setLoad(false)
  }

  return (
    <div className="saved-posts">
      <PostThumb posts={posts} result={result} />
      {result < 9 * (page - 1) ? null : (
        <LoadMore active={load} handleLoadMore={handleLoadMore} />
      )}
    </div>
  )
}
