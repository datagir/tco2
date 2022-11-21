import styled from 'styled-components';
import React from 'react';

const Container = styled.button`
  font-size: 0.875rem;
  color: ${(props) => props.theme.colors.main};
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  svg {
    margin-bottom: 0.125rem;
    margin-left: 0.25rem;
    transform: rotate(${(props) => (props.open ? 180 : 0)}deg);
    transition: transform 200ms ease-out;

    path {
      fill: ${(props) => props.theme.colors.main};
    }
  }

  ${(props) => props.theme.mq.small} {
    display: none;
  }
`

export default function ToggleButton({ open, onToggle, title }) {

  return (
    <Container
      onClick={() => onToggle(open => !open)}
      open={open}
    >
      {title}
      <svg width='10' height='6' viewBox='0 0 10 6' fill='none'>
        <path d='M4.99997 5.85012C4.82075 5.85012 4.64155 5.78169 4.50491 5.64512L0.205141 1.3453C-0.0683804 1.07178 -0.0683804 0.628311 0.205141 0.3549C0.478552 0.0814886 0.921932 0.0814886 1.19548 0.3549L4.99997 4.15961L8.80449 0.355032C9.07801 0.0816214 9.52134 0.0816214 9.79473 0.355032C10.0684 0.628443 10.0684 1.07191 9.79473 1.34543L5.49503 5.64525C5.35832 5.78184 5.17912 5.85012 4.99997 5.85012Z' />
      </svg>
    </Container>
  )
}
