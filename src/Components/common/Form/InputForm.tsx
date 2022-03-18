import React from 'react' 
import {useFormikContext} from 'formik'

interface InputFormProps{
    type:string,
    label:string
    name:string,
    col:number

}
const InputForm:React.FC<InputFormProps>=({label,col,type,name})=>{
    const {values,handleChange,handleBlur,errors,touched}=useFormikContext<any>()
    return(
       <div className={`col-${col}`}>
          <div className='mb-3'>
          <label  className="form-label">{label}</label>
          <input type={type} 
                 name={name}
                 className="form-control" 
                 value={values[name]} 
                 onChange={handleChange}
                 onBlur={handleBlur} />      
                 {touched[name]&&errors[name]&&(<div className="text-danger">{errors[name]} </div>)}          
          </div>
       
       </div>
      
    )

}
export default InputForm