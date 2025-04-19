// Função para alternar a visibilidade da senha
function togglePassword(inputId, toggleElement) {
  const input = document.getElementById(inputId);
  const icon = toggleElement.querySelector('i') || toggleElement;
  
  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash');
  } else {
    input.type = 'password';
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye');
  }
}

// Função para mostrar mensagens
function mostrarMensagem(texto, sucesso) {
  const mensagem = document.getElementById('mensagem');
  mensagem.textContent = texto;
  mensagem.className = 'mensagem ' + (sucesso ? 'sucesso' : 'erro');
  mensagem.style.display = 'block';
  
  // Adiciona classe de animação após um pequeno delay
  setTimeout(() => {
    mensagem.classList.add('show');
  }, 10);

  if (sucesso) {
    setTimeout(() => {
      mensagem.classList.remove('show');
      setTimeout(() => {
        mensagem.style.display = 'none';
      }, 300);
    }, 2000);
  } else {
    setTimeout(() => {
      mensagem.classList.remove('show');
      setTimeout(() => {
        mensagem.style.display = 'none';
      }, 300);
    }, 3000);
  }
}

// Adicionar efeito ao botão quando pressionado
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('mousedown', function() {
    this.style.transform = 'scale(0.98)';
  });
  
  button.addEventListener('mouseup', function() {
    this.style.transform = '';
  });
  
  button.addEventListener('mouseleave', function() {
    this.style.transform = '';
  });
});

// Função principal de login
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const loginButton = this.querySelector('button[type="submit"]');
  const buttonText = loginButton.innerHTML;
  
  // Adiciona efeito de carregamento
  loginButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Autenticando...';
  loginButton.classList.add('loading');
  
  const login = document.getElementById('login').value.trim();
  const senha = document.getElementById('senha').value;

  // Simula atraso de rede
  setTimeout(() => {
    // Valida campos vazios
    if (!login || !senha) {
      loginButton.innerHTML = buttonText;
      loginButton.classList.remove('loading');
      mostrarMensagem('Preencha todos os campos', false);
      return;
    }

    // Carrega todos os usuários salvos no localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Busca o usuário na array de usuários
    const usuarioData = usuarios.find(u => u.usuario === login);
    
    if (usuarioData && usuarioData.senha === senha) {
      mostrarMensagem('Login realizado com sucesso!', true);
      
      setTimeout(() => {
        loginButton.innerHTML = '<i class="fas fa-check"></i> Sucesso!';
        
        // Armazena dados da sessão
        const sessao = {
          usuario: usuarioData.usuario,
          nome: usuarioData.nome,
          logado: true,
          timestamp: new Date().getTime()
        };
        
        localStorage.setItem('sessao_atual', JSON.stringify(sessao));
        
        // Redireciona após 1 segundo
        setTimeout(() => {
          window.location.href = 'https://antonioalves1996.github.io/Calculadoras_Fiscais/';
        }, 1000);
      }, 500);
    } else {
      loginButton.innerHTML = buttonText;
      loginButton.classList.remove('loading');
      mostrarMensagem('Usuário ou senha incorretos', false);
      
      // Anima o formulário para indicar erro
      const container = document.querySelector('.container');
      container.classList.add('erro-shake');
      
      setTimeout(() => {
        container.classList.remove('erro-shake');
      }, 500);
    }
  }, 800); // Simula atraso de rede de 800ms
});

// Verifica se há sessão ativa
document.addEventListener('DOMContentLoaded', function() {
  const sessao = JSON.parse(localStorage.getItem('sessao_atual'));
  
  if (sessao && sessao.logado) {
    const agora = new Date().getTime();
    const tempoDecorrido = agora - sessao.timestamp;
    
    // Verifica se a sessão expirou (4 horas)
    if (tempoDecorrido < 4 * 60 * 60 * 1000) {
      mostrarMensagem(`Bem-vindo de volta, ${sessao.nome}!`, true);
      
      setTimeout(() => {
        window.location.href = 'https://antonioalves1996.github.io/Calculadoras_Fiscais/';
      }, 1500);
    } else {
      // Sessão expirada
      localStorage.removeItem('sessao_atual');
    }
  }
});

// Adicionar classe para CSS de animação de erro
document.head.insertAdjacentHTML('beforeend', `
  <style>
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    .erro-shake {
      animation: shake 0.5s ease;
    }
  </style>
`);
