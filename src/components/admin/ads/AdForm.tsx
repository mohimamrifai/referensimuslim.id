"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
import Link from "next/link";
import { createAdvertisement, updateAdvertisement } from "@/app/actions/ads";
import ImageUploader from "@/components/admin/ui/ImageUploader";
import { Advertisement } from "@prisma/client";

interface AdFormProps {
  initialData?: Advertisement | null;
  isEdit?: boolean;
}

export default function AdForm({ initialData, isEdit = false }: AdFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    imageUrl: initialData?.imageUrl || "",
    targetUrl: initialData?.targetUrl || "",
    position: initialData?.position || "HOME_TOP",
    isActive: initialData?.isActive ?? true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("imageUrl", formData.imageUrl);
      data.append("targetUrl", formData.targetUrl);
      data.append("position", formData.position);
      data.append("isActive", String(formData.isActive));

      let result;
      if (isEdit && initialData?.id) {
        result = await updateAdvertisement(initialData.id, data);
      } else {
        result = await createAdvertisement(data);
      }

      if (result && !result.success) {
        throw new Error(result.error);
      }

      router.push("/dashboard/ads");
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan iklan");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/dashboard/ads"
          className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600 transition-colors mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Kembali ke Daftar Iklan
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Edit Iklan" : "Buat Iklan Baru"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-lg">
                {error}
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Judul Iklan <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="Contoh: Banner Promo Ramadhan"
              />
            </div>

            {/* Position */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Posisi Iklan <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              >
                <option value="HOME_TOP">Home - Atas (Bawah Banner Utama)</option>
                <option value="HOME_MIDDLE">Home - Tengah (Bawah Artikel Terbaru)</option>
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Ukuran yang disarankan: 970x250 pixels
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gambar Banner <span className="text-red-500">*</span>
              </label>
              <ImageUploader
                value={formData.imageUrl}
                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                folder="ads"
                aspectRatio="banner"
              />
            </div>

            {/* Target URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Target URL
              </label>
              <input
                type="url"
                value={formData.targetUrl}
                onChange={(e) => setFormData({ ...formData, targetUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                placeholder="https://example.com/promo"
              />
            </div>

            {/* Status */}
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
              />
              <label htmlFor="isActive" className="text-sm font-medium text-gray-700 cursor-pointer select-none">
                Aktifkan Iklan ini (Tampilkan di website)
              </label>
            </div>
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Link
              href="/dashboard/ads"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Batal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Simpan Iklan
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
