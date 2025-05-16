import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog";
  
  import React from "react";
  
  type Props = {
    trigger: React.ReactNode;
    children?: React.ReactNode;
    title: string;
    description?: string;
    className?: string;
    footer?: React.ReactNode;
    open?: boolean;
    setOpen?(value: boolean): void;
  };
  
  const Modal = ({
    children,
    trigger,
    title,
    className,
    description,
    footer,
    open,
    setOpen,
  }: Props) => {
    return (
      <Dialog open={open} onOpenChange={setOpen}  >
        <DialogTrigger asChild>
          {trigger}
        </DialogTrigger>
        <DialogContent  className={className}>
          <DialogHeader className="w-full ">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          {children}
          <DialogFooter>{footer}</DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };
  
  export default Modal;
  