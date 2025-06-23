
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Users, 
  Video, 
  Plus, 
  Edit, 
  Trash2, 
  Upload,
  DollarSign,
  CheckCircle
} from 'lucide-react';

const AdminDashboard = () => {
  const [newClass, setNewClass] = useState({
    name: '',
    instructor: '',
    date: '',
    time: '',
    location: '',
    capacity: '',
    price: '',
    level: 'Beginner',
    description: ''
  });

  const [newVideo, setNewVideo] = useState({
    title: '',
    category: '',
    difficulty: 'Beginner',
    description: '',
    isPremium: false
  });

  const registrations = [
    {
      id: 1,
      studentName: 'John Doe',
      email: 'john@example.com',
      className: 'Basic Self Defense',
      date: '2024-01-15',
      paymentStatus: 'Paid',
      amount: 50
    },
    {
      id: 2,
      studentName: 'Jane Smith',
      email: 'jane@example.com',
      className: 'Women\'s Self Defense',
      date: '2024-01-20',
      paymentStatus: 'Pending',
      amount: 55
    }
  ];

  const handleAddClass = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new class:', newClass);
    // TODO: Implement actual class creation
    setNewClass({
      name: '',
      instructor: '',
      date: '',
      time: '',
      location: '',
      capacity: '',
      price: '',
      level: 'Beginner',
      description: ''
    });
  };

  const handleAddVideo = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new video:', newVideo);
    // TODO: Implement actual video upload
    setNewVideo({
      title: '',
      category: '',
      difficulty: 'Beginner',
      description: '',
      isPremium: false
    });
  };

  const handlePaymentConfirmation = (registrationId: number) => {
    console.log('Confirming payment for registration:', registrationId);
    // TODO: Implement payment confirmation
  };

  return (
    <div className="min-h-screen bg-martial-dark p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
          <p className="text-gray-300">Manage your martial arts academy</p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-martial-gray border-martial-gray">
            <TabsTrigger value="overview" className="text-gray-300">Overview</TabsTrigger>
            <TabsTrigger value="classes" className="text-gray-300">Classes</TabsTrigger>
            <TabsTrigger value="videos" className="text-gray-300">Videos</TabsTrigger>
            <TabsTrigger value="registrations" className="text-gray-300">Registrations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-martial-gray border-martial-gray">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Total Students</p>
                      <p className="text-3xl font-bold text-white">247</p>
                    </div>
                    <Users className="w-8 h-8 text-martial-purple" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-martial-gray border-martial-gray">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Active Classes</p>
                      <p className="text-3xl font-bold text-white">12</p>
                    </div>
                    <Calendar className="w-8 h-8 text-martial-purple" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-martial-gray border-martial-gray">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Video Library</p>
                      <p className="text-3xl font-bold text-white">68</p>
                    </div>
                    <Video className="w-8 h-8 text-martial-purple" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-martial-gray border-martial-gray">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-sm">Monthly Revenue</p>
                      <p className="text-3xl font-bold text-white">$3,240</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-martial-purple" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="classes" className="space-y-6">
            <Card className="bg-martial-gray border-martial-gray">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Plus size={20} />
                  Add New Class
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddClass} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-gray-300">Class Name</Label>
                    <Input
                      value={newClass.name}
                      onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                      className="bg-martial-dark border-martial-gray text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Instructor</Label>
                    <Input
                      value={newClass.instructor}
                      onChange={(e) => setNewClass({...newClass, instructor: e.target.value})}
                      className="bg-martial-dark border-martial-gray text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Date</Label>
                    <Input
                      type="date"
                      value={newClass.date}
                      onChange={(e) => setNewClass({...newClass, date: e.target.value})}
                      className="bg-martial-dark border-martial-gray text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Time</Label>
                    <Input
                      value={newClass.time}
                      onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                      placeholder="e.g., 18:00 - 19:30"
                      className="bg-martial-dark border-martial-gray text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Location</Label>
                    <Input
                      value={newClass.location}
                      onChange={(e) => setNewClass({...newClass, location: e.target.value})}
                      className="bg-martial-dark border-martial-gray text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Capacity</Label>
                    <Input
                      type="number"
                      value={newClass.capacity}
                      onChange={(e) => setNewClass({...newClass, capacity: e.target.value})}
                      className="bg-martial-dark border-martial-gray text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Price ($)</Label>
                    <Input
                      type="number"
                      value={newClass.price}
                      onChange={(e) => setNewClass({...newClass, price: e.target.value})}
                      className="bg-martial-dark border-martial-gray text-white"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Level</Label>
                    <select
                      value={newClass.level}
                      onChange={(e) => setNewClass({...newClass, level: e.target.value})}
                      className="w-full h-10 px-3 bg-martial-dark border border-martial-gray rounded-md text-white"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                      <option value="All Levels">All Levels</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label className="text-gray-300">Description</Label>
                    <Textarea
                      value={newClass.description}
                      onChange={(e) => setNewClass({...newClass, description: e.target.value})}
                      className="bg-martial-dark border-martial-gray text-white"
                      rows={3}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <Button type="submit" className="btn-primary">
                      Create Class
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="videos" className="space-y-6">
            <Card className="bg-martial-gray border-martial-gray">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Upload size={20} />
                  Upload New Video
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddVideo} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-gray-300">Video Title</Label>
                      <Input
                        value={newVideo.title}
                        onChange={(e) => setNewVideo({...newVideo, title: e.target.value})}
                        className="bg-martial-dark border-martial-gray text-white"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Category</Label>
                      <Input
                        value={newVideo.category}
                        onChange={(e) => setNewVideo({...newVideo, category: e.target.value})}
                        className="bg-martial-dark border-martial-gray text-white"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-gray-300">Difficulty</Label>
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
                      <Label className="text-gray-300">Video File</Label>
                      <Input
                        type="file"
                        accept="video/*"
                        className="bg-martial-dark border-martial-gray text-white"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-gray-300">Description</Label>
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
                    <Label htmlFor="premium" className="text-gray-300">Premium Content</Label>
                  </div>

                  <Button type="submit" className="btn-primary">
                    Upload Video
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="registrations" className="space-y-6">
            <Card className="bg-martial-gray border-martial-gray">
              <CardHeader>
                <CardTitle className="text-white">Recent Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {registrations.map((registration) => (
                    <div key={registration.id} className="flex items-center justify-between p-4 bg-martial-dark rounded-lg">
                      <div className="flex-1">
                        <h4 className="text-white font-semibold">{registration.studentName}</h4>
                        <p className="text-gray-300 text-sm">{registration.email}</p>
                        <p className="text-gray-400 text-sm">
                          {registration.className} - {registration.date}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-white font-semibold">${registration.amount}</p>
                          <Badge 
                            variant={registration.paymentStatus === 'Paid' ? 'default' : 'secondary'}
                            className={registration.paymentStatus === 'Paid' ? 'bg-green-500' : 'bg-yellow-500'}
                          >
                            {registration.paymentStatus}
                          </Badge>
                        </div>
                        
                        {registration.paymentStatus === 'Pending' && (
                          <Button
                            size="sm"
                            onClick={() => handlePaymentConfirmation(registration.id)}
                            className="btn-primary"
                          >
                            <CheckCircle size={16} className="mr-1" />
                            Confirm
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
