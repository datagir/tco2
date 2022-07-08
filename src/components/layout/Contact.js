import React, { useState, useContext } from 'react'
import styled from 'styled-components'
import { useMutation } from 'react-query'
import axios from 'axios'

import UXContext from 'utils/UXContext'
import Panel from 'components/base/Panel'
import Button from 'components/base/Button'
import TextInput from 'components/base/TextInput'
import TextArea from 'components/base/TextArea'
import ContactPrompt from 'components/base/ContactPrompt'

const Form = styled.form`
  width: 100%;
  margin-bottom: 3rem;
`
const Title = styled.div`
  margin-bottom: 1rem;
  font-size: 2rem;
  color: ${(props) => props.theme.colors.second};
  font-weight: bold;
  line-height: 1.2;

  ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
  }
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const Alert = styled.p`
  margin-top: 1rem;
  text-align: center;
`

export default function Contact(props) {
  const { contactOpen, setContactOpen } = useContext(UXContext)

  const [user, setUser] = useState({
    nom: '',
    email: '',
    message: '',
  })

  const [empty, setEmpty] = useState(false)

  const mutation = useMutation((formData) => {
    return axios.post('/', formData)
  })

  return (
    <Panel
      small={props.small}
      open={contactOpen}
      toggleClose={() => {
        setContactOpen((prevOpen) => !prevOpen)
      }}
      index={2}
    >
      <Title>Nous contacter</Title>
      <Form
        id='contact'
        method='post'
        data-netlify='true'
        name='contact'
        onSubmit={(e) => {
          e.preventDefault()
          if (!user.nom || !user.email || !user.message) {
            mutation.reset()
            setEmpty(true)
          } else {
            setEmpty(false)
            const formData = new URLSearchParams()
            formData.append('form-name', 'contact')
            Object.keys(user).map((key) => formData.append(key, user[key]))
            mutation.mutate(formData)
          }
        }}
      >
        <TextInput
          name={'nom'}
          value={user.nom}
          error={empty && !user.nom}
          label={'Votre nom'}
          onChange={({ name, value }) =>
            setUser((prevUser) => ({ ...prevUser, [name]: value }))
          }
          autocomplete='name'
          required
        />
        <TextInput
          type='email'
          name={'email'}
          error={empty && !user.email}
          value={user.email}
          label={'Votre email'}
          onChange={({ name, value }) =>
            setUser((prevUser) => ({ ...prevUser, [name]: value }))
          }
          autocomplete='email'
        />

        <TextArea
          name={'message'}
          value={user.message}
          error={empty && !user.message}
          label={'Votre message'}
          onChange={({ name, value }) =>
            setUser((prevUser) => ({ ...prevUser, [name]: value }))
          }
        />
        <ButtonWrapper>
          <Button submit disabled={mutation.isLoading}>
            Envoyer mon message
          </Button>
        </ButtonWrapper>
        {empty && <Alert role='alert'>Merci de remplir tous les champs</Alert>}
        {mutation.isError && (
          <Alert role='alert'>
            Quelque chose n'a pas fonctionné :(
            <br />({mutation.error.message})
          </Alert>
        )}
        {mutation.isSuccess && (
          <Alert role='status'>
            Merci !<br />
            Nous avons bien reçu votre message
          </Alert>
        )}
      </Form>
      <ContactPrompt contact />
    </Panel>
  )
}
