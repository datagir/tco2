import React, { useState } from 'react'

import UXContext from 'utils/UXContext'
import usePageView from 'hooks/usePageView'

export default function UXProvider(props) {
  usePageView('Verdir ma Flotte')

  const [embedOpen, setEmbedOpen] = useState(false)
  const [shareOpen, setShareOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  const [typeShare, setTypeShare] = useState('simulator')

  return (
    <UXContext.Provider
      value={{
        embedOpen,
        setEmbedOpen: (value) => {
          if (value) {
            setShareOpen(false)
            setContactOpen(false)
            setTypeShare('simulator')
          }
          setEmbedOpen(value)
        },
        shareOpen,
        setShareOpen: (value) => {
          if (value) {
            setEmbedOpen(false)
            setContactOpen(false)
            setTypeShare('simulator')
          }
          setShareOpen(value)
        },
        contactOpen,
        setContactOpen: (value) => {
          if (value) {
            setShareOpen(false)
            setEmbedOpen(false)
            setTypeShare('simulator')
          }
          setContactOpen(value)
        },
        typeShare,
        setTypeShare,
      }}
    >
      {props.children}
    </UXContext.Provider>
  )
}
