import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'

export const UserPage = () => {
  const { userId } = useParams()
  const user = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  )

  const postsForUser = useSelector((state) =>
    state.posts.data.filter((post) => post.user === userId)
  )

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))

  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}
