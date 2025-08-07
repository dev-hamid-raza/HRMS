import type { Employee, EmployeeBody } from "./employees.types";
import type { ShiftBody } from "./shift.types";

export type PrimaryInoutDialogProps = {
    open: boolean
    onClose: () => void
    onAction: () => void
    title: string;
    isDisabled: boolean
    description: string
    label: string
    placeholder: string
    inputValue: string,
    setInputValue: (value: string) => void
};


export type PrimaryShiftDialogProps = {
    open: boolean
    onClose: () => void
    onAction: () => void
    isDisabled: boolean
    shiftTimes: ShiftBody
    title: string
    handleTimeChange: (key: keyof ShiftBody, value: string) => void;
};

export type EmployeeFormDialogProps = {
    open: boolean
    onClose: () => void
    onAction: (formData: EmployeeBody) => void
    isDisabled: boolean
    title: string,
    data?: Employee | null
};

export type PrimaryDeleteDialogProps = {
    open: boolean
    onClose: () => void
    onAction: () => void
    title: string;
    isDisabled: boolean
    description: string
}