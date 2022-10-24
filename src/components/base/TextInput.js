import React from 'react'
import styled from 'styled-components'
import { isNil } from '../../utils/global';

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
`
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: ${(props) => props.theme.colors[props.error ? 'error' : 'text']};
`
const InputWrapper = styled.div`
  display: flex;
`
const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  color: ${(props) => props.theme.colors.text};
  background-color: ${(props) => props.theme.colors.background};
  border: 2px solid ${(props) => props.theme.colors.textLight};
  border-radius: 0.5rem;
  transition: box-shadow 300ms ease-out;

  &:focus {
    outline: none;
    box-shadow: 0 -0 0px 1px ${(props) => props.theme.colors.textLight};
  }
`
const Unit = styled.div`
  padding: 0.5rem;
  text-align: start;
  min-width: 55px;
`

const resolveValue = (value, defaultValue, type) => {
  if (!isNil(value)) {
    return value;
  }
  return defaultValue ?? (
    typeof type === 'number' ? 0 : (
      typeof type === 'boolean' ? false : '')
  )
};

const handleFocus = event => event.currentTarget.select()

export default function TextInput(props) {
  return (
    <Wrapper className={props.className}>
      {props.label && (
        <Label htmlFor={props.name} error={props.error}>
          {props.label}
        </Label>
      )}
      <InputWrapper>
        <Input
          type={props.type || 'text'}
          id={props.name}
          name={props.name}
          value={resolveValue(props.value, props.defaultValue, props.type)}
          placeholder={props.placeholder}
          error={props.error}
          onChange={(e) => {
            props.onChange({ value: e.currentTarget.value, name: props.name })
          }}
          min={props.min}
          max={props.max}
          disabled={props.disabled}
          onFocus={handleFocus}
        />
        {props.unit && <Unit>{props.unit}</Unit>}
      </InputWrapper>
    </Wrapper>
  )
}
