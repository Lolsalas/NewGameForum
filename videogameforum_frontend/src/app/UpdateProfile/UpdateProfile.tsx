'use client'

import React, { useState, useEffect } from 'react';

import { useRouter } from 'next/navigation';


interface UserProfile {
    username: string;
    title: string;
    ProfilePictureURL: string; 
}

function ProfileForm() {    

    const router=useRouter()
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [newUsername, setNewUsername] = useState('');
    const [newTitle, setNewTitle] = useState('');
    const [newPictureFile, setNewPictureFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(true);

    

    useEffect(() => {
        const authToken = localStorage.getItem("authToken")||'';
        if (!authToken) {
            setLoading(false);
            alert("Debes iniciar sesión para editar tu perfil.");
            return;
        }

        const fetchProfileData = async () => {
            try {
                
                const response = await fetch('http://localhost:8081/forum/profile', {
                    headers: {
                        'Authorization': `Bearer ${authToken}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();

                    const userdata=data.user

                    if (!userdata) {
                        alert("Error: No se encontró el objeto de usuario en la respuesta.");
                        setLoading(false);
                        return;
                    }

                    setProfile(userdata ?? '');
                    setNewUsername(userdata.Username ?? '');
                    setNewTitle(userdata.Title ?? '');
                } else {
                    alert('Error al cargar los datos del perfil.');
                }
            } catch (error) {
                console.error('Error de red al cargar perfil:', error);
                alert('Error de conexión.');
            } finally {
                setLoading(false);
            }
        };

        fetchProfileData();
    }, [loading]);
    


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const authToken = localStorage.getItem("authToken")||'';
        if (!authToken) return;

        setLoading(true);


        const formData = new FormData();
        

        formData.append('Username', newUsername);
        formData.append('Title', newTitle);
        
        if (newPictureFile) {
           
            formData.append('profile_picture', newPictureFile); 
        }

        try {
            const response = await fetch('http://localhost:8081/forum/profile/update', {
                method: 'POST', 
                headers: {
                    'Authorization': `Bearer ${authToken}`,
                 
                },
                body: formData, 
            });

            if (response.ok) {
                alert('¡Perfil actualizado con éxito!');
                router.push('/')

            } else {
                const errorData = await response.json();
                alert(`Error al actualizar: ${errorData.error || response.statusText}`);
            }
        } catch (error) {
            console.error('Error de red al actualizar:', error);
            alert('Error de conexión con el servidor.');
        } finally {
            setLoading(false);
        }
    };
    



    return (
        <div className="profile-edit-container">
            <h2>Editar Perfil</h2>
            <form onSubmit={handleSubmit}>
                
                {profile?.ProfilePictureURL && (
                    <div className="current-picture-container">
                        <img 
                            src={`http://localhost:8081${profile.ProfilePictureURL}`} 
                            alt="Foto de Perfil Actual" 
                            style={{ width: '100px', height: '100px', borderRadius: '50%' }}
                        />
                        <p>Foto actual</p>
                    </div>
                )}

                <label>
                    Username:
                    <input 
                        type="text" 
                        value={newUsername}
                        key='username'
                        onChange={(e) => setNewUsername(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Título:
                    <input 
                        type="text" 
                        value={newTitle}
                        key='title'
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                </label>

            
                <label>
                    Nueva Imagen de Perfil:
                    <input 
                        type="file" 
                        accept="image/*"
                        key='profilePictureURL'
                        onChange={(e) => setNewPictureFile(e.target.files ? e.target.files[0] : null)}
                    />
                </label>

                <button type="submit" disabled={loading}>
                    {loading ? 'Guardando...' : 'Guardar Cambios'}
                </button>
            </form>
        </div>
    );
}

export default ProfileForm;