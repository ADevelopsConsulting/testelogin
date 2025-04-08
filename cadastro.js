document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const usuario = document.getElementById('usuario').value.trim();
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;
    const mensagem = document.getElementById('mensagem');

    // Validacoes
    if (!nome || !email || !usuario || !senha || !confirmaSenha) {
        mostrarMensagem('Por favor, preencha todos os campos.', false);
        return;
    }

    if (senha !== confirmaSenha) {
        mostrarMensagem('As senhas nao coincidem.', false);
        return;
    }

    if (senha.length < 6) {
        mostrarMensagem('A senha deve ter pelo menos 6 caracteres.', false);
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        mostrarMensagem('Por favor, insira um e-mail valido.', false);
        return;
    }

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.some(u => u.usuario === usuario)) {
        mostrarMensagem('Este usuario ja esta cadastrado.', false);
        return;
    }
    if (usuarios.some(u => u.email === email)) {
        mostrarMensagem('Este e-mail ja esta cadastrado.', false);
        return;
    }

    const usuarioData = { nome, email, usuario, senha };
    usuarios.push(usuarioData);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    mostrarMensagem('Cadastro realizado com sucesso. Redirecionando...', true);
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
});

function mostrarMensagem(texto, sucesso) {
    const mensagem = document.getElementById('mensagem');
    mensagem.textContent = texto;
    mensagem.style.display = 'block';
    mensagem.className = 'mensagem' + (sucesso ? ' sucesso' : ' erro');
    if (sucesso) {
        setTimeout(() => {
            mensagem.style.display = 'none';
        }, 2000);
    } else {
        setTimeout(() => {
            mensagem.style.display = 'none';
        }, 3000);
    }
}
