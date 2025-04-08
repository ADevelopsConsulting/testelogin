document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value;
    const mensagem = document.getElementById('mensagem');

    // Carrega usuários
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    // Verifica se o usuário existe e a senha está correta
    const usuarioEncontrado = usuarios.find(u => u.usuario === usuario && u.senha === senha);

    if (usuarioEncontrado) {
        mostrarMensagem(`Bem-vindo, ${usuarioEncontrado.nome}!`, true);
        // Aqui você pode redirecionar para uma página de dashboard ou outra ação
        setTimeout(() => {
            // Exemplo: redirecionar para uma página de sucesso
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        mostrarMensagem('Usuário ou senha incorretos!', false);
    }
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
    mensagem.className = 'mensagem' + (sucesso ? ' sucesso' : '');
    setTimeout(() => {
        mensagem.style.display = 'none';
    }, 3000);
}
