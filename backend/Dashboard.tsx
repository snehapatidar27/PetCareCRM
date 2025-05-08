
import { Layout } from '@/components/layout/Layout';
import { StatCard } from '@/components/dashboard/StatCard';
import { UpcomingAppointments } from '@/components/dashboard/UpcomingAppointments';
import { RecentPets } from '@/components/dashboard/RecentPets';
import { ServicesOverview } from '@/components/dashboard/ServicesOverview';
import { usePetStore } from '@/store/petStore';
import { useAppointmentStore } from '@/store/appointmentStore';
import { useServiceStore } from '@/store/serviceStore';
import { CalendarClock, PawPrint, Stethoscope, ShieldCheck } from 'lucide-react';
import { isPast } from 'date-fns';

const Dashboard = () => {
  const { pets } = usePetStore();
  const { appointments } = useAppointmentStore();
  const { services } = useServiceStore();
  
  const completedAppointments = appointments.filter(a => a.completed).length;
  const upcomingAppointments = appointments.filter(a => !isPast(a.date) && !a.completed).length;
  const insuredPets = pets.filter(p => p.insuranceStatus !== 'None').length;

  return (
    <Layout title="Dashboard">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total Pets"
          value={pets.length}
          icon={PawPrint}
        />
        <StatCard 
          title="Upcoming Appointments"
          value={upcomingAppointments}
          icon={CalendarClock}
          color="text-blue-400"
        />
        <StatCard 
          title="Services Offered"
          value={services.length}
          icon={Stethoscope}
          color="text-green-400"
        />
        <StatCard 
          title="Insured Pets"
          value={insuredPets}
          description={`${Math.round((insuredPets / pets.length) * 100) || 0}% of total pets`}
          icon={ShieldCheck}
          color="text-purple-400"
        />
      </div>

      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
        <UpcomingAppointments />
        <RecentPets />
        <ServicesOverview />
      </div>
    </Layout>
  );
};

export default Dashboard;
