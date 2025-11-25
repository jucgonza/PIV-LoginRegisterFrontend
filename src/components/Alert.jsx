function Alert({type, message}){
    return ( type == "error" ?
        <div className={`bg-red-50 border border-red-500 text-red-800 rounded-lg p-4 break-words`}>
            {message}
        </div> : <div className={`bg-green-50 border border-green-500 text-green-800 rounded-lg p-4 break-words`}>
            {message}
        </div>
    );
}

export default Alert;