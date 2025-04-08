document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;
    const mensagem = document.getElementById('mensagem');

    // Validações
    if (!nome || !email || !usuario || !senha || !confirmaSenha) {
        mostrarMensagem('Por favor, preencha todos os campos.', false);
        return;
    }

    if (senha !== confirmaSenha) {
        mostrarMensagem('As senhas não coincidem!', false);
        return;
    }

    if (senha.length < 6) {
        mostrarMensagem('A senha deve ter pelo menos 6 caracteres!', false);
        return;
    }

    // Validação de e-mail simples
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarMensagem('Por favor, insira um e-mail válido!', false);
        return;
    }

    // Carrega usuários existentes
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se o usuário ou e-mail já existe
    if (usuarios.some(u => u.usuario === usuario)) {
        mostrarMensagem('Este usuário já está cadastrado!', false);
        return;
    }
    if (usuarios.some(u => u.email === email)) {
        mostrarMensagem('Este e-mail já está cadastrado!', false);
        return;
    }

    // Salva o novo usuário
    const usuarioData = { nome, email, usuario, senha };
    usuarios.push(usuarioData);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Exibe mensagem de sucesso e redireciona
    mostrarMensagem('Cadastro realizado com sucesso! Redirecionando...', true);
    setTimeout(() => {
        window.location.href = 'index.html'; // Mantido como login.html
    }, 2000); // Aumentei para 2 segundos para dar tempo de ler a mensagem
});

// Função para alternar visibilidade da senha
function togglePassword(inputId, element) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        element.textContent = '🙈';
        element.style.color = '#fff';
    } else {
        input.type = 'password';
        element.textContent = '👁️';
        element.style.color = 'rgba(255, 255, 255, 0.6)';
    }
}

// Função para mostrar mensagens de erro ou sucesso
function mostrarMensagem(texto, sucesso) {
    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = texto;
    mensagem.style.display = 'block';
    mensagem.className = 'mensagem' + (sucesso ? ' sucesso' : ' erro'); // Adicionei 'erro' para clareza
    if (sucesso) {
        setTimeout(() => {
            mensagem.style.display = 'none';
        }, 2000); // Ajustado para 2 segundos apenas no sucesso
    } else {
        setTimeout(() => {
            mensagem.style.display = 'none';
        }, 3000); // Mantido 3 segundos para erros
    }
}
