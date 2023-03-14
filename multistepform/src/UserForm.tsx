
function UserForm() {
    return (
        <>
            <label>First Name</label>
            <input type="text" autoFocus required name="first" />
            <label>First Name</label>
            <input type="text" required name="first" />
            <label>First Name</label>
            <input type="number" min={2} required name="first" />
        </>
    )
}

export default UserForm