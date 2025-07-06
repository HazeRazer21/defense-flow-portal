
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ClassForm = () => {
  const { toast } = useToast();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Adding new class:', newClass);
    
    // Simulate saving to database
    toast({
      title: "Kelas Berhasil Dibuat",
      description: `Kelas "${newClass.name}" telah ditambahkan`,
    });
    
    // Reset form
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

  return (
    <Card className="bg-martial-gray border-martial-gray">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Plus size={20} />
          Tambah Kelas Baru
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-gray-300">Nama Kelas</Label>
            <Input
              value={newClass.name}
              onChange={(e) => setNewClass({...newClass, name: e.target.value})}
              className="bg-martial-dark border-martial-gray text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Instruktur</Label>
            <Input
              value={newClass.instructor}
              onChange={(e) => setNewClass({...newClass, instructor: e.target.value})}
              className="bg-martial-dark border-martial-gray text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Tanggal</Label>
            <Input
              type="date"
              value={newClass.date}
              onChange={(e) => setNewClass({...newClass, date: e.target.value})}
              className="bg-martial-dark border-martial-gray text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Waktu</Label>
            <Input
              value={newClass.time}
              onChange={(e) => setNewClass({...newClass, time: e.target.value})}
              placeholder="contoh: 18:00 - 19:30"
              className="bg-martial-dark border-martial-gray text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Lokasi</Label>
            <Input
              value={newClass.location}
              onChange={(e) => setNewClass({...newClass, location: e.target.value})}
              className="bg-martial-dark border-martial-gray text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Kapasitas</Label>
            <Input
              type="number"
              value={newClass.capacity}
              onChange={(e) => setNewClass({...newClass, capacity: e.target.value})}
              className="bg-martial-dark border-martial-gray text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-gray-300">Harga (Rp)</Label>
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
            <Label className="text-gray-300">Deskripsi</Label>
            <Textarea
              value={newClass.description}
              onChange={(e) => setNewClass({...newClass, description: e.target.value})}
              className="bg-martial-dark border-martial-gray text-white"
              rows={3}
            />
          </div>

          <div className="md:col-span-2">
            <Button type="submit" className="btn-primary">
              Buat Kelas
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ClassForm;
