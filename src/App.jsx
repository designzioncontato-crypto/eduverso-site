import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, onSnapshot, setDoc } from 'firebase/firestore';

// --- Configuração do Firebase ---
// ATENÇÃO: As chaves abaixo são de exemplo. Substitua pelas suas próprias chaves do Firebase.
// É altamente recomendável usar variáveis de ambiente para armazenar informações sensíveis.
const firebaseConfig = {
    apiKey: "AIzaSyD1NNs0egxK90DAQfW9n1FACs2Ek1ZbKas",
    authDomain: "eduverso-livros.firebaseapp.com",
    projectId: "eduverso-livros",
    storageBucket: "eduverso-livros.firebasestorage.app",
    messagingSenderId: "83648358615",
    appId: "1:83648358615:web:31b189d20f98577bf96892",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- Ícones (SVGs inline) ---
const PlayIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5 3 19 12 5 21 5 3" stroke="currentColor"></polygon>
  </svg>
);

const InfoIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" stroke="currentColor"></circle>
    <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor"></line>
    <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor"></line>
  </svg>
);

const SearchIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" stroke="currentColor"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor"></line>
    </svg>
);

const Share2Icon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="5" r="3" stroke="currentColor"></circle>
        <circle cx="6" cy="12" r="3" stroke="currentColor"></circle>
        <circle cx="18" cy="19" r="3" stroke="currentColor"></circle>
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="currentColor"></line>
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="currentColor"></line>
    </svg>
);


const BellIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="currentColor"></path>
        <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="currentColor"></path>
    </svg>
);

const FacebookIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" stroke="currentColor"></path>
    </svg>
);

const InstagramIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor"></line>
    </svg>
);

const TwitterIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor"></path>
    </svg>
);

const YoutubeIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" stroke="currentColor"></path>
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" stroke="currentColor"></polygon>
    </svg>
);

const PencilIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" stroke="currentColor"></path>
  </svg>
);

const PlusIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor"></line>
        <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor"></line>
    </svg>
);

const TrashIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" stroke="currentColor"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor"></path>
        <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor"></line>
        <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor"></line>
    </svg>
);

const ChevronLeftIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" stroke="currentColor"></polyline>
    </svg>
);

const ChevronRightIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" stroke="currentColor"></polyline>
    </svg>
);

const ArrowUpIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="19" x2="12" y2="5" stroke="currentColor"></line>
        <polyline points="5 12 12 5 19 12" stroke="currentColor"></polyline>
    </svg>
);

const ArrowDownIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" stroke="currentColor"></line>
        <polyline points="19 12 12 19 5 12" stroke="currentColor"></polyline>
    </svg>
);

const FilePlusIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="12" y1="18" x2="12" y2="12"></line>
        <line x1="9" y1="15" x2="15" y2="15"></line>
    </svg>
);


// --- Dados Iniciais ---
const initialData = {
    title: 'EduVerso',
    color: '#8A2BE2',
    activePageId: 'home',
    pages: [
        { id: 'home', title: 'Início', isDefault: true }
    ],
    media: {
      heroTransitionTime: 5, // in seconds
      heroSlides: [{
        id: 1,
        title: 'A Origem da Mídia',
        description: 'Em um mundo onde o conteúdo é rei, uma equipe de desenvolvedores precisa criar a plataforma de streaming definitiva. Enfrentando bugs e prazos apertados, eles descobrem que o verdadeiro código está na amizade.',
        imageUrl: 'https://placehold.co/1600x900/000000/8A2BE2?text=Curso+em+Destaque',
        primaryButton: { text: 'Assistir', link: '#'},
        secondaryButton: { text: 'Mais informações', infoText: 'Descrição detalhada aqui.'}
      }],
      carousels: [],
    },
    socialLinks: {
        facebook: { name: 'Facebook', url: '#', enabled: true },
        instagram: { name: 'Instagram', url: '#', enabled: true },
        twitter: { name: 'Twitter', url: '#', enabled: false },
        youtube: { name: 'Youtube', url: '#', enabled: false },
    }
};

const socialIconMap = {
    facebook: FacebookIcon,
    instagram: InstagramIcon,
    twitter: TwitterIcon,
    youtube: YoutubeIcon,
};

const formatUrl = (url) => {
    if (!url || url.trim() === '#') return '#';
    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = `https://${formattedUrl}`;
    }
    return formattedUrl;
};


// --- Componente de Estilos (CSS-in-JS sem bibliotecas) ---
const AppStyles = ({ siteColor }) => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap');
    
    html {
      background-color: #141414; /* Garante que não haja barras cinzas nas laterais */
    }
    html, body {
      overflow-x: hidden; /* Previne o aparecimento da barra de scroll horizontal */
    }

    *, *::before, *::after { box-sizing: border-box; }
    body { 
        margin: 0; 
    }
    .app-container {
      background-color: #141414; color: white; min-height: 100vh;
      font-family: 'Inter', sans-serif; padding-bottom: 80px;
    }
    .header {
      position: fixed; top: 0; left: 0; right: 0; z-index: 50;
      transition: background-color 0.3s ease-in-out; background-color: transparent;
      padding: 1rem 3rem;
    }
    .header.scrolled { background-color: #141414; }
    .header-content { max-width: 1400px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; }
    .nav-container { display: flex; align-items: center; gap: 2rem; }
    .title-container { position: relative; display: flex; align-items: center; gap: 0.5rem; }
    .edit-title-button { background: none; border: none; color: white; cursor: pointer; padding: 0.25rem; opacity: 0; transition: opacity 0.2s; }
    .title-container:hover .edit-title-button { opacity: 0.7; }
    .edit-title-button:hover { opacity: 1; }
    .logo { font-size: 1.875rem; font-weight: 700; color: ${siteColor || '#8A2BE2'}; user-select: none; }
    .nav-links { display: none; }
    .nav-links a.active { color: ${siteColor || '#8A2BE2'}; }
    .user-actions { display: flex; align-items: center; gap: 1rem; }
    .header-social-links { display: flex; align-items: center; gap: 1rem; }
    .header-social-links a { color: white; transition: color 0.2s; }
    .header-social-links a:hover { color: #b3b3b3; }
    .user-actions svg { cursor: pointer; transition: color 0.2s; }
    .user-actions svg:hover { color: #b3b3b3; }
    .user-avatar { 
        width: 32px; height: 32px; border-radius: 4px;
        display: flex; align-items: center; justify-content: center;
        font-weight: bold; font-size: 1rem;
        background-color: ${siteColor || '#8A2BE2'};
        color: white;
        cursor: pointer;
        user-select: none;
    }
    .hero-container { position: relative; height: 56.25vw; min-height: 400px; max-height: 800px; width: 100%; background-size: cover; background-position: center; overflow: hidden; }
    .hero-slide { position: absolute; inset: 0; width: 100%; height: 100%; background-size: cover; background-position: center; opacity: 0; transition: opacity 1s ease-in-out; }
    .hero-slide.active { opacity: 1; }
    .hero-container::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, #141414 10%, transparent 50%); }
    .hero-content { position: absolute; bottom: 10%; left: 1rem; z-index: 10; max-width: 90%; display: flex; flex-direction: column; justify-content: flex-end; padding-bottom: 5rem; }
    .hero-text-content { position: relative; display: inline-block; padding: 0.5rem 3rem 0.5rem 0.5rem; margin: -0.5rem -3rem -0.5rem -0.5rem; padding-top: 4rem; }
    .hero-title { font-size: 2rem; font-weight: 900; text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); }
    .hero-description { display: none; }
    .button-group { margin-top: 1.5rem; display: flex; gap: 0.75rem; align-items: center; }
    .button-wrapper { position: relative; }
    .hero-button { display: flex; align-items: center; justify-content: center; border: none; border-radius: 4px; padding: 0.5rem 1rem; font-size: 1rem; font-weight: 700; cursor: pointer; transition: opacity 0.2s; text-decoration: none; }
    .hero-button:hover { opacity: 0.8; }
    .hero-button svg { width: 24px; height: 24px; margin-right: 0.5rem; }
    .hero-button.primary { background-color: white; color: black; }
    .hero-button.secondary { background-color: rgba(109, 109, 110, 0.7); color: white; }
    .carousels-container { padding: 0 1rem; margin-top: -3rem; position: relative; z-index: 10; display: flex; flex-direction: column; gap: 3rem; }
    .carousel-title-container { display: flex; align-items: center; gap: 1rem; position: relative; }
    .carousel-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 1rem; }
    .carousel-actions button { background: none; border: none; color: #808080; cursor: pointer; padding: 0.5rem; transition: color 0.2s; }
    .carousel-actions button:hover { color: white; }
    .carousel-actions button:disabled { color: #444; cursor: not-allowed; }
    .carousel-slider { display: flex; overflow-x: auto; overflow-y: hidden; gap: 0.5rem; padding-bottom: 1rem; scrollbar-width: thin; scrollbar-color: #424242 transparent; }
    .carousel-slider::-webkit-scrollbar { height: 8px; }
    .carousel-slider::-webkit-scrollbar-thumb { background-color: #424242; border-radius: 4px; }
    .carousel-slider::-webkit-scrollbar-track { background: transparent; }
    .media-card { position: relative; flex-shrink: 0; width: calc(50% - 0.25rem); cursor: pointer; transition: transform 0.3s ease; }
    .media-card:hover { transform: scale(1.05); z-index: 20; }
    .media-card img { width: 100%; aspect-ratio: 2/3; object-fit: cover; border-radius: 4px; }
    .footer-container { max-width: 980px; margin: 4rem auto 0; padding: 2rem 1rem; color: #808080; text-align: center; }
    .copyright { font-size: 0.75rem; margin-top: 2rem; }
    .edit-button { position: absolute; background-color: white; color: black; border: none; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 30; opacity: 0; transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out; box-shadow: 0 2px 8px rgba(0,0,0,0.5); }
    .delete-button { top: 0.5rem; left: 0.5rem; width: 32px; height: 32px; background-color: #dc3545; color: white;}
    .edit-button-pencil { top: 0.5rem; right: 0.5rem; width: 32px; height: 32px; }
    .hero-text-content:hover .edit-button, .button-wrapper:hover .edit-button, .media-card:hover .edit-button, .carousel-title-container:hover .edit-button { opacity: 1; transform: scale(1); }
    .carousel-title-container .edit-button { top: 0; right: 0; }
    .edit-button:hover { transform: scale(1.1); }
    .hero-text-content .edit-button { top: 50%; right: 0.5rem; transform: translateY(-50%); }
    .hero-admin-actions { position: absolute; top: 0.5rem; left: 0.5rem; z-index: 30; display: flex; gap: 0.5rem; }
    .hero-admin-actions .admin-button { background-color: #dc3545; color: white; border: none; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: transform 0.2s, opacity 0.2s; box-shadow: 0 2px 8px rgba(0,0,0,0.5); }
    .hero-admin-actions .admin-button.add-button { background-color: white; color: black; }
    .hero-admin-actions .admin-button:hover { transform: scale(1.1); opacity: 0.9; }
    .hero-admin-actions .admin-button:disabled { background-color: #555; cursor: not-allowed; transform: scale(1); opacity: 0.5; }
    .hero-nav-arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 20; background-color: rgba(0,0,0,0.5); border: none; color: white; border-radius: 50%; width: 48px; height: 48px; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background-color 0.2s; }
    .hero-nav-arrow:hover { background-color: rgba(0,0,0,0.8); }
    .hero-nav-arrow.left { left: 1rem; }
    .hero-nav-arrow.right { right: 1rem; }
    .hero-dots { position: absolute; bottom: 2rem; left: 50%; transform: translateX(-50%); z-index: 20; display: flex; gap: 0.75rem; }
    .hero-dot { width: 10px; height: 10px; border-radius: 50%; background-color: rgba(255,255,255,0.4); cursor: pointer; transition: background-color 0.2s; border: none; padding: 0; }
    .hero-dot.active { background-color: white; }
    .modal-overlay { position: fixed; inset: 0; background-color: rgba(0, 0, 0, 0.8); z-index: 100; display: flex; align-items: center; justify-content: center; }
    .modal-content, .info-modal-content { background-color: #181818; padding: 2rem; border-radius: 8px; width: 90%; max-width: 500px; border: 1px solid #333; box-shadow: 0 5px 25px rgba(0,0,0,0.5); }
    .modal-content h3, .info-modal-content h3 { margin-top: 0; margin-bottom: 1.5rem; font-size: 1.5rem; color: #eee; }
    .info-modal-content p { white-space: pre-wrap; line-height: 1.6; color: #ddd; }
    .modal-form { display: flex; flex-direction: column; gap: 1rem; }
    .modal-form label { font-size: 0.875rem; color: #aaa; display: block; margin-bottom: 0.5rem; }
    .modal-form .checkbox-wrapper { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem; }
    .modal-form .checkbox-wrapper label { margin-bottom: 0; font-size: 1rem; color: #eee; }
    .modal-form .dimension-hint { font-size: 0.75rem; color: #999; margin-left: 0.5rem; font-weight: normal; }
    .modal-form input, .modal-form textarea { background-color: #333; border: 1px solid #555; color: white; padding: 0.75rem; border-radius: 4px; font-size: 1rem; width: 100%; }
    .modal-form input[type="checkbox"] { width: auto; accent-color: ${siteColor || '#8A2BE2'}; }
    .modal-form input[type="color"] { padding: 0.25rem; height: 48px; }
    .modal-form input:focus, .modal-form textarea:focus { border-color: ${siteColor || '#8A2BE2'}; outline: none; box-shadow: 0 0 0 3px ${siteColor ? siteColor + '4D' : '#8A2BE24D'}; }
    .modal-form .file-input-wrapper { margin-top: 0.5rem; }
    .modal-form .file-input-label { background-color: #555; color: white; padding: 0.75rem 1.5rem; border-radius: 4px; cursor: pointer; display: inline-block; text-align: center; transition: background-color 0.2s; width: 100%; }
    .modal-form .file-input-label:hover { background-color: #666; }
    .modal-form input[type="file"] { display: none; }
    .modal-buttons { margin-top: 1.5rem; display: flex; justify-content: flex-end; gap: 1rem; }
    .modal-buttons button { border: none; border-radius: 4px; padding: 0.75rem 1.5rem; font-weight: bold; cursor: pointer; transition: opacity 0.2s; }
    .modal-buttons button:hover { opacity: 0.8; }
    .modal-buttons .save-btn, .modal-buttons .confirm-btn { background-color: ${siteColor || '#8A2BE2'}; color: white; }
    .modal-buttons .delete-btn { background-color: #dc3545; color: white; margin-right: auto; }
    .modal-buttons .cancel-btn { background-color: #555; color: white; }
    .social-links-form .link-item { display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; }
    .social-links-form .link-item input[type="checkbox"] { transform: scale(1.2); }
    .social-links-form .link-item .icon { color: #ccc; }
    .social-links-form .link-item input[type="text"] { flex-grow: 1; }
    .notification { position: fixed; top: 20px; left: 50%; transform: translateX(-50%); padding: 1rem 2rem; border-radius: 8px; color: white; z-index: 200; box-shadow: 0 4px 12px rgba(0,0,0,0.3); opacity: 1; transition: opacity 0.5s ease-out, top 0.5s ease-out; }
    .notification.hide { opacity: 0; top: -100px; }
    .notification.success { background-color: #28a745; }
    .notification.error { background-color: #dc3545; }
    .admin-bar { position: fixed; bottom: 0; left: 0; right: 0; background-color: rgba(0, 0, 0, 0.9); padding: 0.5rem; z-index: 150; display: flex; align-items: center; justify-content: center; gap: 1rem; border-top: 1px solid #333; }
    .admin-bar-button { border: none; border-radius: 4px; padding: 0.5rem 1rem; font-weight: bold; cursor: pointer; transition: background-color 0.2s; display: flex; align-items: center; gap: 0.5rem; }
    .admin-bar-button:hover { opacity: 0.9; }
    .admin-bar-button.save { background-color: #28a745; color: white; }
    .admin-bar-button.page-creator { background-color: #ffc107; color: black; }
    .admin-bar-button.social { background-color: #17a2b8; color: white; }
    .admin-bar-button.logout { background-color: #dc3545; color: white; }
    .add-section-button { background-color: #333; color: white; border: 1px dashed #555; padding: 1.5rem; border-radius: 8px; cursor: pointer; text-align: center; transition: background-color 0.2s, border-color 0.2s; margin: 0 1rem; }
    .add-section-button:hover { background-color: #444; border-color: #777; }
    .custom-page-view-container { max-width: 800px; margin: 0 auto; padding: 8rem 2rem 4rem; color: #eee; }
    .custom-page-view-container h1 { font-size: 2.5rem; color: ${siteColor || '#8A2BE2'}; border-bottom: 2px solid ${siteColor || '#8A2BE2'}; padding-bottom: 0.5rem; margin-bottom: 2rem; }
    .custom-page-view-container .content { font-size: 1.1rem; line-height: 1.8; white-space: pre-wrap; }
    .page-creator-modal-content { background-color: #181818; padding: 0; border-radius: 8px; width: 90%; max-width: 900px; height: 80vh; display: flex; flex-direction: column; border: 1px solid #333; }
    .page-creator-modal-content h3 { margin: 1.5rem 1.5rem 1rem; font-size: 1.5rem; }
    .page-creator-main { display: flex; flex-grow: 1; overflow: hidden; }
    .page-creator-list { width: 250px; border-right: 1px solid #333; overflow-y: auto; padding: 1rem 0; }
    .page-creator-list .page-item { padding: 0.75rem 1.5rem; cursor: pointer; border-bottom: 1px solid #222; }
    .page-creator-list .page-item:hover { background-color: #2a2a2a; }
    .page-creator-list .page-item.active { background-color: ${siteColor ? siteColor + '4D' : '#8A2BE24D'}; font-weight: bold; }
    .page-creator-list .add-page-btn { background-color: transparent; border: 1px dashed #555; color: #999; width: calc(100% - 3rem); margin: 1rem 1.5rem; padding: 0.75rem; border-radius: 4px; cursor: pointer; }
    .page-creator-list .add-page-btn:hover { background-color: #222; border-color: #777; color: white; }
    .page-creator-editor { flex-grow: 1; padding: 1.5rem; display: flex; flex-direction: column; }
    .page-creator-editor .editor-placeholder { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #666; text-align: center; }
    .page-creator-editor .editor-placeholder svg { width: 48px; height: 48px; margin-bottom: 1rem; }
    .page-creator-editor .form-group { margin-bottom: 1rem; }
    .page-creator-editor label { display: block; margin-bottom: 0.5rem; color: #aaa; }
    .page-creator-editor input, .page-creator-editor textarea { width: 100%; background-color: #222; border: 1px solid #444; color: white; padding: 0.5rem; border-radius: 4px; }
    .page-creator-editor textarea { flex-grow: 1; resize: none; }
    .page-creator-editor .editor-actions { display: flex; justify-content: space-between; margin-top: 1rem; }
    .page-creator-modal-footer { border-top: 1px solid #333; padding: 1rem 1.5rem; display: flex; justify-content: flex-end; }

    @media (min-width: 768px) {
      .header { padding: 1rem 3rem; } .logo { font-size: 2.25rem; }
      .nav-links { display: flex; align-items: center; gap: 1.25rem; }
      .nav-links a { color: white; text-decoration: none; transition: color 0.2s; font-weight: 700; }
      .nav-links a:hover { color: #b3b3b3; }
      .hero-content { bottom: 20%; left: 3rem; max-width: 50%; }
      .hero-title { font-size: 3.5rem; }
      .hero-description { display: block; margin-top: 1rem; font-size: 1.125rem; max-width: 500px; text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7); }
      .hero-button { padding: 0.75rem 1.5rem; }
      .carousels-container { padding: 0 3rem; margin-top: -6rem; }
      .carousel-title { font-size: 1.5rem; }
      .media-card { width: calc(25% - 0.5625rem); }
      .carousel-slider { gap: 0.75rem; }
      .footer-container { padding: 2rem 3rem; }
      .add-section-button { margin: 0 3rem; }
    }
    @media (min-width: 1024px) { .media-card { width: calc(20% - 0.8rem); } .carousel-slider { gap: 1rem; } }
    @media (min-width: 1280px) { .media-card { width: calc((100% - 5rem) / 6); } }
  `}</style>
);

// --- Componentes de Modal ---
function LoginModal({ onLogin, onClose }) {
    const [password, setPassword] = useState('');
    const handleSubmit = (e) => { e.preventDefault(); onLogin(password); };
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Login de Administrador</h3>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div>
                        <label htmlFor="password">Senha</label>
                        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoFocus />
                    </div>
                    <div className="modal-buttons">
                        <button type="button" onClick={onClose} className="cancel-btn">Cancelar</button>
                        <button type="submit" className="save-btn">Entrar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function InfoModal({ title, content, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="info-modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>{title}</h3>
                <p>{content}</p>
                <div className="modal-buttons"> <button onClick={onClose} className="cancel-btn">Fechar</button> </div>
            </div>
        </div>
    );
}

function ConfirmDeleteModal({ message, onConfirm, onCancel }) {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Confirmar Exclusão</h3>
                <p>{message}</p>
                <div className="modal-buttons">
                    <button onClick={onCancel} className="cancel-btn">Cancelar</button>
                    <button onClick={onConfirm} className="delete-btn">Excluir</button>
                </div>
            </div>
        </div>
    );
}

function SocialLinksModal({ links, onSave, onClose }) {
    const [localLinks, setLocalLinks] = useState(links);

    const handleToggle = (key) => {
        setLocalLinks(prev => ({
            ...prev,
            [key]: { ...prev[key], enabled: !prev[key].enabled }
        }));
    };

    const handleUrlChange = (key, url) => {
        setLocalLinks(prev => ({
            ...prev,
            [key]: { ...prev[key], url }
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(localLinks);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Editar Redes Sociais</h3>
                <form onSubmit={handleSubmit} className="modal-form social-links-form">
                    {Object.entries(localLinks).map(([key, value]) => {
                        const Icon = socialIconMap[key];
                        return (
                            <div key={key} className="link-item">
                                <input type="checkbox" id={`check-${key}`} checked={value.enabled} onChange={() => handleToggle(key)} />
                                <label htmlFor={`check-${key}`} className="icon"><Icon /></label>
                                <input type="text" value={value.url} onChange={(e) => handleUrlChange(key, e.target.value)} disabled={!value.enabled} placeholder={`URL do ${value.name}`} />
                            </div>
                        );
                    })}
                    <div className="modal-buttons">
                        <button type="button" onClick={onClose} className="cancel-btn">Cancelar</button>
                        <button type="submit" className="save-btn">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}


function Notification({ message, type, onDismiss }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => { setVisible(false); setTimeout(onDismiss, 500); }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onDismiss]);
    if (!message && !visible) return null;
    return <div className={`notification ${type} ${visible ? '' : 'hide'}`}>{message}</div>;
}

function EditModal({ item, onSave, onClose, onDelete }) {
    const [formData, setFormData] = useState(item.data);
    const isOriginalsItem = item.type === 'carouselItem' && item.isOriginals;
    const isNewItem = item.isNew;
    const modalTitles = {
        heroSlide: 'Editar Destaque',
        primaryButton: 'Editar Botão de Ação',
        secondaryButton: 'Editar Botão de Informações',
        carouselTitle: 'Editar Título da Categoria',
        carouselItem: isNewItem ? 'Adicionar Novo Item' : 'Editar Item do Carrossel'
    };
    const fieldLabels = { title: 'Título', description: 'Descrição', imageUrl: 'URL da Imagem', text: 'Texto do Botão', link: 'Link (URL)', infoText: 'Texto Informativo', externalLink: 'URL do Link Externo' };
    const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
    const handleChange = (e) => { const { name, value, type, checked } = e.target; setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value })); };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) { const reader = new FileReader(); reader.onloadend = () => { setFormData(prev => ({ ...prev, imageUrl: reader.result })); }; reader.readAsDataURL(file); }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>{modalTitles[item.type] || 'Editar Conteúdo'}</h3>
                <form onSubmit={handleSubmit} className="modal-form">
                    {Object.keys(formData).map(key => {
                        if (key === 'id' || key === 'useSiteColor' || key === 'transitionTime' || key === 'hasExternalLink' || key === 'externalLink') return null;
                        if (key === 'imageUrl') {
                            return (
                                <div key={key}>
                                    <label htmlFor={key}>{fieldLabels[key] || key} {item.dimensions && <span className="dimension-hint">(Recomendado: {item.dimensions})</span>}</label>
                                    <input id={key} type="text" name={key} value={formData[key]} onChange={handleChange} />
                                    <div className="file-input-wrapper"><label htmlFor="file-upload" className="file-input-label">Carregar do Computador</label><input id="file-upload" type="file" accept="image/*" onChange={handleFileChange} /></div>
                                </div>
                            );
                        }
                        return (
                           <div key={key}>
                               <label htmlFor={key}>{fieldLabels[key] || key}</label>
                               {key === 'description' || key === 'infoText' ? (<textarea id={key} name={key} value={formData[key]} onChange={handleChange} rows="5" />) : (<input id={key} type="text" name={key} value={formData[key]} onChange={handleChange} />)}
                           </div>
                        )
                    })}
                    
                    {item.type === 'carouselItem' && (
                        <>
                            <div className="checkbox-wrapper">
                                <input type="checkbox" id="hasExternalLink" name="hasExternalLink" checked={!!formData.hasExternalLink} onChange={handleChange} />
                                <label htmlFor="hasExternalLink">Habilitar link externo</label>
                            </div>
                            {formData.hasExternalLink && (
                                <div>
                                    <label htmlFor="externalLink">{fieldLabels.externalLink}</label>
                                    <input id="externalLink" type="text" name="externalLink" value={formData.externalLink || ''} onChange={handleChange} placeholder="https://exemplo.com" />
                                </div>
                            )}
                        </>
                    )}

                    {item.type === 'heroSlide' && item.slideIndex === 0 && (
                        <div>
                            <label htmlFor="transitionTime">Tempo de Transição (segundos)</label>
                            <input id="transitionTime" type="number" name="transitionTime" value={formData.transitionTime} onChange={handleChange} min="1" />
                        </div>
                    )}

                    {isOriginalsItem && (<div className="checkbox-wrapper"><input type="checkbox" id="useSiteColor" name="useSiteColor" checked={!!formData.useSiteColor} onChange={handleChange} /><label htmlFor="useSiteColor">Usar cor do site</label></div>)}
                    
                    <div className="modal-buttons">
                        {!isNewItem && (item.type === 'carouselItem' || item.type === 'heroSlide') && (
                            <button
                                type="button"
                                onClick={onDelete}
                                className="delete-btn"
                                disabled={item.type === 'heroSlide' && item.slideCount <= 1}
                            >
                                {item.type === 'heroSlide' ? 'Excluir Destaque' : 'Excluir Item'}
                            </button>
                        )}
                        <button type="button" onClick={onClose} className="cancel-btn">Cancelar</button>
                        <button type="submit" className="save-btn">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

function SiteSettingsModal({ siteData, onSave, onClose }) {
    const [formData, setFormData] = useState({ title: siteData.title, color: siteData.color });
    const handleChange = (e) => { const { name, value } = e.target; setFormData(prev => ({ ...prev, [name]: value })); };
    const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Configurações do Site</h3>
                <form onSubmit={handleSubmit} className="modal-form">
                    <div><label htmlFor="title">Título do Site</label><input id="title" type="text" name="title" value={formData.title} onChange={handleChange} /></div>
                    <div><label htmlFor="color">Cor Principal</label><input id="color" type="color" name="color" value={formData.color} onChange={handleChange} /></div>
                    <div className="modal-buttons"><button type="button" onClick={onClose} className="cancel-btn">Cancelar</button><button type="submit" className="save-btn">Salvar</button></div>
                </form>
            </div>
        </div>
    );
}

function PageCreatorModal({ pages, onSave, onClose }) {
    const [localPages, setLocalPages] = useState(JSON.parse(JSON.stringify(pages)));
    const [editingPage, setEditingPage] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);

    const handleAddNewPage = () => {
        const newPage = { id: `page-${Date.now()}`, title: 'Nova Página', content: 'Comece a escrever o conteúdo aqui.' };
        setLocalPages(prev => [...prev, newPage]);
        setEditingPage(newPage);
    };

    const handleSelectPage = (page) => {
        setEditingPage({ ...page });
    };

    const handleUpdateEditingPage = (field, value) => {
        setEditingPage(prev => ({ ...prev, [field]: value }));
    };

    const handleSavePageChanges = () => {
        if (!editingPage) return;
        setLocalPages(prev => prev.map(p => p.id === editingPage.id ? editingPage : p));
        setEditingPage(null);
    };
    
    const handleDeletePage = (pageId) => {
        setLocalPages(prev => prev.filter(p => p.id !== pageId));
        if (editingPage && editingPage.id === pageId) setEditingPage(null);
        setConfirmDeleteId(null);
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            {confirmDeleteId && <ConfirmDeleteModal message="Tem certeza que deseja excluir esta página?" onConfirm={() => handleDeletePage(confirmDeleteId)} onCancel={() => setConfirmDeleteId(null)} />}
            <div className="page-creator-modal-content" onClick={(e) => e.stopPropagation()}>
                <h3>Criador de Páginas</h3>
                <div className="page-creator-main">
                    <div className="page-creator-list">
                        {localPages.map(page => (
                            <div key={page.id} className={`page-item ${editingPage?.id === page.id ? 'active' : ''}`} onClick={() => handleSelectPage(page)}>
                                {page.title}
                            </div>
                        ))}
                        <button className="add-page-btn" onClick={handleAddNewPage}>+ Nova Página</button>
                    </div>
                    <div className="page-creator-editor">
                        {editingPage ? (
                            <>
                                <div className="form-group">
                                    <label>Título da Página</label>
                                    <input type="text" value={editingPage.title} onChange={e => handleUpdateEditingPage('title', e.target.value)} />
                                </div>
                                <div className="form-group" style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                    <label>Conteúdo</label>
                                    <textarea value={editingPage.content} onChange={e => handleUpdateEditingPage('content', e.target.value)}></textarea>
                                </div>
                                <div className="editor-actions">
                                    <button className="delete-btn" disabled={editingPage.isDefault} onClick={() => setConfirmDeleteId(editingPage.id)}>Excluir</button>
                                    <button className="save-btn" onClick={handleSavePageChanges}>Salvar Alterações da Página</button>
                                </div>
                            </>
                        ) : (
                            <div className="editor-placeholder">
                                <FilePlusIcon />
                                <span>Selecione uma página para editar ou crie uma nova.</span>
                            </div>
                        )}
                    </div>
                </div>
                <div className="page-creator-modal-footer">
                     <button onClick={onClose} className="cancel-btn">Cancelar</button>
                    <button onClick={() => onSave(localPages)} className="save-btn">Salvar Tudo e Fechar</button>
                </div>
            </div>
        </div>
    );
}

// --- Componentes da UI ---
function Header({ siteTitle, siteColor, isAdmin, onAdminLogin, socialLinks, onEditSite, pages, activePageId, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => { const handleScroll = () => setIsScrolled(window.scrollY > 10); window.addEventListener('scroll', handleScroll); return () => window.removeEventListener('scroll', handleScroll); }, []);
  
  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-content">
        <div className="nav-container">
          <div className="title-container">
            <h1 className="logo">{siteTitle}</h1>
            {isAdmin && (<button className="edit-title-button" onClick={onEditSite} aria-label="Editar configurações do site"><PencilIcon width="18" height="18" /></button>)}
          </div>
          <nav className="nav-links">
             {pages.map(page => (
                <a key={page.id} href="#" onClick={(e) => { e.preventDefault(); onNavigate(page.id); }} className={activePageId === page.id ? 'active' : ''}>{page.title}</a>
            ))}
          </nav>
        </div>
        <div className="user-actions">
            <SearchIcon />
            <div className="header-social-links">
            {Object.entries(socialLinks)
                .filter(([_, { enabled }]) => enabled)
                .map(([key, { url }]) => {
                    const Icon = socialIconMap[key];
                    return (
                        <a key={key} href={formatUrl(url)} target="_blank" rel="noopener noreferrer" aria-label={key}><Icon width="20" height="20" /></a>
                    );
            })}
            </div>
            <BellIcon />
            <div className="user-avatar" style={{ backgroundColor: siteColor }} onClick={!isAdmin ? onAdminLogin : undefined} >A</div>
        </div>
      </div>
    </header>
  );
}

function HeroSection({ slides, transitionTime, isAdmin, onEdit, onShowInfo, onAddSlide }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % slides.length);
    }, transitionTime * 1000);
    return () => clearInterval(interval);
  }, [slides, transitionTime]);

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  const goToPrev = () => {
    setActiveIndex(prev => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setActiveIndex(prev => (prev + 1) % slides.length);
  };
  
  if (!slides || slides.length === 0) return null;
  const activeSlide = slides[activeIndex];

  const handlePrimaryClick = (e) => { if(isAdmin) { e.preventDefault(); } };
  const handleSecondaryClick = () => { if(!isAdmin) { onShowInfo(activeSlide.title, activeSlide.secondaryButton.infoText); } };

  return (
    <div className="hero-container">
       {slides.map((slide, index) => (
         <div key={slide.id} className={`hero-slide ${index === activeIndex ? 'active' : ''}`} style={{ backgroundImage: `url(${slide.imageUrl})` }}></div>
      ))}
      <div className="hero-content">
        <div className="hero-text-content">
            {isAdmin && (
                <div className="hero-admin-actions">
                    <button className="admin-button" onClick={() => onEdit('heroSlide', { slideIndex: activeIndex })} aria-label="Editar Destaque"><PencilIcon width="16" height="16"/></button>
                    <button className="admin-button add-button" onClick={onAddSlide} aria-label="Adicionar Destaque"><PlusIcon width="16" height="16"/></button>
                </div>
            )}
            <h2 className="hero-title">{activeSlide.title}</h2>
            <p className="hero-description">{activeSlide.description}</p>
        </div>
        <div className="button-group">
            <div className="button-wrapper">{isAdmin && <button className="edit-button edit-button-pencil" onClick={() => onEdit('primaryButton', { slideIndex: activeIndex })}><PencilIcon width="14" height="14"/></button>}<a href={isAdmin ? '#' : activeSlide.primaryButton.link} target={isAdmin ? '_self' : '_blank'} rel="noopener noreferrer" className="hero-button primary" onClick={handlePrimaryClick}><PlayIcon /> {activeSlide.primaryButton.text}</a></div>
            <div className="button-wrapper">{isAdmin && <button className="edit-button edit-button-pencil" onClick={() => onEdit('secondaryButton', { slideIndex: activeIndex })}><PencilIcon width="14" height="14"/></button>}<button className="hero-button secondary" onClick={handleSecondaryClick}><InfoIcon /> {activeSlide.secondaryButton.text}</button></div>
        </div>
      </div>
      {slides.length > 1 && (
        <>
            <button onClick={goToPrev} className="hero-nav-arrow left" aria-label="Slide anterior"><ChevronLeftIcon /></button>
            <button onClick={goToNext} className="hero-nav-arrow right" aria-label="Próximo slide"><ChevronRightIcon /></button>
            <div className="hero-dots">
                {slides.map((_, index) => (
                    <button key={index} onClick={() => goToSlide(index)} className={`hero-dot ${index === activeIndex ? 'active' : ''}`} aria-label={`Ir para o slide ${index + 1}`}></button>
                ))}
            </div>
        </>
       )}
    </div>
  );
}

function MediaCard({ item, isAdmin, onEdit, onDelete, siteColor }) {
  const imageUrl = (item.useSiteColor && siteColor) ? `https://placehold.co/400x600/${siteColor.substring(1)}/FFFFFF?text=${encodeURIComponent(item.title)}` : item.imageUrl;
  
  const handleClick = () => {
      if (!isAdmin && item.hasExternalLink && item.externalLink) {
          window.open(formatUrl(item.externalLink), '_blank', 'noopener,noreferrer');
      }
  };
  
  const handleAdminActionClick = (e, action) => {
      e.stopPropagation();
      action();
  };

  return (
    <div className="media-card" onClick={handleClick}>
       {isAdmin && (
           <>
            <button className="edit-button delete-button" onClick={(e) => handleAdminActionClick(e, onDelete)}><TrashIcon width="16" height="16"/></button>
            <button className="edit-button edit-button-pencil" onClick={(e) => handleAdminActionClick(e, onEdit)}><PencilIcon width="16" height="16"/></button>
           </>
       )}
      <img src={imageUrl} alt={item.title} />
    </div>
  );
}

function MediaCarousel({ carousel, carouselIndex, isAdmin, siteTitle, siteColor, onEditTitle, onAddItem, onEditItem, onDeleteItem, onDeleteCarousel, onMoveUp, onMoveDown, isFirst, isLast }) {
  const displayTitle = carousel.title;
  return (
    <div>
        <div className="carousel-title-container">
            <h3 className="carousel-title">{displayTitle}</h3>
            {isAdmin && (
                <div className="carousel-actions">
                    <button onClick={onMoveUp} disabled={isFirst}><ArrowUpIcon width="18" height="18" /></button>
                    <button onClick={onMoveDown} disabled={isLast}><ArrowDownIcon width="18" height="18" /></button>
                    <button onClick={onEditTitle}><PencilIcon width="18" height="18" /></button>
                    <button onClick={onAddItem}><PlusIcon width="20" height="20" /></button>
                    <button onClick={onDeleteCarousel}><TrashIcon width="18" height="18" /></button>
                </div>
            )}
        </div>
      <div className="carousel-slider">
        {carousel.items.map((item, itemIndex) => (
          <MediaCard 
            key={item.id || itemIndex} 
            item={item} 
            isAdmin={isAdmin}
            siteColor={siteColor}
            onEdit={() => onEditItem(itemIndex)}
            onDelete={() => onDeleteItem(itemIndex)}
          />
        ))}
      </div>
    </div>
  );
}

function AdminBar({ onSave, onLogout, onEditSocial, onShowPageCreator }) {
    return (
        <div className="admin-bar">
            <button onClick={onSave} className="admin-bar-button save">Salvar Alterações</button>
            <button onClick={onShowPageCreator} className="admin-bar-button page-creator"><FilePlusIcon width="16" height="16" />Criador de Páginas</button>
            <button onClick={onEditSocial} className="admin-bar-button social"><Share2Icon width="16" height="16" />Redes Sociais</button>
            <button onClick={onLogout} className="admin-bar-button logout">Sair</button>
        </div>
    );
}

function CustomPageView({ page }) {
    if (!page) return null;
    return (
        <div className="custom-page-view-container">
            <h1>{page.title}</h1>
            <div className="content">{page.content}</div>
        </div>
    );
}

function Footer() {
    return (
      <footer className="footer-container">
        <p className="copyright">© 2025 EduVerso, Inc.</p>
      </footer>
    );
}

// --- Componente Principal da Aplicação ---
export default function App() {
    const [siteData, setSiteData] = useState(initialData);
    const [activePageId, setActivePageId] = useState(siteData.activePageId || 'home');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showSiteSettingsModal, setShowSiteSettingsModal] = useState(false);
    const [showSocialLinksModal, setShowSocialLinksModal] = useState(false);
    const [showPageCreatorModal, setShowPageCreatorModal] = useState(false);
    const [infoModalContent, setInfoModalContent] = useState(null);
    const [notification, setNotification] = useState({ message: '', type: '' });
    const [deleteConfirmation, setDeleteConfirmation] = useState(null);

    const siteDataRef = doc(db, "sitedata", "config");

    useEffect(() => {
        const unsubscribe = onSnapshot(siteDataRef, (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.media && data.media.hero && !data.media.heroSlides) {
                    data.media.heroSlides = [{ id: 1, ...data.media.hero }];
                    delete data.media.hero;
                }
                const carouselsWithIds = (data.media?.carousels || initialData.media.carousels).map((c, i) => ({ ...c, id: c.id || `carousel-${Date.now()}-${i}` }));
                if(data.media) data.media.carousels = carouselsWithIds;

                const mergedData = {
                    ...initialData,
                    ...data,
                    pages: data.pages && data.pages.length > 0 ? data.pages : initialData.pages,
                    activePageId: data.activePageId || initialData.activePageId,
                    media: { ...initialData.media, ...data.media },
                    socialLinks: { ...initialData.socialLinks, ...data.socialLinks },
                };
                setSiteData(mergedData);
            } else {
                setDoc(siteDataRef, initialData);
            }
        });
        return () => unsubscribe();
    }, []);


    const showNotification = (message, type) => setNotification({ message, type });
    const handleAdminLogin = () => setShowLoginModal(true);
    const handleLogout = () => { setIsAdmin(false); showNotification('Sessão de administrador encerrada.', 'success'); };
    
    const handleSaveChanges = async () => {
        try {
            await setDoc(siteDataRef, siteData);
            showNotification('Alterações salvas com sucesso!', 'success');
        } catch (error) {
            console.error("Erro ao salvar dados no Firebase: ", error);
            showNotification('Erro ao salvar as alterações.', 'error');
        }
    };

    const attemptLogin = (password) => { if (password === 'admin123') { setIsAdmin(true); showNotification('Login bem-sucedido!', 'success'); } else { showNotification('Senha incorreta.', 'error'); } setShowLoginModal(false); };
    
    const handleNavigate = (pageId) => setActivePageId(pageId);
    const handleShowPageCreator = () => setShowPageCreatorModal(true);
    
    const handleSavePages = (updatedPages) => {
        setSiteData(prev => ({ ...prev, pages: updatedPages }));
        setShowPageCreatorModal(false);
        showNotification('Páginas atualizadas com sucesso!', 'success');
    };

    const handleEdit = (type, context = {}) => {
        let itemToEdit = {};
        const carousel = context.carouselIndex !== undefined ? siteData.media.carousels[context.carouselIndex] : null;
        const slide = context.slideIndex !== undefined ? siteData.media.heroSlides[context.slideIndex] : null;
        switch(type) {
            case 'heroSlide': 
                itemToEdit = { type, ...context, data: { title: slide.title, description: slide.description, imageUrl: slide.imageUrl }, dimensions: '1600x900px', slideCount: siteData.media.heroSlides.length }; 
                if (context.slideIndex === 0) {
                    itemToEdit.data.transitionTime = siteData.media.heroTransitionTime || 5;
                }
                break;
            case 'primaryButton': 
                itemToEdit = { type, ...context, data: { ...slide.primaryButton } }; 
                break;
            case 'secondaryButton': 
                itemToEdit = { type, ...context, data: { ...slide.secondaryButton } }; 
                break;
            case 'carouselTitle': itemToEdit = { type, ...context, data: { title: carousel.title }}; break;
            case 'carouselItem': itemToEdit = { type, ...context, isOriginals: carousel.title.toLowerCase().includes('originais'), data: { ...carousel.items[context.itemIndex] }, dimensions: '400x600px'}; break;
            default: return;
        }
        setCurrentItem(itemToEdit); setIsEditing(true);
    };

    const handleAddItem = (carouselIndex) => {
        const carousel = siteData.media.carousels[carouselIndex];
        setCurrentItem({ 
            type: 'carouselItem', 
            carouselIndex, 
            isNew: true, 
            isOriginals: carousel.title.toLowerCase().includes('originais'), 
            data: { 
                title: 'Novo Item', 
                imageUrl: 'https://placehold.co/400x600/555555/FFFFFF?text=Novo', 
                useSiteColor: false,
                hasExternalLink: false,
                externalLink: ''
            }, 
            dimensions: '400x600px' 
        });
        setIsEditing(true);
    };
    
    const handleAddCarousel = () => {
        setSiteData(prev => ({ ...prev, media: { ...prev.media, carousels: [...prev.media.carousels, { id: `carousel-${Date.now()}`, title: 'Nova Seção', items: [] }] } }));
        showNotification('Nova seção adicionada!', 'success');
    };

    const handleAddHeroSlide = () => {
        setSiteData(prev => {
            const newSlides = [...prev.media.heroSlides];
            const newSlide = {
                id: Date.now(),
                title: 'Novo Destaque',
                description: 'Descrição do novo destaque.',
                imageUrl: 'https://placehold.co/1600x900/555555/FFFFFF?text=Novo+Destaque',
                primaryButton: { text: 'Assistir', link: '#' },
                secondaryButton: { text: 'Mais informações', infoText: 'Detalhes aqui.' }
            };
            newSlides.push(newSlide);
            return { ...prev, media: { ...prev.media, heroSlides: newSlides } };
        });
        showNotification('Novo destaque adicionado!', 'success');
    };

    const confirmDeletion = (type, context) => setDeleteConfirmation({ type, ...context });
    
    const executeDelete = () => {
        if (!deleteConfirmation) return;
        const { type, carouselIndex, itemIndex, slideIndex } = deleteConfirmation;
        setSiteData(prev => {
            const newCarousels = [...prev.media.carousels];
            const newSlides = [...prev.media.heroSlides];
            if (type === 'carousel') {
                newCarousels.splice(carouselIndex, 1);
            } else if (type === 'item') {
                newCarousels[carouselIndex].items.splice(itemIndex, 1);
            } else if (type === 'heroSlide') {
                if (newSlides.length > 1) { 
                    newSlides.splice(slideIndex, 1);
                }
            }
            return { ...prev, media: { ...prev.media, carousels: newCarousels, heroSlides: newSlides } };
        });
        setDeleteConfirmation(null);
        showNotification('Item excluído com sucesso.', 'success');
    };
    
    const handleSave = (updatedData) => {
        const { type, isNew, carouselIndex, itemIndex, slideIndex } = currentItem;
        setSiteData(prev => {
            const newData = JSON.parse(JSON.stringify(prev));
            if (type === 'heroSlide') { 
                if(updatedData.transitionTime !== undefined) {
                    newData.media.heroTransitionTime = parseInt(updatedData.transitionTime, 10) || 5;
                    delete updatedData.transitionTime;
                }
                newData.media.heroSlides[slideIndex] = { ...newData.media.heroSlides[slideIndex], ...updatedData };
            } else if (type === 'primaryButton') { newData.media.heroSlides[slideIndex].primaryButton = { ...newData.media.heroSlides[slideIndex].primaryButton, ...updatedData };
            } else if (type === 'secondaryButton') { newData.media.heroSlides[slideIndex].secondaryButton = { ...newData.media.heroSlides[slideIndex].secondaryButton, ...updatedData };
            } else if (type === 'carouselTitle') { newData.media.carousels[carouselIndex].title = updatedData.title;
            } else if (type === 'carouselItem') {
                if (isNew) {
                    newData.media.carousels[carouselIndex].items.push({ ...updatedData, id: Date.now() });
                } else {
                    newData.media.carousels[carouselIndex].items[itemIndex] = { ...newData.media.carousels[carouselIndex].items[itemIndex], ...updatedData };
                }
            }
            return newData;
        });
        setIsEditing(false); setCurrentItem(null);
        showNotification(`Conteúdo ${isNew ? 'adicionado' : 'atualizado'} com sucesso!`, 'success');
    };

    const handleDelete = () => {
        if (!currentItem) return;
        const { type, carouselIndex, itemIndex, slideIndex } = currentItem;
        if (type === 'heroSlide') {
            confirmDeletion('heroSlide', { slideIndex });
        } else if (type === 'carouselItem') {
            confirmDeletion('item', { carouselIndex, itemIndex });
        }
        setIsEditing(false);
        setCurrentItem(null);
    };

    const handleMoveCarousel = (index, direction) => {
        setSiteData(prev => {
            const newCarousels = [...prev.media.carousels];
            const targetIndex = direction === 'up' ? index - 1 : index + 1;

            if (targetIndex < 0 || targetIndex >= newCarousels.length) {
                return prev;
            }

            const temp = newCarousels[index];
            newCarousels[index] = newCarousels[targetIndex];
            newCarousels[targetIndex] = temp;
            
            return {
                ...prev,
                media: {
                    ...prev.media,
                    carousels: newCarousels,
                }
            };
        });
    };

    const handleSaveSiteSettings = (settings) => { setSiteData(prev => ({ ...prev, title: settings.title, color: settings.color })); setShowSiteSettingsModal(false); showNotification('Configurações do site salvas!', 'success'); }
    const handleSaveSocialLinks = (links) => { setSiteData(prev => ({ ...prev, socialLinks: links })); setShowSocialLinksModal(false); showNotification('Links sociais atualizados!', 'success'); }
    const showInfo = (title, content) => setInfoModalContent({ title, content });
    
    const activePage = siteData.pages.find(p => p.id === activePageId);

  return (
    <div className="app-container">
      <AppStyles siteColor={siteData.color} />
      <Notification message={notification.message} type={notification.type} onDismiss={() => setNotification({ message: '', type: '' })} />
      {showLoginModal && <LoginModal onLogin={attemptLogin} onClose={() => setShowLoginModal(false)} />}
      {isEditing && <EditModal item={currentItem} onSave={handleSave} onClose={() => setIsEditing(false)} onDelete={handleDelete} />}
      {showSiteSettingsModal && <SiteSettingsModal siteData={siteData} onSave={handleSaveSiteSettings} onClose={() => setShowSiteSettingsModal(false)} />}
      {showSocialLinksModal && <SocialLinksModal links={siteData.socialLinks} onSave={handleSaveSocialLinks} onClose={() => setShowSocialLinksModal(false)} />}
      {showPageCreatorModal && <PageCreatorModal pages={siteData.pages} onSave={handleSavePages} onClose={() => setShowPageCreatorModal(false)} />}
      {infoModalContent && <InfoModal title={infoModalContent.title} content={infoModalContent.content} onClose={() => setInfoModalContent(null)} />}
      {deleteConfirmation && <ConfirmDeleteModal message="Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita." onConfirm={executeDelete} onCancel={() => setDeleteConfirmation(null)} />}
      
      <Header siteTitle={siteData.title} siteColor={siteData.color} isAdmin={isAdmin} onAdminLogin={handleAdminLogin} socialLinks={siteData.socialLinks} onEditSite={() => setShowSiteSettingsModal(true)} pages={siteData.pages} activePageId={activePageId} onNavigate={handleNavigate} />
      <main>
        {activePageId === 'home' ? (
            <>
                 <HeroSection 
                    slides={siteData.media.heroSlides} 
                    transitionTime={siteData.media.heroTransitionTime}
                    isAdmin={isAdmin} 
                    onEdit={handleEdit} 
                    onShowInfo={showInfo}
                    onAddSlide={handleAddHeroSlide}
                />
                <div className="carousels-container">
                  {siteData.media.carousels.map((carousel, carouselIndex) => (
                    <MediaCarousel
                      key={carousel.id}
                      carousel={carousel} carouselIndex={carouselIndex} isAdmin={isAdmin} siteTitle={siteData.title} siteColor={siteData.color}
                      onEditTitle={() => handleEdit('carouselTitle', { carouselIndex })}
                      onAddItem={() => handleAddItem(carouselIndex)}
                      onEditItem={(itemIndex) => handleEdit('carouselItem', { carouselIndex, itemIndex })}
                      onDeleteItem={(itemIndex) => confirmDeletion('item', { carouselIndex, itemIndex })}
                      onDeleteCarousel={() => confirmDeletion('carousel', { carouselIndex })}
                      onMoveUp={() => handleMoveCarousel(carouselIndex, 'up')}
                      onMoveDown={() => handleMoveCarousel(carouselIndex, 'down')}
                      isFirst={carouselIndex === 0}
                      isLast={carouselIndex === siteData.media.carousels.length - 1}
                    />
                  ))}
                  {isAdmin && (<button onClick={handleAddCarousel} className="add-section-button"> <PlusIcon style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> Adicionar Nova Seção </button>)}
                </div>
            </>
        ) : (
            <CustomPageView page={activePage} />
        )}
      </main>
      {isAdmin && <AdminBar onSave={handleSaveChanges} onLogout={handleLogout} onEditSocial={() => setShowSocialLinksModal(true)} onShowPageCreator={handleShowPageCreator} />}
      <Footer />
    </div>
  );
}

