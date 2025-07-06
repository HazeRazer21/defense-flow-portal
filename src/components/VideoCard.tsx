
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Play, Lock, Clock, Star } from 'lucide-react';

interface VideoCardProps {
  video: {
    id: number;
    title: string;
    duration: string;
    difficulty: string;
    thumbnail: string;
    isPremium: boolean;
  };
  canWatch: boolean;
  onVideoClick: (videoId: number, isPremium: boolean) => void;
}

const VideoCard = ({ video, canWatch, onVideoClick }: VideoCardProps) => {
  return (
    <Card className="bg-martial-gray border-martial-gray card-hover overflow-hidden">
      <div className="relative">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <button
            onClick={() => onVideoClick(video.id, video.isPremium)}
            className="w-16 h-16 bg-martial-purple/80 rounded-full flex items-center justify-center hover:bg-martial-purple transition-colors"
          >
            {video.isPremium && !canWatch ? (
              <Lock className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white ml-1" />
            )}
          </button>
        </div>
        
        <div className="absolute top-4 right-4 flex gap-2">
          {video.isPremium && (
            <Badge className="bg-martial-purple text-white">
              <Star size={12} className="mr-1" />
              Premium
            </Badge>
          )}
        </div>
        
        <div className="absolute bottom-4 right-4">
          <Badge variant="secondary" className="bg-black/60 text-white">
            <Clock size={12} className="mr-1" />
            {video.duration}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-lg text-white">
          {video.title}
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <Badge 
          variant="outline" 
          className={`${
            video.difficulty === 'Beginner' ? 'border-green-500 text-green-400' :
            video.difficulty === 'Intermediate' ? 'border-yellow-500 text-yellow-400' :
            'border-red-500 text-red-400'
          }`}
        >
          {video.difficulty}
        </Badge>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
