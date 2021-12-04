import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';
import image from '../4550_-_Logo_Design.png';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

import { PeopleSettings } from 'react-chat-engine';
const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const[loading, setLoading] = useState(true);

    
    const handleLogOut = async () => {
        await auth.signOut();
        sessionStorage.clear();
        history.push('/');
        
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpg'})
    }

    useEffect(() => {
        if(!user){
            sessionStorage.clear();
            history.push('/');
            
            return;
        }

        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                "user-name": user.displayName,
                //"user-email": user.email, 
                "user-secret": user.uid,
            }
        })
        .then(() => {
            setLoading(false);
        })
        .catch(() => {
            let formdata = new FormData();
            formdata.append('username', user.displayName);
            formdata.append('email', user.email);
            
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar', avatar, avatar.name);

                    axios.post('https://api.chatengine.io/users',
                        formdata, 
                        {headers: { "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY } }
                    )
                    .then(() => setLoading(false))
                    .catch((error) => console.log(error))
                })
        })
    }, [user, history]);

    if(!user || loading) return 'Loading...';

    return (
        
        <div className = "chats-page">
            <div className = "nav-bar">
                <div className = "image-holder">
                        <img style={{height:66, witdh:66}}
                        src= {image} alt="Social Name"/> 
                    </div> 
                <div className = "logo-tab">
                    Posted
                </div>
                <div onClick={handleLogOut} className = "logout-tab" >
                    Logout
                </div>
            </div>
            <ChatEngine
                height = "calc(100vh - 66px)"
                projectID = {process.env.REACT_APP_CHAT_ENGINE_ID}
                userName = {user.displayName}
                //userEmail = {user.email}
                userSecret = {user.uid}
                offset={-8}
            />

            
        </div>   
    );
}

export default Chats;