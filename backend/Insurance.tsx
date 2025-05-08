
import { Layout } from '@/components/layout/Layout';
import { usePetStore } from '@/store/petStore';
import { ShieldCheck, ShieldX, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const Insurance = () => {
  const { pets, updateInsurance } = usePetStore();
  
  const insurancePlans = [
    {
      name: 'Basic',
      price: '$15/month',
      description: 'Essential coverage for accidents and emergencies',
      features: [
        { label: 'Accident Coverage', included: true },
        { label: 'Emergency Visits', included: true },
        { label: 'Routine Checkups', included: false },
        { label: 'Medications', included: false },
        { label: 'Dental Care', included: false },
      ],
      color: 'bg-blue-400'
    },
    {
      name: 'Premium',
      price: '$25/month',
      description: 'Comprehensive coverage with added wellness benefits',
      features: [
        { label: 'Accident Coverage', included: true },
        { label: 'Emergency Visits', included: true },
        { label: 'Routine Checkups', included: true },
        { label: 'Medications', included: true },
        { label: 'Dental Care', included: false },
      ],
      color: 'bg-green-400',
      recommended: true
    },
    {
      name: 'Complete',
      price: '$40/month',
      description: 'All-inclusive coverage with no limits',
      features: [
        { label: 'Accident Coverage', included: true },
        { label: 'Emergency Visits', included: true },
        { label: 'Routine Checkups', included: true },
        { label: 'Medications', included: true },
        { label: 'Dental Care', included: true },
      ],
      color: 'bg-purple-400'
    }
  ];

  const insuredPets = pets.filter(pet => pet.insuranceStatus !== 'None');
  const uninsuredPets = pets.filter(pet => pet.insuranceStatus === 'None');

  return (
    <Layout title="Pet Insurance">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Insurance Plans</h2>
        <p className="text-muted-foreground">
          Protect your pets with our comprehensive insurance plans
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3 mb-10">
        {insurancePlans.map((plan) => (
          <Card key={plan.name} className={`relative overflow-hidden border-${plan.color}/20`}>
            {plan.recommended && (
              <div className="absolute top-0 right-0">
                <div className="bg-primary text-primary-foreground px-3 py-0.5 text-xs transform rotate-0 translate-x-2 -translate-y-0">
                  Recommended
                </div>
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex items-center text-xl">
                <div className={`w-6 h-6 rounded-full ${plan.color} mr-2 flex items-center justify-center`}>
                  <ShieldCheck className="h-3 w-3 text-white" />
                </div>
                {plan.name}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold mb-4">{plan.price}</div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature.label} className="flex items-center text-sm">
                    {feature.included ? (
                      <Check className="h-4 w-4 mr-2 text-green-400" />
                    ) : (
                      <X className="h-4 w-4 mr-2 text-muted-foreground" />
                    )}
                    <span className={feature.included ? '' : 'text-muted-foreground'}>
                      {feature.label}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">Learn More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">Your Insured Pets</h2>
          {insuredPets.length === 0 ? (
            <p className="text-muted-foreground">None of your pets are currently insured.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {insuredPets.map((pet) => (
                <Card key={pet.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-lg">{pet.name}</CardTitle>
                      <div 
                        className={`text-xs px-2 py-1 rounded-full 
                          ${pet.insuranceStatus === 'Basic' ? 'bg-blue-400/10 text-blue-400' : 
                          pet.insuranceStatus === 'Premium' ? 'bg-green-400/10 text-green-400' : 
                          'bg-purple-400/10 text-purple-400'}`}
                      >
                        {pet.insuranceStatus}
                      </div>
                    </div>
                    <CardDescription>{pet.species} · {pet.breed}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="flex justify-between items-center w-full">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => updateInsurance(pet.id, 'None')}
                        className="text-destructive"
                      >
                        <ShieldX className="h-3.5 w-3.5 mr-1" />
                        Cancel
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                      >
                        Manage Plan
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
        
        {uninsuredPets.length > 0 && (
          <div>
            <h2 className="text-xl font-bold mb-4">Uninsured Pets</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {uninsuredPets.map((pet) => (
                <Card key={pet.id} className="bg-secondary/50">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{pet.name}</CardTitle>
                    <CardDescription>{pet.species} · {pet.breed}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <div className="w-full space-y-2">
                      <p className="text-xs text-muted-foreground">
                        Add insurance coverage to protect {pet.name} from unexpected costs
                      </p>
                      <div className="flex gap-2">
                        {insurancePlans.map(plan => (
                          <Button 
                            key={plan.name}
                            size="sm" 
                            variant="outline"
                            className="flex-1 text-xs"
                            onClick={() => updateInsurance(pet.id, plan.name as any)}
                          >
                            {plan.name}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Insurance;
