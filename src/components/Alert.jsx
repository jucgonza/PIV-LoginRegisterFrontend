function Alert({color, message}){
    return (
        <div className={`bg-${color}-50 border border-${color}-500 text-${color}-800 rounded-lg p-4 break-words`}>
            {message}
        </div>
    );
}

export default Alert;