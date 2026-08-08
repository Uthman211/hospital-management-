import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { ReactNode } from "react"
import { useState } from "react"

interface ModalProps {
    title: string
    btnText?: string
    description: string
    children: ReactNode
    open?: boolean
    onOpenChange?: (open: boolean) => void
    trigger?: ReactNode
}

export default function Modal({ title, btnText, description, children, open, onOpenChange, trigger }: ModalProps) {
    const [internalOpen, setInternalOpen] = useState(false)

    const isControlled = open !== undefined
    const dialogOpen = isControlled ? open : internalOpen
    const setDialogOpen = isControlled ? onOpenChange! : setInternalOpen

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            {trigger ? (
                <DialogTrigger asChild>{trigger}</DialogTrigger>
            ) : (
                <DialogTrigger className="cursor-pointer bg-blue text-white py-1 px-4 rounded-md text-xs">{btnText}</DialogTrigger>
            )}
            <DialogContent className="w-full max-h-[95vh] overflow-y-auto">
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