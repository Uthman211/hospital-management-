
import {
  Table,
  TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import treatments from "@/mocks/treatment.json"
import { Edit, Eye } from "lucide-react"


const CompletedStyle: Record<string, string> = {
    "Completed": "bg-green-500/10 border border-gray-500/20 text-green-900",
    "Ongoing": "bg-yellow-500/10 border border-yellow-500/20 text-yellow-900",
    "Scheduled": "bg-blue-500/10 border border-blue-500/20 text-blue-900"
    
}

export default function TreatmentTable() {
  return (
    <section>
        <Table>
  <TableHeader>
    <TableRow>
      
      <TableHead>Date</TableHead>
      <TableHead>Patient</TableHead>
      <TableHead>Doctor</TableHead>
      <TableHead className="borderborder-gray-500/20">Diagnosis</TableHead>
      <TableHead>Treatment</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
      {treatments.map((treatment, i)=>(
      <TableRow className="text-black">
       
      <TableCell>{treatment.treatmentDate}</TableCell>
      <TableCell>{treatment.patientName}</TableCell>
      <TableCell>{treatment.doctorName}</TableCell>
      <TableCell>{treatment.diagnosis}</TableCell>
      <TableCell>{treatment.treatment}</TableCell>
      <TableCell ><span className={`px-3 py-1 rounded-sm ${CompletedStyle[treatment.status] ?? ""}`}>{treatment.status}</span></TableCell>
      <TableCell>
        <div className="flex gap-4">
            <Edit className="text-green-500 w-4"/>
        </div>
      </TableCell>
      
    </TableRow>
      ))}
  </TableBody>
</Table>
    </section>
  )
}
