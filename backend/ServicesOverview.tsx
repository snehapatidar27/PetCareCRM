
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useServiceStore } from '@/store/serviceStore';
import { Shield, Scissors, Syringe, Smile } from 'lucide-react';

export const ServicesOverview = () => {
  const { services } = useServiceStore();

  const getServiceIcon = (icon?: string) => {
    switch (icon) {
      case 'Shield':
        return <Shield className="h-4 w-4 text-blue-400" />;
      case 'Scissors':
        return <Scissors className="h-4 w-4 text-yellow-400" />;
      case 'Syringe':
        return <Syringe className="h-4 w-4 text-red-400" />;
      case 'Smile':
        return <Smile className="h-4 w-4 text-green-400" />;
      default:
        return <Shield className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Services</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-1">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="flex items-center justify-between px-6 py-2 hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-secondary/50 flex items-center justify-center">
                  {getServiceIcon(service.icon)}
                </div>
                <div>
                  <div className="font-medium">{service.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {service.duration} min · ${service.price}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
