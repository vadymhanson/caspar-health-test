import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  Container,
  Form,
  InputGroup,
  ListGroup,
  Stack,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import { Filter, Patient } from '../types';
import sortPatientsByName from '../utils/sort';

type Props = {
  patients: Patient[];
  filters: Filter;
  updateFilters: (value: Filter) => void;
};

const ListPage: React.FC<Props> = (props) => {
  const { patients, filters, updateFilters } = props;
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);

  const handleSearch = useCallback(() => {
    let filtered = patients.filter(
      (patient: Patient) => patient.firstName.toLowerCase().includes(searchQuery.toLowerCase())
        || patient.lastName.toLowerCase().includes(searchQuery.toLowerCase())
        || patient.patientId.toString().includes(searchQuery.toLowerCase())
        || patient.email.toLowerCase().includes(searchQuery.toLowerCase()),
    );
    if (filters.gender) {
      filtered = filtered.filter(
        (patient: Patient) => patient.gender === filters.gender,
      );
    }
    if (filters.age) {
      const ageRange = filters.age.split(' - ');
      if (ageRange.length === 2) {
        const minAge = parseInt(ageRange[0], 10);
        const maxAge = parseInt(ageRange[1], 10);
        filtered = filtered.filter(
          (patient: Patient) => patient.age >= minAge && patient.age <= maxAge,
        );
      } else if (ageRange[0] === '> 45') {
        filtered = filtered.filter((patient: Patient) => patient.age > 45);
      }
    }

    if (filters.sorted) filtered = sortPatientsByName(filtered);

    setFilteredPatients(filtered);
  }, [patients, searchQuery, filters]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [handleSearch, searchQuery]);

  const handleFilter = (name: string, value: string | boolean | undefined) => {
    const newFilters = { ...filters, [name]: value };
    updateFilters(newFilters);
  };

  const handleClearFilter = () => {
    updateFilters({});
  };

  const handlePatientClick = (patient: Patient) => {
    navigate(`/patients/${patient.patientId}`, {
      state: { patient },
    });
  };

  return (
    <Container>
      <h1 className="text-center">List Page</h1>

      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
        <Form.Control
          id="search-query"
          placeholder="Type your search query"
          aria-label="search-query"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </InputGroup>
      <Stack gap={3}>
        <Stack direction="horizontal" gap={3} className="mx-auto">
          <Form.Group>
            <Form.Label htmlFor="sex-filter">Sex:</Form.Label>
            <Form.Select
              id="sex-filter"
              value={filters.gender || ''}
              onChange={(e) => {
                handleFilter('gender', e.target.value);
              }}
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="age-filter">Age:</Form.Label>
            <Form.Select
              id="age-filter"
              value={filters.age || ''}
              onChange={(e) => {
                handleFilter('age', e.target.value);
              }}
            >
              <option value="">All</option>
              <option value="18 - 30">18 - 30</option>
              <option value="31 - 45">31 - 45</option>
              <option value="> 45">&gt; 45</option>
            </Form.Select>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="age-filter">Sort:</Form.Label>
            <Button
              className="d-block"
              onClick={() => {
                handleFilter('sorted', true);
              }}
            >
              Alphabetical sort
            </Button>
          </Form.Group>
        </Stack>
        <div className="d-grid gap-2 col-2 mx-auto">
          {filters.gender || filters.age ? (
            <Button
              className="d-grid gap-2 d-md-block"
              onClick={handleClearFilter}
            >
              Clear Filter
            </Button>
          ) : null}
        </div>

        {filteredPatients.length === 0 && <div>No results found</div>}
        <ListGroup>
          {filteredPatients.map((patient) => (
            <ListGroup.Item
              key={patient.patientId}
              onClick={() => {
                handlePatientClick(patient);
              }}
            >
              {patient.patientId}
              {' '}
              -
              {patient.firstName}
              {' '}
              {patient.lastName}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Stack>
    </Container>
  );
};

export default ListPage;
