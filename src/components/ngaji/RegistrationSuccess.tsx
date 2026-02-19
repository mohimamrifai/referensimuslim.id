import { RegistrationSuccessProps } from './types';

export default function RegistrationSuccess({ message }: RegistrationSuccessProps) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
      <h3 className="text-xl font-semibold text-green-800 mb-2">Pendaftaran Berhasil!</h3>
      <p className="text-green-700">{message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        Daftar Lagi
      </button>
    </div>
  );
}
