import RichTextEditor from '../ui/RichTextEditor';
import { ArticleFormData } from './types';

interface ArticleMainContentProps {
  formData: ArticleFormData;
  setFormData: (data: ArticleFormData) => void;
}

export default function ArticleMainContent({ formData, setFormData }: ArticleMainContentProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Artikel</label>
            <input
              type="text"
              required
              placeholder="Masukkan judul artikel yang menarik..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt (Ringkasan)</label>
            <textarea
              rows={3}
              placeholder="Ringkasan singkat artikel..."
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all outline-none text-gray-900 placeholder:text-gray-400 resize-none"
              value={formData.excerpt}
              onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Konten Artikel</label>
            <div className="min-h-[400px]">
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
