import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useSocketPost = (link, action) => {
  const { socket } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on(link, newPost => {
      dispatch({
        type: action,
        payload: newPost
      })
    })

    return () => socket.off(link)
  }, [socket, dispatch])
}

export const useSocketFollow = (link, action) => {
  const { auth, socket } = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    socket.on(link, data => {
      dispatch({
        type: action,
        payload: { ...auth, user: data }
      })
    })
    return () => socket.off(link)
  }, [socket, dispatch, auth])
}
