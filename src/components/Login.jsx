import axios from 'axios';
import { useState } from 'react';
import Alert from './Alert';

function Login({setRegister}){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [successLogin, setSuccessLogin] = useState('');
    const [errorLogin, setErrorLogin] = useState('');

    const handleSubmit = async e => {
        // Evita que se envíe el formulario
        e.preventDefault();

        // Resetea los mensajes de respuesta
        setSuccessLogin('');
        setErrorLogin('');

        try{
            // Ejecuta intento de login
            const response = await axios.post('http://localhost:3000/api/v1/auth/login',{
                email,
                password
            });

            // Login exitoso
            console.log(response.data);

            setSuccessLogin(`Usuario logeado, el token generado es: ${response.data.tokenJWT}`)
        }catch(e){
            // Login fallido
            let message = e.response?.data?.message ?? 'Error desconocido';
            setErrorLogin(`Error al hacer proceso de login, error: ${message}`);

            // Limpia campo password
            setPassword('');
            document.querySelector('#password').value = '';
        }
    }

    return <>
        <div className="bg-white w-full max-w-md py-8 px-6 rounded-xl shadow-lg text-center text-gray-600 font-poppins">
            <h1 className="text-2xl font-extrabold mb-5">Login de Usuario</h1>
            <p className="mb-3">Ingresa tus datos para acceder a tu cuenta</p>

            {successLogin && <Alert color="green" message={successLogin} />}
            {errorLogin && <Alert color="red" message={errorLogin} />}

            <form onSubmit={handleSubmit} className="flex flex-col py-5">
                <input type="text" placeholder="Ingresa el email" id="email" name="email" required onChange={e => {
                    setEmail(e.target.value);
                }} className="px-4 py-2 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-yellow-200 mb-4"/>
                <input type="password" placeholder="Contraseña" id="password" name="password" required onChange={e => 
                    setPassword(e.target.value)
                } className="px-4 py-2 border rounded-md border-gray-300 outline-none focus:ring-2 focus:ring-yellow-200 mb-6"/>
                <button type="submit" className="bg-yellow-400 cursor-pointer rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-yellow-200 focus:bg-yellow-500 hover:bg-yellow-300">Acceder</button>
            </form>
            <p>¿No tienes una cuenta? <b onClick={setRegister} className="cursor-pointer hover:text-gray-900">Crea una ahora</b></p>
        </div>
    </>;
}

export default Login;