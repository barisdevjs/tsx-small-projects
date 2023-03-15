import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";
import UserForm from "./UserForm";
import { useForm } from "./useForm";
import { FormEvent, useState } from "react";

export type FormT = {
  firstName: string
  lastName: string
  age: number
  street: string
  city: string
  state: string
  zip: string
  email: string
  password: string
}

const initialData: FormT = {
  firstName: "",
  lastName: "",
  age: 0,
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password: "",
}

function App() {
  const [data, setData] = useState(initialData);
  const { currIdx, step, steps, next, prev, goTo, isFirstStep, isLastStep } =
    useForm([
    <UserForm {...data} updateFields={updateForm} />,
    <AddressForm {...data} updateFields={updateForm}/>, 
    <AccountForm {...data} updateFields={updateForm}/>]);

  function updateForm(fields : Partial<FormT>) : void {
    setData(prev => {
     return {...prev,...fields}
    })
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if ( isLastStep) alert ('FINISHED');
    return next();
  }

  return (
    <div style={{
      position: 'relative', backgroundColor: 'lightcyan', border: '1px solid black',
      padding: '2rem', margin: '1rem', borderRadius: '.5rem', fontFamily: 'sans-serif',
      maxWidth: 'max-content'
    }}>
      <form onSubmit={onSubmit} >
        <div style={{ position: 'absolute', top: '.5rem', right: '.5rem' }}>
          {currIdx + 1} / {steps.length}
        </div>
        {step}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '.5rem', justifyContent: 'flex-end' }}>
          {!isFirstStep && <button type="button" onClick={prev}>Back</button>}
          {<button type="submit">{isLastStep ? 'Finish' : 'Next'}</button>}
        </div>
      </form>
    </div>
  )
}

export default App
