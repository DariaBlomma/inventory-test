export interface IMyErrorMessage {
  error: string;
}

export interface IInputEventParams {
  event: Event,
  value: string | number | undefined,
  isValid: boolean,
}

export interface IMyInputProps {
  type: string,
  placeholder?: string,
  customClass?: string,
  validation?: {
    min?: number,
    max?: number,
  }
  onInput: ({ event, value, isValid }: IInputEventParams) => void;
}