import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";
import UserForm from "./UserForm";
import { useForm } from "./useForm";
// 17.06 time
function App() {
  const { currIdx, step, steps, next, prev, goTo, isFirstStep, isLastStep } =
    useForm([<UserForm />, <AddressForm />, <AccountForm />]);

  return (
    <div style={{
      position: 'relative', backgroundColor: 'lightcyan', border: '1px solid black',
      padding: '2rem', margin: '1rem', borderRadius: '.5rem', fontFamily: 'sans-serif'
    }}>
      <form>
        <div style={{ position: 'absolute', top: '.5rem', right: '.5rem' }}>
          {currIdx + 1} / {steps.length}
        </div>
        {step}
        <div style={{ marginTop: '1rem', display: 'flex', gap: '.5rem', justifyContent: 'flex-end' }}>
          {!isFirstStep && <button type="button" onClick={prev}>Back</button>}
          {<button type="button" onClick={next}>{isLastStep ? 'Finish' : 'Next'}</button>}
        </div>
      </form>
    </div>
  )
}

export default App
