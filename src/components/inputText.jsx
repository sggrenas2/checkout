
import styleInput from './../css/inputText.module.css';

export function InputText(props){
    return <label htmlFor={props.name} className={styleInput.labelContainer}>
        <span>{props.icon}</span>
        <input type={(props.type)?props.type:"text"} name={props.name} id={props.name} placeholder={props.placeholder} className={(props.class)?props.class:""} disabled={(props.isDisabled)?true:false} pattern={(props.pattern)?props.pattern:null} onChange={props.onChange} value={props.valueContent} required/>
    </label>
}

export default InputText;