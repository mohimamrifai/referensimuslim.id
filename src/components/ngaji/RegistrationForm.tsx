'use client';

import { useActionState, useState } from 'react';
import { registerNgaji, type RegistrationState } from '@/app/actions/ngaji';
import RegistrationSuccess from './RegistrationSuccess';
import RegistrationFormFields from './RegistrationFormFields';

export default function RegistrationForm() {
  const [state, formAction, isPending] = useActionState(registerNgaji, null as RegistrationState | null);
  const [customEducation, setCustomEducation] = useState('');
  const [customOccupation, setCustomOccupation] = useState('');
  const [selectedEducation, setSelectedEducation] = useState('');
  const [selectedOccupation, setSelectedOccupation] = useState('');

  const handleSubmit = (formData: FormData) => {
    // Handle custom fields
    if (selectedEducation === 'Yang lain') {
      formData.set('education', customEducation);
    } else {
      formData.set('education', selectedEducation);
    }

    if (selectedOccupation === 'Yang lain') {
      formData.set('occupation', customOccupation);
    } else {
      formData.set('occupation', selectedOccupation);
    }

    formAction(formData);
  };

  if (state?.success) {
    return <RegistrationSuccess message={state.message} />;
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      <RegistrationFormFields 
        state={state}
        selectedEducation={selectedEducation}
        setSelectedEducation={setSelectedEducation}
        selectedOccupation={selectedOccupation}
        setSelectedOccupation={setSelectedOccupation}
        customEducation={customEducation}
        setCustomEducation={setCustomEducation}
        customOccupation={customOccupation}
        setCustomOccupation={setCustomOccupation}
        isPending={isPending}
      />
    </form>
  );
}
