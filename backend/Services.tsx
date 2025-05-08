
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { useServiceStore } from '@/store/serviceStore';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Scissors, Syringe, Shield, Smile, Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

const Services = () => {
  const { services, addService, removeService, updateService } = useServiceStore();
  
  const [newService, setNewService] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    icon: 'Shield'
  });
  
  const [editingService, setEditingService] = useState<null | { id: string }>(null);
  
  const handleAddService = () => {
    if (!newService.name || !newService.price || !newService.duration) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    addService({
      name: newService.name,
      description: newService.description,
      price: parseFloat(newService.price),
      duration: parseInt(newService.duration),
      icon: newService.icon
    });
    
    setNewService({
      name: '',
      description: '',
      price: '',
      duration: '',
      icon: 'Shield'
    });
  };

  const handleUpdateService = (id: string) => {
    if (!newService.name || !newService.price || !newService.duration) {
      toast.error('Please fill out all required fields');
      return;
    }
    
    updateService(id, {
      name: newService.name,
      description: newService.description,
      price: parseFloat(newService.price),
      duration: parseInt(newService.duration),
      icon: newService.icon
    });
    
    setEditingService(null);
    setNewService({
      name: '',
      description: '',
      price: '',
      duration: '',
      icon: 'Shield'
    });
  };

  const startEditing = (service: typeof services[0]) => {
    setEditingService({ id: service.id });
    setNewService({
      name: service.name,
      description: service.description,
      price: service.price.toString(),
      duration: service.duration.toString(),
      icon: service.icon || 'Shield'
    });
  };

  const getServiceIcon = (icon?: string) => {
    switch (icon) {
      case 'Shield':
        return <Shield className="h-6 w-6 text-blue-400" />;
      case 'Scissors':
        return <Scissors className="h-6 w-6 text-yellow-400" />;
      case 'Syringe':
        return <Syringe className="h-6 w-6 text-red-400" />;
      case 'Smile':
        return <Smile className="h-6 w-6 text-green-400" />;
      default:
        return <Shield className="h-6 w-6 text-primary" />;
    }
  };

  return (
    <Layout title="Services">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Our Services</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingService ? 'Edit Service' : 'Add New Service'}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label>Name</label>
                  <Input
                    value={newService.name}
                    onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                    placeholder="Service name"
                  />
                </div>
                <div className="space-y-2">
                  <label>Price ($)</label>
                  <Input
                    type="number"
                    value={newService.price}
                    onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                    placeholder="Price"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label>Duration (minutes)</label>
                <Input
                  type="number"
                  value={newService.duration}
                  onChange={(e) => setNewService({ ...newService, duration: e.target.value })}
                  placeholder="Duration in minutes"
                  min="5"
                  step="5"
                />
              </div>
              
              <div className="space-y-2">
                <label>Description</label>
                <Textarea
                  value={newService.description}
                  onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                  placeholder="Service description"
                />
              </div>
              
              <div className="space-y-2">
                <label>Icon</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Shield', 'Scissors', 'Syringe', 'Smile'].map((icon) => (
                    <Button
                      key={icon}
                      type="button"
                      variant={newService.icon === icon ? 'default' : 'outline'}
                      className="h-12"
                      onClick={() => setNewService({ ...newService, icon })}
                    >
                      {getServiceIcon(icon)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
            {editingService ? (
              <Button onClick={() => handleUpdateService(editingService.id)}>
                Update Service
              </Button>
            ) : (
              <Button onClick={handleAddService}>
                Add Service
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>

      {services.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No services added yet. Add your first service!</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader className="flex flex-row items-center gap-4 pb-2">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  {getServiceIcon(service.icon)}
                </div>
                <div>
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    ${service.price} · {service.duration} minutes
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{service.description}</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => startEditing(service)}
                    >
                      <Pencil className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                  </DialogTrigger>
                </Dialog>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => removeService(service.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Services;
