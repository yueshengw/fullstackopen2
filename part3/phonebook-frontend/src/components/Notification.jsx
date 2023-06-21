const Notification = ({ message }) => {
    const { text, type } = message

    if (text == null) {
        return null
    }

    const notificationStyle = {
        color: type==='success'?'green':'red',
        background: 'lightgrey',
        fontSize: 20,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    }

    return (
        <div style={notificationStyle} >
            {text}
        </div>
    )
}

export default Notification