type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  errormessage?: string;
};

export function Input(props: InputProps) {
  return (
    <div style={props.style}>
      <label className="mb-1 flex gap-1" htmlFor={props.id}>
        <span>{props["aria-label"]}</span>
        {props.required ? <span className="text-red-700">*</span> : null}
      </label>
      <input className="input w-full" {...props} />
      {props.errormessage ? (
        <p className="text-red-700 text-sm mt-1">{props.errormessage}</p>
      ) : null}
    </div>
  );
}
