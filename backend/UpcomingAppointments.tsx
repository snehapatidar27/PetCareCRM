
import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppointmentStore } from '@/store/appointmentStore';
import { format, isPast } from 'date-fns';
import { Button } from '../ui/button';
import { CheckCircle } from 'lucide-react';

export const UpcomingAppointments = () => {
  const { appointments, markCompleted } = useAppointmentStore();
  
  const upcomingAppointments = useMemo(() => {
    return appointments
      .filter(appt => !isPast(appt.date) && !appt.completed)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5);
  }, [appointments]);
  
  if (upcomingAppointments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No upcoming appointments</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Appointments</CardTitle>
      </CardHeader>
      <CardContent className="px-0">
        <div className="space-y-1">
          {upcomingAppointments.map((appointment) => (
            <div 
              key={appointment.id} 
              className="flex items-center justify-between px-6 py-2 hover:bg-secondary/50 transition-colors"
            >
              <div>
                <div className="font-medium">{appointment.petName}</div>
                <div className="text-sm text-muted-foreground">{appointment.service}</div>
                <div className="text-xs text-muted-foreground">
                  {format(appointment.date, 'PPp')}
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => markCompleted(appointment.id)}
              >
                <CheckCircle className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
