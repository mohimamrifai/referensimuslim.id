import RichTextEditor from '../ui/RichTextEditor';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { ArticleFormData } from './types';

interface ArticleMainContentProps {
  formData: ArticleFormData;
  setFormData: (data: ArticleFormData) => void;
}

export default function ArticleMainContent({ formData, setFormData }: ArticleMainContentProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Artikel</label>
              <Input
                required
                placeholder="Masukkan judul artikel yang menarik..."
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt (Ringkasan)</label>
              <Textarea
                rows={3}
                placeholder="Ringkasan singkat artikel..."
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
        </CardContent>
      </Card>
    </div>
  );
}
