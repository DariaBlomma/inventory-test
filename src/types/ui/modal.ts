export interface IOnDialogConfirm {
  value: string | number;
}

export interface IMyDialogProps {
  input: {
    type: string,
    placeholder?: string,
    customClass?: string,
    validation?: {
      min?: number,
      max?: number,
    }
  },
  dialogClass?: string;
  onConfirm: ({ value } : IOnDialogConfirm) => void,
  onCancel: () => void,
}
