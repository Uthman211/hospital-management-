import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { ReactNode } from "react"

interface ModalProps {
    title: string
    btnText: string
    description: string
   children: ReactNode
}

export default function Modal({title, btnText, description, children} : ModalProps) {

    return (



<Dialog>
  <DialogTrigger className="cursor-pointer bg-blue text-white py-1 px-4 rounded-md text-xs">{btnText}</DialogTrigger>
  <DialogContent className="w-full">
    <DialogHeader>
      <DialogTitle>{title}</DialogTitle>
      
      <DialogDescription>
        {description}
      </DialogDescription>
    </DialogHeader>
    {children}
  </DialogContent>
</Dialog>

    )


}