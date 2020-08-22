import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { addNewPost } from './postsSlice'
import { unwrapResult } from '@reduxjs/toolkit'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [addRequestStatus, setAddRequestStatus] = useState('idle')

  const users = useSelector((state) => state.users)

  const dispatch = useDispatch()

  const onSavePostClick = async () => {
    try {
      setAddRequestStatus('pending')
      const actionResult = await dispatch(
        addNewPost({ title, content, user: userId })
      )
      unwrapResult(actionResult)
      setTitle('')
      setContent('')
      setUserId('')
    } catch (err) {
      console.log('error occurred', err)
    } finally {
      setAddRequestStatus('idle')
    }
  }

  const canSave =
    [title, content, userId].every(Boolean) && addRequestStatus === 'idle'

  const usersOption = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  return (
    <section>
      <h2>Add a new post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postContent">Post Content:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select
          id="postAuthor"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value=""></option>
          {usersOption}
        </select>
        <button type="button" onClick={onSavePostClick} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
