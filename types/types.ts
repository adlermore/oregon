import { SingleValue } from "react-select";

export type Option = {
  contact_name?: string;
  id: number | string;
  name: string;
  vin?: string;
  other_type?: string;
  legal_name?: string;
  additionalData?: {[key: string]: string | number};
}

export type OptionsList = {[key: string]: Option[]}

export interface SelectCompProps {
  label: string;
  options: Option[];
  required?: boolean;
  name: string;
  value?: string | number | string[];
  placeholder?: string;
  error?: string;
  handleChange?: (value: SingleValue<Option>) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  className?: string;
  isSearchable?: boolean;
  isMulti?: boolean;
}
