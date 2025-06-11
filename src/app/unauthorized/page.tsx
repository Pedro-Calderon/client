"use client";

import React from "react";

const NotFoundPage = () => {
  return (
    <div
      dangerouslySetInnerHTML={{
__html: `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Página No Encontrada - InnovaTube</title><style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Roboto','Helvetica','Arial',sans-serif;background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);color:#fff;min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;overflow:hidden;position:relative}
body::before{content:'';position:absolute;top:0;left:0;width:100%;height:100%;background:radial-gradient(circle at 20% 80%,rgba(233,30,99,.1) 0%,transparent 50%),radial-gradient(circle at 80% 20%,rgba(255,64,129,.1) 0%,transparent 50%),radial-gradient(circle at 40% 40%,rgba(233,30,99,.05) 0%,transparent 50%);animation:pulse 4s ease-in-out infinite alternate}
@keyframes pulse{0%{opacity:.5}100%{opacity:1}}
.container{text-align:center;z-index:1;max-width:600px;padding:2rem;position:relative}
.logo{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:3rem;animation:fadeInDown 1s ease-out}
.logo-icon{width:48px;height:48px;background:linear-gradient(135deg,#e91e63,#ff4081);border-radius:12px;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 32px rgba(233,30,99,.3)}
.logo-icon svg{width:28px;height:28px;color:#fff}
.logo-text{font-size:1.8rem;font-weight:700;letter-spacing:.05rem;color:#ff4081;text-shadow:0 2px 10px rgba(255,64,129,.3)}
.error-number{font-size:8rem;font-weight:900;background:linear-gradient(135deg,#e91e63,#ff4081);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1;margin-bottom:1rem;animation:fadeInUp 1s ease-out .2s both,glow 2s ease-in-out infinite alternate;text-shadow:0 0 30px rgba(255,64,129,.5)}
@keyframes glow{from{filter:drop-shadow(0 0 20px rgba(255,64,129,.3))}to{filter:drop-shadow(0 0 40px rgba(255,64,129,.6))}}
.error-icon{width:100px;height:100px;margin:0 auto 2rem;background:linear-gradient(135deg,rgba(255,64,129,.1),rgba(233,30,99,.1));border:2px solid rgba(255,64,129,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;animation:fadeInUp 1s ease-out .4s both,bounce 2s ease-in-out infinite}
@keyframes bounce{0%,20%,50%,80%,100%{transform:translateY(0)}40%{transform:translateY(-10px)}60%{transform:translateY(-5px)}}
.error-icon svg{width:50px;height:50px;color:#ff4081}
.title{font-size:2.5rem;font-weight:700;margin-bottom:1rem;color:#fff;animation:fadeInUp 1s ease-out .6s both}
.subtitle{font-size:1.2rem;color:rgba(255,255,255,.8);margin-bottom:2rem;line-height:1.6;animation:fadeInUp 1s ease-out .8s both}
.error-card{background:rgba(255,64,129,.05);border:1px solid rgba(255,64,129,.2);border-radius:16px;padding:2rem;margin-bottom:2rem;backdrop-filter:blur(10px);animation:fadeInUp 1s ease-out 1s both}
.error-message{font-size:1.1rem;color:rgba(255,255,255,.9);margin-bottom:1rem}
.suggestions{list-style:none;text-align:left;margin-top:1rem}
.suggestions li{padding:.5rem 0;color:rgba(255,255,255,.7);display:flex;align-items:center;gap:12px}
.suggestions li::before{content:'•';color:#ff4081;font-weight:bold;font-size:1.2rem}
.back-button{background:linear-gradient(135deg,#e91e63,#ff4081);color:#fff;border:none;padding:1rem 2.5rem;border-radius:12px;font-size:1.1rem;font-weight:600;cursor:pointer;transition:all .3s ease;box-shadow:0 4px 20px rgba(255,64,129,.3);animation:fadeInUp 1s ease-out 1.2s both;text-transform:none;letter-spacing:.5px;display:inline-flex;align-items:center;gap:10px;text-decoration:none}
.back-button:hover{transform:translateY(-3px);box-shadow:0 8px 30px rgba(255,64,129,.5);background:linear-gradient(135deg,#f06292,#f8bbd0)}
.back-button:active{transform:translateY(-1px)}
.back-button svg{transition:transform .3s ease}
.back-button:hover svg{transform:translateX(-3px)}
@keyframes fadeInDown{from{opacity:0;transform:translateY(-30px)}to{opacity:1;transform:translateY(0)}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
@media (max-width:768px){.container{padding:1rem}.error-number{font-size:6rem}.title{font-size:2rem}.subtitle{font-size:1rem}.logo-text{font-size:1.5rem}.error-icon{width:80px;height:80px}.error-icon svg{width:40px;height:40px}.error-card{padding:1.5rem}.back-button{padding:.8rem 2rem;font-size:1rem}}
</style></head><body>
<div class="container">
  <div class="logo">
    <div class="logo-icon">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 16.5l6-4.5-6-4.5v9z"/><path d="M24 0v24H0V0h24z" fill="none"/>
      </svg>
    </div>
    <div class="logo-text">INNOVATUBE</div>
  </div>
  <div class="error-number">404</div>
  <div class="error-icon">
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
    </svg>
  </div>
  <h1 class="title">¡Oops! Página No Encontrada</h1>
  <p class="subtitle">Parece que esta página ya no existe o fue movida.<br>Pero no te preocupes, hay muchos videos esperándote en InnovaTube 🎥</p>
  <div class="error-card">
    <div class="error-message"><strong>Error:</strong> Página no disponible</div>
    <p style="color: rgba(255, 255, 255, 0.7); margin-bottom: 1rem;">Esto puede deberse a:</p>
    <ul class="suggestions">
      <li>La URL fue escrita incorrectamente</li>
      <li>El enlace está roto o expirado</li>
      <li>La página fue removida</li>
      <li>No has iniciado sesión</li>
    </ul>
  </div>
  <a href="/" class="back-button">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
    </svg>
    Regresar al Inicio
  </a>
</div>
</body></html>`
      }}
    />
  );
};

export default NotFoundPage;
