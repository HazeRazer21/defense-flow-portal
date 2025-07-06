
import VideoCard from './VideoCard';

interface Video {
  id: number;
  title: string;
  duration: string;
  difficulty: string;
  thumbnail: string;
  isPremium: boolean;
}

interface VideoCategoryProps {
  category: {
    id: number;
    title: string;
    videos: Video[];
  };
  subscriptionData: any;
  onVideoClick: (videoId: number, isPremium: boolean) => void;
}

const VideoCategory = ({ category, subscriptionData, onVideoClick }: VideoCategoryProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-3xl font-bold text-white mb-6">
        {category.title}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {category.videos.map((video) => {
          const canWatch = !video.isPremium || subscriptionData?.subscribed;
          
          return (
            <VideoCard
              key={video.id}
              video={video}
              canWatch={canWatch}
              onVideoClick={onVideoClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default VideoCategory;
