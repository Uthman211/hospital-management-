import { Routes, Route } from 'react-router-dom'
import Homepage from './pages/public/homepage'
import Login from './pages/auth/login'
import Register from './pages/auth/register'
import ForgetPassword from './pages/auth/forget-password'
import AboutUs from './pages/public/about'
import NotFoundPage from './pages/public/not-found'
import ProtectedRoute from './protected/protected-route'
import OverviewPage from './pages/dashboard/overview'
import PatientsPage from './pages/dashboard/patients'
import DoctorsPage from './pages/dashboard/doctors'
import AppointmentsPage from './pages/dashboard/appointments'
import TreatmentPage from './pages/dashboard/treatment'
import PaymentsPage from './pages/dashboard/payments'
import StaffPage from './pages/dashboard/staff'
import DiagnosisPage from './pages/dashboard/diagnosis'
import WardsPage from './pages/dashboard/wards'
import PatientDetailPage from './components/page'
import DoctorDetailPage from './components/doctor-detail'
import AppointmentDetailPage from './components/appointment-detail'
import ContactSection from './pages/public/contact-us'
import ServicesSection from './pages/public/services'
import DoctorsSection from './pages/public/doctors'
import AppointmentsSection from './pages/public/appointment'


function App() {
    return (
        <>
            <Routes>

                {/* <Route path="/" element={<Navbar />}> */}
                    <Route path="" element={<Homepage />} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="forget-password" element={<ForgetPassword />} />
                    <Route path="about" element={<AboutUs />} />
                    <Route path="contact" element={<ContactSection />} />
                    <Route path="services" element={<ServicesSection />} />
                    <Route path="doctor" element={<DoctorsSection />} />
                    <Route path="appointment" element={<AppointmentsSection />} />
                    <Route path="*" element={<NotFoundPage />} />
                {/* </Route> */}

                {/* DASHBOARD PAGE */}
                <Route path="" element={<ProtectedRoute />}></Route>
                <Route path="/overview" element={<OverviewPage />} />
                <Route path="/patients" element={<PatientsPage />} />
                 <Route path="/patients/:id" element={<PatientDetailPage />} />
                <Route path="/doctors" element={<DoctorsPage />} />
                <Route path="/doctors/:id" element={<DoctorDetailPage />} />
                <Route path="/appointments" element={<AppointmentsPage />} />
                <Route path="/appointments/:id" element={<AppointmentDetailPage />} />
                <Route path="/treatment" element={<TreatmentPage />} />
                <Route path="/payments" element={<PaymentsPage />} />
                <Route path="/staff" element={<StaffPage />} />
                <Route path="/diagnosis" element={<DiagnosisPage />} />
                <Route path="/wards" element={<WardsPage />} />
                


            </Routes>



           


            {/* <Routes>
<Route path="" element={<ProtectedRoute />}></Route>
 <Route path="/overview" element={<OverviewPage />} />

    </Routes> */}
        </>



    )


}

export default App