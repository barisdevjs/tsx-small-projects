import { FormT } from "./App"
import Wrapper from "./Wrapper"


type AddressT = Pick<FormT, "street"|"city"|"state"|"zip">

type ExtendedAddressT = AddressT & { 
    updateFields : (fields : Partial<AddressT>) => void
}

function AddressForm({street,city,state,zip, updateFields} : ExtendedAddressT) {
    return (
        <Wrapper title="Adress">
            <label>Street</label>
            <input autoFocus required type="text" value={street}
            onChange={e => updateFields({street:e.target.value})} />
            <label>City</label>
            <input required type="text" value={city} 
            onChange={e => updateFields({city:e.target.value})} />
            <label>State</label>
            <input required type="text" value={state}
            onChange={e => updateFields({state:e.target.value})} />
            <label>Zip</label>
            <input required type="text" value={zip}
            onChange={e => updateFields({zip:e.target.value})} />
        </Wrapper>
    )
}

export default AddressForm