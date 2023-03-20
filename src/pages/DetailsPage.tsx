import React, { useState } from 'react';
import {
  Button, Container, Image, Modal, Stack,
} from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

import { Patient } from '../types';

type Props = {
  patients: Patient[];
  updatePatients: (id: any) => void;
};

const DetailsPage: React.FC<Props> = ({ patients, updatePatients }) => {
  const navigate = useNavigate();

  const {
    state: { patient },
  } = useLocation();

  const {
    patientId, firstName, lastName, email, avatar, gender, age,
  } = patient;

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const onGoBack = () => {
    navigate('/');
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCancelDeleteClick = () => {
    setShowDeleteModal(false);
  };

  const handleConfirmDeleteClick = (id: string) => {
    setShowDeleteModal(false);

    updatePatients(
      patients.filter((el: Patient) => el.patientId !== Number(id)),
    );
    navigate('/');
  };

  return (
    <Container>
      <Stack
        gap={3}
        className="col-md-5 mx-auto d-flex align-items-center justify-content-center"
      >
        <h1>Patient Details</h1>
        <Image src={avatar} alt="" width="200px" />
        <div>
          Id:
          {patientId}
        </div>
        <div>
          First name:
          {firstName}
        </div>
        <div>
          Last name:
          {lastName}
        </div>
        <div>
          Email:
          {email}
        </div>
        <div>
          Sex:
          {gender}
        </div>
        <div>
          Age:
          {age}
        </div>
        <Stack direction="horizontal" gap={3} className="mx-auto">
          <Button onClick={onGoBack} type="button">
            Go back
          </Button>
          <Button onClick={handleDeleteClick} type="button">
            Delete
          </Button>
        </Stack>

        <Modal show={showDeleteModal} onHide={handleCancelDeleteClick}>
          <Modal.Header closeButton>
            <Modal.Title>Delete card</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete "
            {patientId}
            "?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCancelDeleteClick}>
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={() => handleConfirmDeleteClick(patientId)}
            >
              Confirm Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </Stack>
    </Container>
  );
};

export default DetailsPage;
