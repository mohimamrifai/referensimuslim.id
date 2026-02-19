import { Loader2 } from 'lucide-react';
import { EDUCATION_OPTIONS, OCCUPATION_OPTIONS, RegistrationFormFieldsProps } from './types';

export default function RegistrationFormFields({
  state,
  selectedEducation,
  setSelectedEducation,
  selectedOccupation,
  setSelectedOccupation,
  customEducation,
  setCustomEducation,
  customOccupation,
  setCustomOccupation,
  isPending
}: RegistrationFormFieldsProps) {
  return (
    <div className="space-y-4">
      {/* NAMA LENGKAP */}
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
          NAMA LENGKAP <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        {state?.errors?.fullName && (
          <p className="text-red-500 text-sm mt-1">{state.errors.fullName[0]}</p>
        )}
      </div>

      {/* JENIS KELAMIN */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          JENIS KELAMIN <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="radio" name="gender" value="Laki-laki" required className="text-indigo-600 focus:ring-indigo-500" />
            <span>Laki-laki</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="radio" name="gender" value="Perempuan" required className="text-indigo-600 focus:ring-indigo-500" />
            <span>Perempuan</span>
          </label>
        </div>
        {state?.errors?.gender && (
          <p className="text-red-500 text-sm mt-1">{state.errors.gender[0]}</p>
        )}
      </div>

      {/* TEMPAT LAHIR */}
      <div>
        <label htmlFor="birthPlace" className="block text-sm font-medium text-gray-700 mb-1">
          TEMPAT LAHIR <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="birthPlace"
          name="birthPlace"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* TANGGAL LAHIR */}
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">
          TANGGAL LAHIR <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* USIA SAAT INI */}
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
          USIA SAAT INI <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          id="age"
          name="age"
          min="1"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* DOMISILI SAAT INI */}
      <div>
        <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
          DOMISILI SAAT INI (Tempat Tinggal saat ini) <span className="text-red-500">*</span>
        </label>
        <textarea
          id="address"
          name="address"
          rows={2}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* NO WA AKTIF */}
      <div>
        <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
          NO WA AKTIF <span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="whatsapp"
          name="whatsapp"
          required
          placeholder="08xxxxxxxxxx"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* PENDIDIKAN TERAKHIR */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          PENDIDIKAN TERAKHIR <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {EDUCATION_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="education_select"
                value={option}
                checked={selectedEducation === option}
                onChange={(e) => setSelectedEducation(e.target.value)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>{option}</span>
            </label>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="education_select"
              value="Yang lain"
              checked={selectedEducation === 'Yang lain'}
              onChange={(e) => setSelectedEducation(e.target.value)}
              className="text-indigo-600 focus:ring-indigo-500"
            />
            <span>Yang lain:</span>
            <input
              type="text"
              disabled={selectedEducation !== 'Yang lain'}
              value={customEducation}
              onChange={(e) => setCustomEducation(e.target.value)}
              className="ml-2 flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* PEKERJAAN / AKTIVITAS SAAT INI */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          PEKERJAAN / AKTIVITAS SAAT INI <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {OCCUPATION_OPTIONS.map((option) => (
            <label key={option} className="flex items-center gap-2">
              <input
                type="radio"
                name="occupation_select"
                value={option}
                checked={selectedOccupation === option}
                onChange={(e) => setSelectedOccupation(e.target.value)}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span>{option}</span>
            </label>
          ))}
          <div className="flex items-center gap-2">
            <input
              type="radio"
              name="occupation_select"
              value="Yang lain"
              checked={selectedOccupation === 'Yang lain'}
              onChange={(e) => setSelectedOccupation(e.target.value)}
              className="text-indigo-600 focus:ring-indigo-500"
            />
            <span>Yang lain:</span>
            <input
              type="text"
              disabled={selectedOccupation !== 'Yang lain'}
              value={customOccupation}
              onChange={(e) => setCustomOccupation(e.target.value)}
              className="ml-2 flex-1 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
            />
          </div>
        </div>
      </div>

      {/* MOTIVASI IKUT MENGAJI */}
      <div>
        <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
          MOTIVASI IKUT MENGAJI <span className="text-red-500">*</span>
        </label>
        <p className="text-xs text-gray-500 mb-2">Dapat diuraikan harapan dan motivasi ikut mengaji di Komunitas Tarbiyah</p>
        <textarea
          id="motivation"
          name="motivation"
          rows={4}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
            Mengirim...
          </>
        ) : (
          'Kirim Pendaftaran'
        )}
      </button>

      {state?.message && !state.success && (
        <p className="text-red-500 text-sm text-center mt-2">{state.message}</p>
      )}
    </div>
  );
}
