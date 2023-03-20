import { Patient } from '../types';

const sortPatientsByName = (patients: Patient[]): Patient[] => patients.sort((a, b) => a.firstName.localeCompare(b.firstName));

export default sortPatientsByName;
