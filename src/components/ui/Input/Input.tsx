import { ChangeEvent } from "react";
import "../../../styles/component/input-field.scss";

interface InputProps {
  type: "text" | "number" | "email" | "password" | "tel" | "url";
  label: string;
  value: string | number | undefined;
  name: string;
  placeholder: string;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  readonly?: boolean;
  required: boolean;
  id: string;
  defaultValue?: string | number;
  inputType?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input = (props: InputProps) => {
  const {
    label,
    type,
    value,
    name,
    placeholder,
    disabled,
    readonly,
    required,
    onChange,
    id,
    defaultValue,
  } = props;

  return (
    <div className="form-field">
      <label htmlFor={id} className="form-label">
        {label}
      </label>

      <div className="form-control-wrap">
        <input
          type={type}
          placeholder={placeholder}
          className="form-input"
          id={id}
          required={required}
          disabled={disabled}
          readOnly={readonly}
          value={value ? value : defaultValue}
          onChange={onChange}
          defaultValue={defaultValue}
          name={name}
        />
      </div>
    </div>
  );
};
