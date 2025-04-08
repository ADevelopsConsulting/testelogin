document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const usuario = document.getElementById('usuario').value;
    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirmaSenha').value;
    
    // Validações
    if (senha !== confirmaSenha) {
        alert('As senhas não coincidem!');
        return;
    }
    
    if (senha.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres!');
        return;
    }
    
    // Verifica se o usuário já existe
    if (localStorage.getItem('usuario_' + usuario)) {
        alert('Este usuário já está cadastrado!');
        return;
    }
    
    // Salva os dados no localStorage
    const usuarioData = {
        nome: nome,
        email: email,
        usuario: usuario,
        senha: senha
    };
    
    localStorage.setItem('usuario_' + usuario, JSON.stringify(usuarioData));
    alert('Cadastro realizado com sucesso!');
    window.location.href = 'login.html';
});

// Função para alternar visibilidade da senha
function togglePassword(inputId, element) {
    const input = document.getElementById(inputId);
    if (input.type === 'password') {
        input.type = 'text';
        element.style.color = '#fff'; // Muda a cor para branco ao mostrar
    } else {
        input.type = 'password';
        element.style.color = 'rgba(255, 255, 255, 0.6)'; // Volta à cor original
    }
}
