import { RegistrationState } from '@/app/actions/ngaji';

export interface RegistrationSuccessProps {
  message?: string;
}

export interface RegistrationFormFieldsProps {
  state: RegistrationState | null;
  selectedEducation: string;
  setSelectedEducation: (value: string) => void;
  selectedOccupation: string;
  setSelectedOccupation: (value: string) => void;
  customEducation: string;
  setCustomEducation: (value: string) => void;
  customOccupation: string;
  setCustomOccupation: (value: string) => void;
  isPending: boolean;
}

export const EDUCATION_OPTIONS = ['SD/MI', 'SMP/MTS', 'SMA/MA', 'S1/S2/S3'];
export const OCCUPATION_OPTIONS = ['PELAJAR', 'MAHASISWA', 'BEKERJA'];
