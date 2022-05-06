import React, { useState } from 'react'

import UXContext from 'utils/UXContext'
import usePageView from 'hooks/usePageView'

export default function UXProvider(props) {
  usePageView('Verdir ma Flotte')

  const [embedOpen, setEmbedOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  const [typeShare, setTypeShare] = useState('simulator')
  const [url, setUrl] = useState('')

  return (
    <UXContext.Provider
      value={{
        embedOpen,
        setEmbedOpen: (value) => {
          if (value) {
            window._paq.push(['trackEvent', 'panel', 'embed', 'open'])

            setShareOpen(false)
            setContactOpen(false)
            setTypeShare('simulator')
          }
          setEmbedOpen(value)
        },
        shareOpen,
        setShareOpen: (value) => {
          if (value) {
            window._paq.push(['trackEvent', 'panel', 'share', 'open'])

            setEmbedOpen(false)
            setContactOpen(false)
            setTypeShare('simulator')
          }
          setShareOpen(value)
        },
        contactOpen,
        setContactOpen: (value) => {
          window._paq.push(['trackEvent', 'panel', 'contact', 'open'])
          if (value) {
            setShareOpen(false)
            setEmbedOpen(false)
            setTypeShare('simulator')
          }
          setContactOpen(value)
        },
        typeShare,
        url,
        setTypeShare,
      }}
    >
      {props.children}
    </UXContext.Provider>
  )
}
