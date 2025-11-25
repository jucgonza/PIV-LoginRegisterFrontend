import axios from 'axios';
import { useState } from 'react';

function Register({setLogin}){

    const [email, setEmail] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [successRegister, setSuccessRegister] = useState('');
    const [errorRegister, setErrorRegister] = useState('');

    const handleSubmit = async e => {
        // Evita que se envíe el formulario
        e.preventDefault();

        // Resetea los mensajes de respuesta
        setSuccessRegister('');
        setErrorRegister('');

        if(password != password2){
            setErrorRegister('Las contraseñas no coinciden!');
            return;
        }

        try{
            // Ejecuta intento de registro
            const response = await axios.post('http://localhost:3000/api/v1/auth/register',{
                documentNumber,
                username,
                email,
                password
            });

            // Registro exitoso
            console.log(response.data);

            setSuccessRegister(`Usuario registrado correctamente, el token generado es: ${response.data.token}`)
        }catch(e){
            // Registro fallido
            let message = e.response?.data?.message ?? 'Error desconocido';
            setErrorRegister(`Error al hacer proceso de registro de nuevo usuario, error: ${message}`);
        }
    }

    return <>
        <div className="bg-white w-full max-w-md py-8 px-6 rounded-xl shadow-lg text-center text-gray-600 font-poppins">
            <h1 className="text-2xl font-extrabold mb-5">Registro de Usuario</h1>
            <p className="mb-3">Ingresa tus datos para crear una cuenta</p>
            {successRegister && 
                <div className="bg-green-50 border border-green-500 text-green-800 rounded-lg p-4 break-words">
                    {successRegister}
                </div>
            }
            {errorRegister && 
                <div className="bg-red-50 border border-red-500 text-red-800 rounded-lg p-4">
                    {errorRegister}
                </div>
            }
            <form onSubmit={handleSubmit} className="flex flex-col py-5">
                <input type="text" placeholder="Número de documento" id="documento" name="documento" required onChange={e => {
                    setDocumentNumber(e.target.value);
                }} className="px-4 py-2 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-yellow-200 mb-4"/>
                <input type="text" placeholder="Nombre de usuario" id="username" name="username" required onChange={e => {
                    setUsername(e.target.value);
                }} className="px-4 py-2 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-yellow-200 mb-4"/>
                <input type="text" placeholder="Ingresa el email" id="email" name="email" required onChange={e => {
                    setEmail(e.target.value);
                }} className="px-4 py-2 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-yellow-200 mb-4"/>
                <input type="password" placeholder="Nueva contraseña" id="password" name="password" required onChange={e => 
                    setPassword(e.target.value)
                } className="px-4 py-2 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-yellow-200 mb-4"/>
                <input type="password" placeholder="Repite la contraseña" id="password2" name="password2" required onChange={e => 
                    setPassword2(e.target.value)
                } className="px-4 py-2 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-yellow-200 mb-6"/>
                <button type="submit" className="bg-yellow-400 cursor-pointer rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-200 focus:bg-yellow-500 hover:bg-yellow-300">Confirmar</button>
            </form>
            <p>¿Ya tienes una cuenta? <b onClick={setLogin} className="cursor-pointer hover:text-gray-900">Ingresa desde aquí</b></p>
        </div>
    </>;
}

export default Register;