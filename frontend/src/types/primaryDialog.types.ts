export type PrimaryDeleteDialogProps = {
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
