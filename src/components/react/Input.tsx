type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  errormessage?: string;
};

export function Input(props: InputProps) {
  return (
    <div style={props.style}>
      <label className="mb-1 block" htmlFor={props.id}>
        {props["aria-label"]}{" "}
        {props.required ? <span className="text-red-700">*</span> : null}
      </label>
      <input className="input w-full" {...props} />
      {props.errormessage ? (
        <p className="text-red-700 text-sm mt-1">{props.errormessage}</p>
      ) : null}
    </div>
  );
}
