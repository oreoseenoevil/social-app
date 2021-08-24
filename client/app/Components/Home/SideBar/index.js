import React, { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UserCard } from '@Components/UserCard'
import { FollowButton } from '@Components/FollowButton'
import { getSuggestions } from '@Actions'
import { FaRedo } from 'react-icons/fa'
import { VscLoading } from 'react-icons/vsc'
import '@Components/Home/SideBar/index.scss'
import { LayoutContext } from '@Context/Layout'

export const SideBar = () => {
  const { dark } = useContext(LayoutContext)
  const { auth, suggestions } = useSelector(state => state)
  const dispatch = useDispatch()

  return (
    <div className="sidebar-container">
      <UserCard user={auth.user} />
      <div className="sidebar-row">
        <h5>Suggestion for you</h5>
        <FaRedo
          size="1em"
          onClick={() => dispatch(getSuggestions(auth.token))}
        />
      </div>
      <div className="suggestions">
        {suggestions.loading ? (
          <VscLoading size="3em" className="loading-profile" />
        ) : (
          suggestions.users.map(user => (
            <UserCard key={user._id} user={user}>
              <FollowButton dark={dark} user={user} />
            </UserCard>
          ))
        )}
      </div>
    </div>
  )
}
