import React, { useState } from 'react'
import ModalContext from 'utils/ModalContext'

export default function ModalProvider(props) {
  const [definitions, setDefinitions] = useState(false)

  return (
    <ModalContext.Provider value={{ definitions, setDefinitions }}>
      {props.children}
    </ModalContext.Provider>
  )
}
