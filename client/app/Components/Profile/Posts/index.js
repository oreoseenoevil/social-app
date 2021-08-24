import React, { useEffect, useState } from 'react'
import '@Components/Profile/Posts/index.scss'
import { PostThumb } from '@Components/PostThumb'
import { LoadMore } from '@Components/LoadMore'
import { getDataAPI } from '@Helpers'
import { PROFILE_TYPES } from '@Actions'

export const Posts = ({ auth, id, dispatch, profile }) => {
  const [posts, setPosts] = useState([])
  const [result, setResult] = useState(9)
  const [page, setPage] = useState(0)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    profile.posts.forEach(data => {
      if (data._id === id) {
        setPosts(data.data)
        setResult(data.result)
        setPage(data.page)
      }
    })
  }, [profile.posts, id])

  const { UPDATE_POST } = PROFILE_TYPES

  const handleLoadMore = async () => {
    setLoad(true)
    const res = await getDataAPI(
      `/user/posts/${id}?limit=${page * 9}`,
      auth.token
    )
    const newData = { ...res.data, page: page + 1, _id: id }
    dispatch({
      type: UPDATE_POST,
      payload: newData
    })
    setLoad(false)
  }

  return (
    <div className="user-posts">
      <PostThumb posts={posts} result={result} />

      {result < 9 * (page - 1) ? null : (
        <LoadMore active={load} handleLoadMore={handleLoadMore} />
      )}
    </div>
  )
}
