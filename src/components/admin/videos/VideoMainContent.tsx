import RichTextEditor from '../ui/RichTextEditor';
import { Card, CardContent } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { VideoFormData } from './types';

interface VideoMainContentProps {
  formData: VideoFormData;
  setFormData: (data: VideoFormData) => void;
}

export default function VideoMainContent({ formData, setFormData }: VideoMainContentProps) {
  return (
    <div className="lg:col-span-2 space-y-6">
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Judul Video</label>
              <Input
                required
                placeholder="Masukkan judul video..."
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
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Excerpt (Ringkasan)</label>
              <Textarea
                rows={3}
                placeholder="Ringkasan singkat video..."
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
        </CardContent>
      </Card>
    </div>
  );
}
