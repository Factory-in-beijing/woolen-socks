import { useId, type InputHTMLAttributes, type Ref } from "react";

export interface TextFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
  label: string;
  hint?: string;
  /** Validation message — from the zod schema or from the server's 400 field errors. */
  error?: string | undefined;
  ref?: Ref<HTMLInputElement>;
}

export function TextField({ label, hint, error, className, ref, ...rest }: TextFieldProps) {
  const id = useId();
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;
  return (
    <div className="dn-field">
      <label htmlFor={id} className="dn-field__label">
        {label}
      </label>
      <input
        {...rest}
        ref={ref}
        id={id}
        className={["dn-field__input", className].filter(Boolean).join(" ")}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
      {hint ? (
        <p id={hintId} className="dn-field__hint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="dn-field__error">
          {error}
        </p>
      ) : null}
    </div>
  );
}
