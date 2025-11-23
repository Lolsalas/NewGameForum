'use client'

import TopBar from "../TopBar/TopBar";
import SideBar from "../SideBar/SideBar";
import { useRouter } from "next/navigation";
import { useState } from "react";


function CreateAccount() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault(); 
    try {
      const res = await fetch("http://localhost:8081/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Email: email, Username: username, Password: password }),
      });

      if (res.ok) {
        router.push("/"); // redirige al root
      } else {
        console.error("Error creando cuenta");
      }
    } catch (err) {
      console.error(err);
    }
  };

    return(
       <div className="post-page-wrapper"> 
            <TopBar></TopBar>
            
            {/* CreateAccount.Layout: Contenedor de dos columnas */}
            <div className="CreateAccount Layout">
                <SideBar></SideBar> {/* La SideBar se queda */}
                
                {/* CreateAccountCard.content-card: El contenido principal */}
                <div className="CreateAccountCard content-card">
                    
                    <form onSubmit={handleSubmit} className="account-form"> {/* Clase específica para el formulario */}
                        
                        <h2 className="section-title">Crear tu cuenta</h2> {/* Título estilizado */}
                        
                        {/* Campo Email */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">Email</label>
                            <div className="LoginInput create-input-box">
                                <input type="email" name="Email" id="email" className="login-input" required onChange={e=>setEmail(e.target.value)}/>
                            </div>
                        </div>
                        
                        {/* Campo Nombre de Usuario */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="uname">Nombre de Usuario</label>
                            <div className="LoginInput create-input-box">
                                <input type="text" name="Username" id="uname" className="login-input" required onChange={e=>setUsername(e.target.value)}/>
                            </div>
                        </div>
                        
                        {/* Campo Contraseña */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="pword">Contraseña</label>
                            <div className="LoginInput create-input-box">
                                <input type="password" name="Password" id="pword" className="login-input" required onChange={e=>setPassword(e.target.value)}/>
                            </div>
                        </div>
                        
                        <button className="CreateAccountButton post-submit-button" type="submit">
                            Crear Cuenta
                        </button>
                        
                    </form>
                    
                    {/* Enlace a Login */}
                    <p className="link-text">
                        ¿Ya tienes cuenta? <a href="/login" className="register-link">Inicia Sesión</a>
                    </p>
                    
                </div>
            </div>
        </div>
    )
}

export default CreateAccount