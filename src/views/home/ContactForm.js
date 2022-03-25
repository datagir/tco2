import React, { useState } from 'react'
import styled from 'styled-components'

import { TextInput, Button, Highlight, Text, Alert } from '@dataesr/react-dsfr'

import useSubscribeEmail from 'hooks/useSubscribeEmail'

const StyledHighlight = styled(Highlight)`
  max-width: 30rem;
  margin: 0 0 2rem;
  padding: 1rem 0 0 2rem;

  p {
    margin-bottom: 1rem;
  }
`
const StyledButton = styled(Button)`
  margin-bottom: 1rem;
`
export default function ContactForm() {
  const [email, setEmail] = useState('')

  const mutation = useSubscribeEmail()
  return (
    <StyledHighlight>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          mutation.mutate(email)
        }}
      >
        <Text>
          Disponible bientôt. Soyez informés en saisissant votre adresse email
          ci-dessous
        </Text>
        <TextInput
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          label='Votre email'
          name='email'
          type='email'
          required
        />
        <StyledButton submit disabled={mutation.isLoading}>
          Me tenir informé
        </StyledButton>
        {mutation.isError && (
          <Alert
            title={
              mutation?.error?.response?.data?.message ===
              'Contact already in list and/or does not exist'
                ? `Vous êtes déjà inscrit`
                : `Une erreur est survenue`
            }
            type='error'
            small
          />
        )}
        {mutation.isSuccess && (
          <Alert title='Vous êtes inscrit' type='success' small />
        )}
      </form>
    </StyledHighlight>
  )
}
