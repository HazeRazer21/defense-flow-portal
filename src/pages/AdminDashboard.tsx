
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminStats from '@/components/admin/AdminStats';
import ClassForm from '@/components/admin/ClassForm';
import VideoForm from '@/components/admin/VideoForm';
import RegistrationsList from '@/components/admin/RegistrationsList';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-martial-dark p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Kelola akademi bela diri Anda</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-martial-gray border-martial-gray">
            <TabsTrigger value="overview" className="text-gray-300">Overview</TabsTrigger>
            <TabsTrigger value="classes" className="text-gray-300">Kelas</TabsTrigger>
            <TabsTrigger value="videos" className="text-gray-300">Video</TabsTrigger>
            <TabsTrigger value="registrations" className="text-gray-300">Pendaftaran</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <AdminStats />
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <ClassForm />
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <VideoForm />
          </TabsContent>

          <TabsContent value="registrations" className="space-y-6">
            <RegistrationsList />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
