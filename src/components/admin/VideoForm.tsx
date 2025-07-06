
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const VideoForm = () => {
  const { toast } = useToast();
  const [newVideo, setNewVideo] = useState({
    title: '',
    category: '',
    difficulty: 'Beginner',
    description: '',
    isPremium: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new video:', newVideo);
    
    // Simulate video upload
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
      isPremium: false
    });
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
              <Label className="text-gray-300">File Video</Label>
              <Input
                type="file"
                accept="video/*"
                className="bg-martial-dark border-martial-gray text-white"
                required
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
              checked={newVideo.isPremium}
              onChange={(e) => setNewVideo({...newVideo, isPremium: e.target.checked})}
              className="w-4 h-4"
            />
            <Label htmlFor="premium" className="text-gray-300">Konten Premium</Label>
          </div>

          <Button type="submit" className="btn-primary">
            Upload Video
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default VideoForm;
