import { FormT } from "./App"
import Wrapper from "./Wrapper"

type UserT =Pick<FormT, "firstName"|"lastName"|"age">

type ExtendedUserT = UserT & { 
    updateFields : (fields : Partial<UserT>) => void
}

function UserForm({firstName,lastName,age ,updateFields} : ExtendedUserT  ) {
    return (
        <Wrapper title="User Details">
            <label>First Name</label>
            <input type="text" autoFocus required name="first" value={firstName}
            onChange={e => updateFields({firstName:e.target.value})}/>
            <label>Last Name</label>
            <input type="text" required name="last" value={lastName}
            onChange={e => updateFields({lastName:e.target.value})}/>
            <label>Age</label>
            <input type="number" min={2} required name="first" value={age}
            onChange={e => updateFields({age:e.target.valueAsNumber})}/>
        </Wrapper>
    )
}

export default UserForm