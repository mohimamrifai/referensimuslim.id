import RichTextEditor from '../ui/RichTextEditor';
import { VideoFormData } from './types';

interface VideoMainContentProps {
  formData: VideoFormData;
  setFormData: (data: VideoFormData) => void;
}

export default function VideoMainContent({ formData, setFormData }: VideoMainContentProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Video</label>
            <input
              type="text"
              required
              placeholder="Masukkan judul video..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Video (YouTube)</label>
            <input
              type="url"
              required
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
              value={formData.videoUrl}
              onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt (Ringkasan)</label>
            <textarea
              rows={3}
              placeholder="Ringkasan singkat video..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400 resize-none"
              value={formData.excerpt}
              onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi Video</label>
            <div className="min-h-100">
              <RichTextEditor 
                content={formData.content} 
                onChange={(content) => setFormData({ ...formData, content })} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
