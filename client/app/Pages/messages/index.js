import React, { useContext } from 'react'
import '@Pages/messages/index.scss'
import { LeftSide } from '@Components/Message'
import { LayoutContext } from '@Context/Layout'
import { FaPaperPlane } from 'react-icons/fa'

export default function Messages() {
  const { dark } = useContext(LayoutContext)

  return (
    <div className="messages">
      <div className="message-container">
        <div className={`message-col ${dark && 'dark'}`}>
          <LeftSide dark={dark} />
        </div>
        <div className={`message-col-2 ${dark && 'dark'}`}>
          <FaPaperPlane size="3em" />
          <h2>Your Messages</h2>
          <h4>Send private photos and messages to your friends.</h4>
          <button type="button" className={`${dark && 'dark'}`}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  )
}
