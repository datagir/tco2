import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { QueryClient, QueryClientProvider } from 'react-query'

import 'fonts/fonts.css'
import { GlobalStyle } from 'utils/styles'
import StyleProvider from 'components/providers/StyleProvider'
import ModalProvider from 'components/providers/ModalProvider'
import UXProvider from 'components/providers/UXProvider'
import SearchProvider from 'components/providers/SearchProvider'

import Web from 'components/layout/Web'
import Home from 'views/Home'

const queryClient = new QueryClient()

function App() {
  return (
    <Router>
      <QueryParamProvider ReactRouterRoute={Route}>
        <QueryClientProvider client={queryClient}>
          <StyleProvider>
            <SearchProvider>
              <UXProvider>
                <GlobalStyle />
                <ModalProvider>
                  <Web>
                    <Switch>
                      <Route path='/'>
                        <Home />
                      </Route>
                    </Switch>
                  </Web>
                </ModalProvider>
              </UXProvider>
            </SearchProvider>
          </StyleProvider>
        </QueryClientProvider>
      </QueryParamProvider>
    </Router>
  )
}

export default App
