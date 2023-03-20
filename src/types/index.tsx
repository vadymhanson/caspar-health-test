export type Patient = {
  patientId: number;
  firstName: string;
  lastName: string;
  email: string;
  gender: string;
  age: number;
  avatar: string;
};

export interface Filter {
  gender?: string;
  age?: string;
  sorted?: boolean;
}
