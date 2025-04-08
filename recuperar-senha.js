document.getElementById('recuperarForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const usuario = document.getElementById('usuario').value;
  const email = document.getElementById('email').value;
  
  // Verifica se o usuário existe no localStorage
  const usuarioData = JSON.parse(localStorage.getItem('usuario_' + usuario));
  
  if (!usuarioData) {
    alert('Usuário não encontrado!');
    return;
  }
  
  if (usuarioData.email !== email) {
    alert('E-mail não corresponde ao usuário informado!');
    return;
  }
  
  // Simulação de envio de e-mail com a senha
  const mensagem = `Olá, ${usuarioData.nome}!\n\nSua senha é: ${usuarioData.senha}\n\nUse-a para fazer login.`;
  console.log('E-mail simulado enviado para:', email);
  console.log(mensagem);
  
  alert('Um e-mail com sua senha foi enviado para ' + email + '! (Verifique o console para simulação)');
  window.location.href = 'login.html';
});