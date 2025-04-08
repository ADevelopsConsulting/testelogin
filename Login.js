document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const login = document.getElementById('login').value.trim();
  const senha = document.getElementById('senha').value;

  // Carrega todos os usuários salvos no localStorage
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  
  // Busca o usuário na array de usuários
  const usuarioData = usuarios.find(u => u.usuario === login);
  
  if (usuarioData && usuarioData.senha === senha) {
    alert('Sucesso!');
    window.location.href = 'menu.html';
  } else {
    alert('Usuario ou senha incorretos');
  }
});
