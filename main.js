var login = document.getElementById('login').value;
var senha = document.getElementById('senha').value;

if (login == 'admim' && senha == 'admim') {
  alert('sucesso');
  location.href('Calculadora_DIFAL.html')
  
} else {
  alert('Usuário ou senha incorretos');
}