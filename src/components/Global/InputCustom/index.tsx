import clsx from 'clsx';
import { useField } from 'formik';
import React from 'react'

interface InputCustomProps{
    label:string,
    name:string,
    type:string,
    placeholder:string
}

const InputCustom = ({ label, ...props } : InputCustomProps) => {
    const [field, meta] = useField(props);
  return (
    <div style={{marginBottom:20}}>
        <label className="label-custom">{label}</label>
        <input {...field} {...props} className={clsx("input-custom",meta.touched && meta.error && "input-error")} />
        {meta.touched && meta.error && <div className="error-message">{meta.error}</div>}
    </div>
  )
}

export default InputCustom