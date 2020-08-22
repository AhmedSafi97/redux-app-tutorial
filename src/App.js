import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import {
  PostsList,
  AddPostForm,
  SinglePostPage,
  EditPostForm,
} from './features/posts'

import { UserPage, UsersList } from './features/users'

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route exact path="/">
            <>
              <AddPostForm />
              <PostsList />
            </>
          </Route>
          <Route path="/posts/:postId">
            <SinglePostPage />
          </Route>
          <Route path="/edit-post/:postId">
            <EditPostForm />
          </Route>
          <Route path="/users/:userId">
            <UserPage />
          </Route>
          <Route path="/users">
            <UsersList />
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
