
import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { useAppointmentStore } from '@/store/appointmentStore';
import { usePetStore } from '@/store/petStore';
import { useServiceStore } from '@/store/serviceStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { format, isPast, isSameDay } from 'date-fns';
import { CalendarIcon, Clock, CheckCircle2, X, PlusCircle, Calendar as CalendarIcon2 } from 'lucide-react';
import { toast } from 'sonner';

const Appointments = () => {
  const { appointments, addAppointment, removeAppointment, markCompleted } = useAppointmentStore();
  const { pets } = usePetStore();
  const { services } = useServiceStore();
  
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  
  const [newAppointment, setNewAppointment] = useState({
    petId: '',
    service: '',
    date: new Date(),
    time: '09:00',
    notes: ''
  });
  
  const handleAddAppointment = () => {
    if (!newAppointment.petId || !newAppointment.service) {
      toast.error('Please select a pet and service');
      return;
    }
    
    const [hours, minutes] = newAppointment.time.split(':').map(Number);
    const appointmentDate = new Date(newAppointment.date);
    appointmentDate.setHours(hours, minutes);
    
    const selectedPet = pets.find(p => p.id === newAppointment.petId);
    if (!selectedPet) {
      toast.error('Selected pet not found');
      return;
    }
    
    addAppointment({
      petId: newAppointment.petId,
      petName: selectedPet.name,
      service: newAppointment.service,
      date: appointmentDate,
      notes: newAppointment.notes
    });
    
    setNewAppointment({
      petId: '',
      service: '',
      date: new Date(),
      time: '09:00',
      notes: ''
    });
  };

  const appointmentsForSelectedDate = appointments.filter(
    appointment => selectedDate && isSameDay(appointment.date, selectedDate)
  );

  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 9; hour <= 17; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const formattedHour = hour.toString().padStart(2, '0');
        const formattedMinute = minute.toString().padStart(2, '0');
        options.push(`${formattedHour}:${formattedMinute}`);
      }
    }
    return options;
  };

  return (
    <Layout title="Appointments">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Appointments</h2>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Schedule New Appointment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label>Pet</label>
                <Select
                  value={newAppointment.petId}
                  onValueChange={(value) => setNewAppointment({ ...newAppointment, petId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a pet" />
                  </SelectTrigger>
                  <SelectContent>
                    {pets.map((pet) => (
                      <SelectItem key={pet.id} value={pet.id}>
                        {pet.name} ({pet.species})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label>Service</label>
                <Select
                  value={newAppointment.service}
                  onValueChange={(value) => setNewAppointment({ ...newAppointment, service: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service.id} value={service.name}>
                        {service.name} (${service.price}, {service.duration} min)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label>Date</label>
                  <Calendar
                    mode="single"
                    selected={newAppointment.date}
                    onSelect={(date) => date && setNewAppointment({ ...newAppointment, date })}
                    className="border rounded-md p-3"
                    disabled={(date) => isPast(date) && !isSameDay(date, new Date())}
                  />
                </div>
                <div className="space-y-2">
                  <label>Time</label>
                  <Select
                    value={newAppointment.time}
                    onValueChange={(value) => setNewAppointment({ ...newAppointment, time: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {generateTimeOptions().map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label>Notes (optional)</label>
                <Textarea
                  value={newAppointment.notes}
                  onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                  placeholder="Any special instructions or notes for this appointment"
                />
              </div>
            </div>
            <Button onClick={handleAddAppointment}>Schedule Appointment</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        <Card className="h-fit">
          <CardHeader>
            <CardTitle className="flex items-center">
              <CalendarIcon2 className="mr-2 h-5 w-5" />
              Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="border rounded-md p-3"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? (
                <span>Appointments for {format(selectedDate, 'MMMM d, yyyy')}</span>
              ) : (
                <span>Select a date</span>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {appointmentsForSelectedDate.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No appointments scheduled for this date</p>
              </div>
            ) : (
              <div className="space-y-4">
                {appointmentsForSelectedDate
                  .sort((a, b) => a.date.getTime() - b.date.getTime())
                  .map((appointment) => (
                    <div 
                      key={appointment.id}
                      className={`p-4 border rounded-lg ${
                        appointment.completed 
                          ? "bg-muted/30 border-dashed" 
                          : "bg-secondary/50"
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium flex items-center">
                            {appointment.petName}
                            {appointment.completed && (
                              <span className="ml-2 text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                                Completed
                              </span>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground">{appointment.service}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm flex items-center">
                            <Clock className="h-3.5 w-3.5 mr-1" />
                            {format(appointment.date, 'h:mm a')}
                          </div>
                        </div>
                      </div>
                      
                      {appointment.notes && (
                        <p className="mt-2 text-sm border-t border-border pt-2">
                          {appointment.notes}
                        </p>
                      )}
                      
                      <div className="mt-3 flex justify-end gap-2">
                        {!appointment.completed && (
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => markCompleted(appointment.id)}
                          >
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                            Mark Completed
                          </Button>
                        )}
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => removeAppointment(appointment.id)}
                        >
                          <X className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Appointments;
