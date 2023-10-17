const mensagemInstrucao = document.querySelector('[data-instrucao]');
const botaoIniciarCamera = document.querySelector('[data-video-botao]');
const campoCamera = document.querySelector('[data-camera]');
const video = document.querySelector('[data-video]');
const botaoTirarFoto = document.querySelector('[data-tirar-foto]');
const campoMensagem = document.querySelector('[data-mensagem]');
const botaoNovaFoto = document.querySelector('[data-tirar-nova-foto]')
const canvas = document.querySelector('[data-video-canvas]');
const botaoEnviarFoto = document.querySelector('[data-enviar]');

let imagemURL = '';

async function iniciarCamera() {
    const iniciarVideo = await navigator.mediaDevices.getUserMedia({video: true, audio: false});

    mensagemInstrucao.style.display = 'none';
    botaoIniciarCamera.style.display = 'none';
    campoCamera.style.display = 'block';

    video.srcObject = iniciarVideo;
}

botaoIniciarCamera.addEventListener('click', iniciarCamera);

botaoTirarFoto.addEventListener('click', () => {
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    imagemURL = canvas.toDataURL('image/jpeg');

    campoCamera.style.display = 'none';
    campoMensagem.style.display = 'block';
});

botaoNovaFoto.addEventListener('click', () => {
    campoMensagem.style.display = 'none';
    iniciarCamera();
});

botaoEnviarFoto.addEventListener('click', () => {
    const receberDadosExistentes = localStorage.getItem('cadastro');
    const converteRetorno = JSON.parse(receberDadosExistentes);

    converteRetorno.imagem = imagemURL;

    localStorage.setItem('cadastro', JSON.stringify(converteRetorno));

    window.location.href = './abrir-conta-form-3.html';
});