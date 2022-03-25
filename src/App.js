import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import Web from 'components/layout/Web'
import Home from 'views/Home'

const queryClient = new QueryClient()

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <Web>
          <Switch>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Web>
      </QueryClientProvider>
    </Router>
  )
}

export default App
