import axios from 'axios';
import { useState } from 'react';

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
            setErrorLogin(`Error al hacer proceso de login, error: ${message}`)
        }
    }

    return <>
        <div>
            <h1>Login de Usuario</h1>
            <p>Ingresa tus datos para acceder a tu cuenta</p>
            {successLogin && 
                <div>
                    <p>{successLogin}</p>
                </div>
            }
            {errorLogin && 
                <div>
                    <p>{errorLogin}</p>
                </div>
            }
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Email" id="email" name="email" required onChange={e => {
                    setEmail(e.target.value);
                }}/>
                <input type="password" placeholder="Contraseña" id="password" name="password" required onChange={e => 
                    setPassword(e.target.value)
                }/>
                <button type="submit">Acceder</button>
            </form>
            <p>¿No tienes una cuenta? <span onClick={setRegister}>Crea una ahora</span></p>
        </div>
    </>;
}

export default Login;