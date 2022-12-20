export interface IMyErrorMessage {
  error: string;
}

export interface IInputEventParams {
  event: Event,
  valueString?: string,
  valueNumber?: number | undefined,
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
  onInput: ({ event, valueString, valueNumber, isValid }: IInputEventParams) => void;
}