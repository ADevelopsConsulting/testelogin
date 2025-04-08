document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita o envio do formulário padrão
  
  const login = document.getElementById('login').value;
  const senha = document.getElementById('senha').value;
  
  if (login === 'admin' && senha === 'admin') {
    alert('Sucesso!');
    window.location.href = 'Calculadora_DIFAL.html';
  } else {
    alert('Usuário ou senha incorretos');
  }
});
