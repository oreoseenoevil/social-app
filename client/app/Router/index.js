import React from 'react'
import { useParams } from 'react-router-dom'
import { PageNotFound } from '@Utils'

const generatePage = (pageName) => {
  const component = () => require(`../Pages/${pageName}`).default

  try {
    return React.createElement(component())
  } catch (error) {
    return <PageNotFound />
  }
}

export const PageRender = () => {
  const { page, id } = useParams()

  let pageName = ''

  if (id) {
    pageName = `${page}/[id]`
  } else {
    pageName = `${page}`
  }

  return generatePage(pageName)
}
