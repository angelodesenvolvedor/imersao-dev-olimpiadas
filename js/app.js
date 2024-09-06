// Importar dados e funções do dados.js
import { MESSAGES, getGoogleSearchURL, formatMessage } from './dados.js';

// Selecionar elementos
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const resultsSection = document.getElementById('results-section');
const errorMessage = document.getElementById('error-message');

// Verifica se os elementos DOM existem
if (!searchInput || !searchButton || !resultsSection || !errorMessage) {
    console.error("Um ou mais elementos DOM não foram encontrados.");
    throw new Error("Elementos DOM necessários não encontrados.");
}

// Criar e adicionar mensagens ao DOM
const confirmationMessage = createMessageElement('confirmation');
const customMessage = createMessageElement('custom');

resultsSection.appendChild(confirmationMessage);
resultsSection.appendChild(customMessage);

// Adicionar o listener de clique
searchButton.addEventListener('click', handleSearchClick);

// Função para criar um elemento de mensagem
function createMessageElement(type) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(`${type}-message`); // Adiciona uma classe para estilização
    messageElement.style.display = 'none';
    messageElement.style.textAlign = 'center';
    messageElement.style.marginTop = '10px';
    messageElement.style.fontSize = '16px';
    messageElement.style.transition = 'opacity 0.3s ease'; // Adiciona uma transição suave

    if (type === 'confirmation') {
        messageElement.style.color = 'green';
    } else if (type === 'custom') {
        messageElement.style.color = 'blue';
    }

    return messageElement;
}

// Função para lidar com o clique no botão de pesquisa
function handleSearchClick() {
    const nomeAtleta = searchInput.value.trim().toLowerCase();

    if (!nomeAtleta) {
        displayError(MESSAGES.ERROR_EMPTY_INPUT);
        return;
    }

    // Limpar mensagem de erro e campo de entrada
    clearError();
    searchInput.value = '';

    // Atualizar e exibir mensagens
    updateMessage(confirmationMessage, MESSAGES.CONFIRMATION_SEARCH, nomeAtleta);
    const googleSearchURL = getGoogleSearchURL(nomeAtleta);
    customMessage.innerHTML = formatMessage(MESSAGES.CUSTOM_SEARCH_LINK, { nome: nomeAtleta, url: googleSearchURL });
    customMessage.style.display = 'block';

    // Ocultar mensagens após 5 segundos
    setTimeout(() => {
        confirmationMessage.style.display = 'none';
        customMessage.style.display = 'none';
    }, 5000);

    // Redirecionar para o Google em uma nova aba
    window.open(googleSearchURL, '_blank');  // Abre a busca em uma nova aba
}

// Função para atualizar e exibir uma mensagem
function updateMessage(element, messageTemplate, nomeAtleta) {
    element.textContent = formatMessage(messageTemplate, { nome: nomeAtleta });
    element.style.display = 'block';
}

// Função para exibir mensagem de erro
function displayError(message) {
    if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    } else {
        console.error(message);
    }
}

// Função para limpar mensagem de erro
function clearError() {
    if (errorMessage) {
        errorMessage.textContent = '';
        errorMessage.style.display = 'none';
    }
}