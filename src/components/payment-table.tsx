
import {
  Table,
  TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import payments from "@/mocks/payment.json"
import { Edit, Eye } from "lucide-react"


const PaidStyle: Record<string, string> = {
    "Paid": "bg-green-500/10 border border-green-500/20 text-green-900",
    "Pending": "bg-yellow-500/10 border border-yellow-500/20 text-yellow-900"
}

export default function PaymentTable() {
  return (
    <section>
        <Table>
  <TableHeader>
    <TableRow>
     
      <TableHead>Date</TableHead>
      <TableHead>Patient</TableHead>
      <TableHead>Amount</TableHead>
      <TableHead>Description</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Actions</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
      {payments.map((payment, i)=>(
      <TableRow className="text-black">
     
      <TableCell>{payment.paymentDate}</TableCell>
      <TableCell>{payment.patientName}</TableCell>
      <TableCell>₦{Intl.NumberFormat().format(payment.amount)}</TableCell>
      <TableCell>{payment.description}</TableCell>
      <TableCell ><span className={`px-3 py-1 rounded-sm ${PaidStyle[payment.paymentStatus] ?? ""}`}>{payment.paymentStatus}</span></TableCell>
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
