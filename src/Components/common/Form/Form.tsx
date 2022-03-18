import React from 'react'
import { Formik} from 'formik';

interface FormProps{
    values:any,
    schema:any,
    onSubmit:(values:any)=>void
}

const Form:React.FC<FormProps>=({values,schema,onSubmit,children})=>{
    return(
       <Formik
         enableReinitialize={true}
         initialValues={values}
         validationSchema={schema}
         onSubmit={onSubmit}
       >
        {({handleSubmit})=>(
            <form onSubmit={handleSubmit}>
                {children}
            </form>
        )}   
       </Formik>
    )

}
export default Form