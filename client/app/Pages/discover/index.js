import React, { useEffect, useState } from 'react'
import '@Pages/discover/index.scss'
import { useDispatch, useSelector } from 'react-redux'
import { getDiscoverPosts, DISCOVER_TYPES } from '@Actions'
import { PostThumb } from '@Components/PostThumb'
import { LoadMore } from '@Components/LoadMore'
import { getDataAPI } from '@Helpers'

export default function Discover() {
  const { auth, discover } = useSelector(state => state)
  const dispatch = useDispatch()

  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getDiscoverPosts(auth.token))
    }
  }, [dispatch, auth.token, discover.firstLoad])

  const { UPDATE_POST } = DISCOVER_TYPES

  const handleLoadMore = async () => {
    setLoad(true)
    const res = await getDataAPI(
      `/posts/discover?num=${discover.page * 9}`,
      auth.token
    )
    dispatch({
      type: UPDATE_POST,
      payload: res.data
    })
    setLoad(false)
  }

  const { result, page, loading } = discover

  return (
    <div className="discover">
      <div className="discover-display">
        <PostThumb posts={discover.posts} result={discover.result} />
      </div>
      {result < 9 * (page - 1) ? null : (
        <LoadMore active={load || loading} handleLoadMore={handleLoadMore} />
      )}
    </div>
  )
}
