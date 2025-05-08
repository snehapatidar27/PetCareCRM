
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { usePetStore } from '@/store/petStore';
import { PlusCircle, Pencil, Trash2, ShieldCheck, Shield, Info } from 'lucide-react';
import { toast } from 'sonner';

const Pets = () => {
  const { pets, addPet, removePet, updateInsurance } = usePetStore();
  
  const [newPet, setNewPet] = useState({
    name: '',
    species: 'Dog',
    breed: '',
    age: '',
    owner: '',
    insuranceStatus: 'None' as const
  });
  
  const handleAddPet = () => {
    if (!newPet.name || !newPet.breed || !newPet.age || !newPet.owner) {
      toast.error('Please fill out all fields');
      return;
    }
    
    addPet({
      ...newPet,
      age: parseInt(newPet.age)
    });
    
    // Reset form
    setNewPet({
      name: '',
      species: 'Dog',
      breed: '',
      age: '',
      owner: '',
      insuranceStatus: 'None'
    });
  };

  const insuranceOptions = [
    { value: 'None', label: 'No Insurance' },
    { value: 'Basic', label: 'Basic Plan' },
    { value: 'Premium', label: 'Premium Plan' },
    { value: 'Complete', label: 'Complete Coverage' }
  ];

  return (
    <Layout title="Pets">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">My Pets</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Pet
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Pet</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label>Name</label>
                  <Input
                    value={newPet.name}
                    onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                    placeholder="Pet name"
                  />
                </div>
                <div className="space-y-2">
                  <label>Species</label>
                  <Select
                    value={newPet.species}
                    onValueChange={(value) => setNewPet({ ...newPet, species: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Dog">Dog</SelectItem>
                      <SelectItem value="Cat">Cat</SelectItem>
                      <SelectItem value="Bird">Bird</SelectItem>
                      <SelectItem value="Fish">Fish</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label>Breed</label>
                  <Input
                    value={newPet.breed}
                    onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                    placeholder="Breed"
                  />
                </div>
                <div className="space-y-2">
                  <label>Age</label>
                  <Input
                    type="number"
                    value={newPet.age}
                    onChange={(e) => setNewPet({ ...newPet, age: e.target.value })}
                    placeholder="Age in years"
                    min="0"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label>Owner</label>
                <Input
                  value={newPet.owner}
                  onChange={(e) => setNewPet({ ...newPet, owner: e.target.value })}
                  placeholder="Owner name"
                />
              </div>
              
              <div className="space-y-2">
                <label>Insurance Status</label>
                <Select
                  value={newPet.insuranceStatus}
                  onValueChange={(value: any) => setNewPet({ ...newPet, insuranceStatus: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select insurance status" />
                  </SelectTrigger>
                  <SelectContent>
                    {insuranceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={handleAddPet}>Add Pet</Button>
          </DialogContent>
        </Dialog>
      </div>

      {pets.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No pets added yet. Add your first pet!</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pets.map((pet) => (
            <Card key={pet.id} className="overflow-hidden">
              <div className="h-32 bg-muted overflow-hidden">
                {pet.imageUrl ? (
                  <img
                    src={pet.imageUrl}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-secondary">
                    <PlusCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>{pet.name}</CardTitle>
                  <div className="flex items-center gap-1">
                    {pet.insuranceStatus === 'None' ? (
                      <div className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                        No Insurance
                      </div>
                    ) : (
                      <div className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                        {pet.insuranceStatus}
                      </div>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Species:</span>
                    <span>{pet.species}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Breed:</span>
                    <span>{pet.breed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Age:</span>
                    <span>{pet.age} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Owner:</span>
                    <span>{pet.owner}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Insurance
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update Insurance for {pet.name}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="space-y-2">
                        <label>Insurance Plan</label>
                        <Select
                          defaultValue={pet.insuranceStatus}
                          onValueChange={(value: any) => updateInsurance(pet.id, value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select insurance status" />
                          </SelectTrigger>
                          <SelectContent>
                            {insuranceOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="border rounded p-3 bg-muted/50 text-sm">
                        <div className="flex items-start gap-2">
                          <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <p>Updating insurance plan will be applied immediately without any waiting period.</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="text-destructive hover:text-destructive"
                  onClick={() => removePet(pet.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </Layout>
  );
};

export default Pets;
