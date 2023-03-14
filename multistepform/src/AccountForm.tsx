
function AccountForm() {
    return (
        <>
            <label>Email</label>
            <input type="email" name="email" autoFocus required autoComplete="true" />
            <label>Password</label>
            <input type="password" name="password" required />
        </>
    )
}

export default AccountForm