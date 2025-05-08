
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { usePetStore } from '@/store/petStore';
import { Shield, ShieldOff, ShieldCheck } from 'lucide-react';

export const RecentPets = () => {
  const { pets } = usePetStore();
  
  const recentPets = pets.slice(0, 5);
  
  if (recentPets.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Pets</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No pets added yet</p>
        </CardContent>
      </Card>
    );
  }

  const getInsuranceIcon = (status: string) => {
    switch (status) {
      case 'None':
        return <ShieldOff className="h-4 w-4 text-muted-foreground" />;
      case 'Basic':
        return <Shield className="h-4 w-4 text-blue-400" />;
      case 'Premium':
        return <ShieldCheck className="h-4 w-4 text-green-400" />;
      case 'Complete':
        return <ShieldCheck className="h-4 w-4 text-purple-400" />;
      default:
        return <ShieldOff className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Pets</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-1">
          {recentPets.map((pet) => (
            <div 
              key={pet.id} 
              className="flex items-center justify-between px-6 py-2 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                  {pet.imageUrl ? (
                    <img 
                      src={pet.imageUrl} 
                      alt={pet.name}
                      className="w-full h-full object-cover" 
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-secondary">
                      {pet.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="font-medium">{pet.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {pet.species}, {pet.age} years old
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                {getInsuranceIcon(pet.insuranceStatus)}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
