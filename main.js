document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const login = document.getElementById('login').value;
  const senha = document.getElementById('senha').value;
  
  // Verifica se o usuário existe no localStorage
  const usuarioData = JSON.parse(localStorage.getItem('usuario_' + login));
  
  if (usuarioData && usuarioData.senha === senha) {
    alert('Sucesso!');
    window.location.href = 'Calculadora_DIFAL.html';
  } else {
    alert('Usuário ou senha incorretos');
  }
});
