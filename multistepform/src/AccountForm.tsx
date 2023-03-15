import { FormT } from "./App"
import Wrapper from "./Wrapper"

type AccountT = Pick<FormT, "email"|"password">

type ExtendedAddressT = AccountT & { 
    updateFields : (fields : Partial<AccountT>) => void
}


function AccountForm({email,password,updateFields}: ExtendedAddressT ) {
    return (
        <Wrapper title="Account">
            <label>Email</label>
            <input type="email" name="email" autoFocus required value={email}
            onChange={e => updateFields({email : e.target.value})} />         
            <label>Password</label>
            <input type="password" name="password" required value={password}
            onChange={e => updateFields({password : e.target.value})} />         
        </Wrapper>
    )
}

export default AccountForm