import React, { useContext } from 'react'
import styled from 'styled-components'

import ModalContext from 'utils/ModalContext'
import Modal from 'components/base/Modal'
import MagicLink from 'components/base/MagicLink'

const Title = styled.h2``
const Text = styled.p``
export default function Occupancy() {
  const { occupancy: open, setOccupancy: setOpen } = useContext(ModalContext)
  return (
    <Modal open={open} setOpen={setOpen}>
      <Title>Taux de remplissage des véhicules</Title>
      <Text>
        L'impact de chaque véhicule est donné "par personne", et non pas pour
        l'ensemble du véhicule.
      </Text>
      <Text>
        Les taux de remplissage utilisés dans Mon Impact Transport sont ceux
        retenus dans la{' '}
        <MagicLink to='https://bilans-ges.ademe.fr/documentation/UPLOAD_DOC_FR/index.htm?transport_de_personnes.htm'>
          Base Carbone de l'ADEME
        </MagicLink>
        , sauf pour les voitures (thermiques et électriques) pour lesquelles
        nous ne comptons qu'une seule personne dans le véhicule. Il est possible
        de moduler le nombre de personnes par voiture avec l'option "Afficher le
        covoiturage".
      </Text>
    </Modal>
  )
}
