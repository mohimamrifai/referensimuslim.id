import RichTextEditor from '../ui/RichTextEditor';
import { PodcastFormData } from './types';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface PodcastMainContentProps {
  formData: PodcastFormData;
  setFormData: (data: PodcastFormData) => void;
}

export default function PodcastMainContent({ formData, setFormData }: PodcastMainContentProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Podcast</label>
              <Input
                required
                placeholder="Masukkan judul podcast..."
                value={formData.title}
                onChange={e => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">URL Video (YouTube)</label>
              <Input
                type="url"
                required
                placeholder="https://youtube.com/watch?v=..."
                value={formData.videoUrl}
                onChange={e => setFormData({ ...formData, videoUrl: e.target.value })}
              />
              <p className="text-xs text-gray-500 mt-1">Masukkan URL YouTube untuk podcast ini.</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt (Ringkasan)</label>
              <Textarea
                rows={3}
                placeholder="Ringkasan singkat podcast..."
                value={formData.excerpt}
                onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Deskripsi Podcast</label>
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
