import React, { useState } from 'react';
import { ThemeProvider } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DetailsPage from './pages/DetailsPage';
import ListPage from './pages/ListPage';
import { Filter } from './types';
import objectKeyToCamelCase from './utils/normalizers';
import patientsData from './utils/patients.json';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const [patients, setPatients] = useState(objectKeyToCamelCase(patientsData));
  const [filters, setFilters] = useState<Filter>({});
  return (
    <ThemeProvider
      breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
      minBreakpoint="xxs"
    >
      <Router>
        <Routes>
          <Route
            path="/"
            element={(
              <ListPage
                patients={patients}
                filters={filters}
                updateFilters={setFilters}
              />
            )}
          />
          <Route
            path="/patients/:userId"
            element={
              <DetailsPage patients={patients} updatePatients={setPatients} />
            }
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
