// Dados e configurações do projeto

// URL base para busca no Google
const BASE_GOOGLE_SEARCH_URL = 'https://www.google.com/search?q=';

// Mensagens padrão
const MESSAGES = {
    ERROR_EMPTY_INPUT: 'Por favor, digite o nome do atleta.',
    CONFIRMATION_SEARCH: 'Você está realizando uma busca por "{nome}".',
    CUSTOM_SEARCH_LINK: 'Confira os resultados da pesquisa para <strong>"{nome}"</strong> no Google. <a href="{url}" target="_blank">Veja a pesquisa aqui</a>.'
};

// Função para obter a URL de busca
/**
 * Gera a URL de busca no Google com base na consulta fornecida.
 * @param {string} query - A consulta de pesquisa.
 * @returns {string} - A URL de busca no Google.
 * @throws {Error} - Se a consulta de pesquisa estiver vazia ou não for uma string.
 */
function getGoogleSearchURL(query) {
    if (typeof query !== 'string' || !query.trim()) {
        throw new Error('A consulta de pesquisa deve ser uma string não vazia.');
    }
    return `${BASE_GOOGLE_SEARCH_URL}${encodeURIComponent(query)}`;
}

// Função para formatar mensagens
/**
 * Formata uma mensagem substituindo os placeholders com os valores fornecidos.
 * @param {string} template - A string de modelo com placeholders.
 * @param {Object} replacements - Um objeto contendo as substituições para os placeholders.
 * @returns {string} - A mensagem formatada.
 * @throws {TypeError} - Se o template não for uma string ou as substituições não forem um objeto.
 */
function formatMessage(template, replacements) {
    if (typeof template !== 'string') {
        throw new TypeError('O template deve ser uma string.');
    }
    if (typeof replacements !== 'object' || replacements === null) {
        throw new TypeError('As substituições devem ser um objeto.');
    }
    
    return template.replace(/{(\w+)}/g, (_, key) => {
        return key in replacements ? replacements[key] : `{${key}}`; // Retorna o placeholder se não for encontrado
    });
}

// Exporta dados e funções
export { MESSAGES, getGoogleSearchURL, formatMessage };