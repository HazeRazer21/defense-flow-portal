
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

const VideoForm = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: '',
    category: '',
    difficulty: 'Beginner',
    description: '',
    duration: '',
    thumbnail_url: '',
    video_url: '',
    is_premium: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('videos')
        .insert([
          {
            title: newVideo.title,
            category: newVideo.category,
            difficulty: newVideo.difficulty,
            description: newVideo.description,
            duration: newVideo.duration,
            thumbnail_url: newVideo.thumbnail_url || null,
            video_url: newVideo.video_url || null,
            is_premium: newVideo.is_premium,
            created_by: user?.id
          }
        ]);

      if (error) {
        throw error;
      }

      toast({
        title: "Video Berhasil Diupload",
        description: `Video "${newVideo.title}" telah ditambahkan`,
      });
      
      // Reset form
      setNewVideo({
        title: '',
        category: '',
        difficulty: 'Beginner',
        description: '',
        duration: '',
        thumbnail_url: '',
        video_url: '',
        is_premium: false
      });
    } catch (error) {
      console.error('Error creating video:', error);
      toast({
        title: "Error",
        description: "Gagal mengupload video. Silakan coba lagi.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="bg-martial-gray border-martial-gray">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Upload size={20} />
          Upload Video Baru
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Judul Video</Label>
              <Input
                value={newVideo.title}
                onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                className="bg-martial-dark border-martial-gray text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Kategori</Label>
              <Input
                value={newVideo.category}
                onChange={(e) => setNewVideo({...newVideo, category: e.target.value})}
                className="bg-martial-dark border-martial-gray text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Tingkat Kesulitan</Label>
              <select
                value={newVideo.difficulty}
                onChange={(e) => setNewVideo({...newVideo, difficulty: e.target.value})}
                className="w-full h-10 px-3 bg-martial-dark border border-martial-gray rounded-md text-white"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">Durasi</Label>
              <Input
                value={newVideo.duration}
                onChange={(e) => setNewVideo({...newVideo, duration: e.target.value})}
                placeholder="contoh: 12:45"
                className="bg-martial-dark border-martial-gray text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">URL Thumbnail</Label>
              <Input
                value={newVideo.thumbnail_url}
                onChange={(e) => setNewVideo({...newVideo, thumbnail_url: e.target.value})}
                placeholder="https://example.com/thumbnail.jpg"
                className="bg-martial-dark border-martial-gray text-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-gray-300">URL Video</Label>
              <Input
                value={newVideo.video_url}
                onChange={(e) => setNewVideo({...newVideo, video_url: e.target.value})}
                placeholder="https://example.com/video.mp4"
                className="bg-martial-dark border-martial-gray text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Deskripsi</Label>
            <Textarea
              value={newVideo.description}
              onChange={(e) => setNewVideo({...newVideo, description: e.target.value})}
              className="bg-martial-dark border-martial-gray text-white"
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="premium"
              checked={newVideo.is_premium}
              onChange={(e) => setNewVideo({...newVideo, is_premium: e.target.checked})}
              className="w-4 h-4"
            />
            <Label htmlFor="premium" className="text-gray-300">Konten Premium</Label>
          </div>

          <Button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Mengupload...' : 'Upload Video'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VideoForm;
