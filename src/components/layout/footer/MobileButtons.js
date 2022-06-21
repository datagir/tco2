import React, { useContext } from 'react'
import styled from 'styled-components'

import UXContext from 'utils/UXContext'
import EmbedWrapper from 'components/wrappers/EmbedWrapper'
import ContactWrapper from 'components/wrappers/ContactWrapper'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  display: none;
  justify-content: space-around;
  width: 100%;
  max-width: 37rem;
  margin: 0 auto ${(props) => (props.iframe ? 0.5 : 2)}rem;
  padding: ${(props) => (props.iframe ? '1rem 0 0.5rem' : 0)};
  background-color: ${(props) => props.theme.colors.footer};
  border-radius: 1rem;

  ${(props) => props.theme.mq.medium} {
    display: flex;
  }
`
const Button = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 0;
  color: ${(props) => props.theme.colors.second};
  background: none;
  border: none;
`
const StyledLink = styled(MagicLink)`
  display: flex;
  flex-direction: column;
  align-items: center;

  color: ${(props) => props.theme.colors.second};
  text-decoration: none;
`
const Icon = styled.div`
  position: relative;
  width: ${(props) => (props.iframe ? 2 : 3)}rem;
  height: ${(props) => (props.iframe ? 2 : 3)}rem;
  margin-bottom: ${(props) => (props.iframe ? 0.2 : 0.4)}rem;
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 1.5rem;

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    height: auto;

    path {
      fill: ${(props) => props.theme.colors.background};
    }
  }
`
const Mail = styled.svg`
  width: ${(props) => (props.iframe ? 1.25 : 1.5)}rem;
`
const Embed = styled.svg`
  width: ${(props) => (props.iframe ? 1.5 : 1.75)}rem;
`
const Eye = styled.svg`
  width: ${(props) => (props.iframe ? 1.25 : 1.5)}rem;
`
const Label = styled.div`
  font-size: ${(props) => (props.iframe ? 0.75 : 1)}rem;
  text-align: center;
`
export default function MobileButtons(props) {
  const { setEmbedOpen, setContactOpen } = useContext(UXContext)
  return (
    <>
      <Wrapper iframe={props.iframe}>
        <Button onClick={() => setEmbedOpen(true)}>
          <Icon iframe={props.iframe}>
            <Embed
              iframe={props.iframe}
              x='0px'
              y='0px'
              width='94.504px'
              height='94.504px'
              viewBox='0 0 94.504 94.504'
            >
              <path d='M93.918,45.833L69.799,21.714c-0.75-0.75-2.077-0.75-2.827,0l-5.229,5.229c-0.781,0.781-0.781,2.047,0,2.828    l17.477,17.475L61.744,64.724c-0.781,0.781-0.781,2.047,0,2.828l5.229,5.229c0.375,0.375,0.884,0.587,1.414,0.587    c0.529,0,1.039-0.212,1.414-0.587l24.117-24.118C94.699,47.881,94.699,46.614,93.918,45.833z' />
              <path d='M32.759,64.724L15.285,47.248l17.477-17.475c0.375-0.375,0.586-0.883,0.586-1.414c0-0.53-0.21-1.039-0.586-1.414    l-5.229-5.229c-0.375-0.375-0.884-0.586-1.414-0.586c-0.53,0-1.039,0.211-1.414,0.586L0.585,45.833    c-0.781,0.781-0.781,2.047,0,2.829L24.704,72.78c0.375,0.375,0.884,0.587,1.414,0.587c0.53,0,1.039-0.212,1.414-0.587l5.229-5.229    C33.542,66.771,33.542,65.505,32.759,64.724z' />
              <path d='M60.967,13.6c-0.254-0.466-0.682-0.812-1.19-0.962l-4.239-1.251c-1.058-0.314-2.172,0.293-2.484,1.352L33.375,79.382    c-0.15,0.509-0.092,1.056,0.161,1.521c0.253,0.467,0.682,0.812,1.19,0.963l4.239,1.251c0.189,0.056,0.38,0.083,0.567,0.083    c0.863,0,1.66-0.564,1.917-1.435l19.679-66.644C61.278,14.612,61.221,14.065,60.967,13.6z' />
            </Embed>
          </Icon>
          <Label iframe={props.iframe}>Intégrer</Label>
        </Button>
        <Button onClick={() => setContactOpen(true)}>
          <Icon iframe={props.iframe}>
            <Mail iframe={props.iframe} x='0px' y='0px' viewBox='0 0 512 512'>
              <path
                d='M467,61H45C20.218,61,0,81.196,0,106v300c0,24.72,20.128,45,45,45h422c24.72,0,45-20.128,45-45V106
			C512,81.28,491.872,61,467,61z M460.786,91L256.954,294.833L51.359,91H460.786z M30,399.788V112.069l144.479,143.24L30,399.788z
			 M51.213,421l144.57-144.57l50.657,50.222c5.864,5.814,15.327,5.795,21.167-0.046L317,277.213L460.787,421H51.213z M482,399.787
			L338.213,256L482,112.212V399.787z'
              />
            </Mail>
          </Icon>
          <Label iframe={props.iframe}>Contact</Label>
        </Button>
        {props.iframe && (
          <StyledLink to={'https://monimpacttransport.fr'}>
            <Icon iframe={props.iframe}>
              <Eye
                iframe={props.iframe}
                x='0px'
                y='0px'
                viewBox='0 0 469.333 469.333'
              >
                <path d='M234.667,170.667c-35.307,0-64,28.693-64,64s28.693,64,64,64s64-28.693,64-64S269.973,170.667,234.667,170.667z' />
                <path d='M234.667,74.667C128,74.667,36.907,141.013,0,234.667c36.907,93.653,128,160,234.667,160     c106.773,0,197.76-66.347,234.667-160C432.427,141.013,341.44,74.667,234.667,74.667z M234.667,341.333     c-58.88,0-106.667-47.787-106.667-106.667S175.787,128,234.667,128s106.667,47.787,106.667,106.667     S293.547,341.333,234.667,341.333z' />
              </Eye>
            </Icon>
            <Label iframe={props.iframe}>
              Version
              <br />
              détaillée
            </Label>
          </StyledLink>
        )}
      </Wrapper>
      <EmbedWrapper small />
      <ContactWrapper small />
    </>
  )
}
