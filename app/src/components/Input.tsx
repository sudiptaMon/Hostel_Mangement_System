type inputProps = {
    label: string,
    inputType:string,
    id:string
  };
  function InputField(props:inputProps) {
    return (
      <div>
        {/* <label htmlFor={props.id}>{props.label}</label> */}
        <input type={props.inputType} id={props.id} name={props.label} placeholder={props.label}/>
      </div>
    );
  }
  
  export default InputField;
  