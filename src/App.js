import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5';

import 'fonts/fonts.css'
import { GlobalStyle } from 'utils/styles'
import StyleProvider from 'components/providers/StyleProvider'
import ModalProvider from 'components/providers/ModalProvider'
import UXProvider from 'components/providers/UXProvider'
import SearchProvider from 'components/providers/SearchProvider'
import Web from 'components/layout/Web'
import DefinitionsModal from 'components/modals/DefinitionsModal'
import Home from 'views/Home'

const queryClient = new QueryClient()

function App() {
  return (
    <Router>
      <QueryParamProvider adapter={ReactRouter5Adapter}>
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
                  <DefinitionsModal />
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
