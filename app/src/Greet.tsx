type GreetProps={
    value?:number, // "?" called as optional type which means the value of "value" is optional 
    click?:()=>void
}

function Greet(props:GreetProps){
    return (
        <div>
            This is prop ex- {props?.value} 
            {/* here "?" is called as optional chaining */}
            <button onClick={props.click}>Click Here</button>
        </div>
    )
}

export default Greet;