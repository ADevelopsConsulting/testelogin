document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário padrão

    var login = document.getElementById('login').value;
    var senha = document.getElementById('senha').value;

    if (login === 'admin' && senha === 'admin') {
        alert('Sucesso!');
        window.location.href = 'Calculadora_DIFAL.html'; // Correção na forma de redirecionamento
    } else {
        alert('Usuário ou senha incorretos');
    }
});
