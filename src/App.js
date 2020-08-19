import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'

import { PostsList, AddPostForm, SinglePostPage } from './features/posts'

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
          <Route path="/posts/:id">
            {(props) => <SinglePostPage postId={props.match.params.id} />}
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
