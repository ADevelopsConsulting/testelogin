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

// Validação em tempo real da senha
document.addEventListener('DOMContentLoaded', function() {
  const senhaInput = document.getElementById('senha');
  const confirmaInput = document.getElementById('confirmaSenha');
  const reqLength = document.getElementById('req-length');
  const reqLetter = document.getElementById('req-letter');
  const reqNumber = document.getElementById('req-number');
  
  const validarSenha = () => {
    const senha = senhaInput.value;
    
    // Validar comprimento
    if (senha.length >= 6) {
      reqLength.classList.add('valid');
    } else {
      reqLength.classList.remove('valid');
    }
    
    // Validar letra
    if (/[a-zA-Z]/.test(senha)) {
      reqLetter.classList.add('valid');
    } else {
      reqLetter.classList.remove('valid');
    }
    
    // Validar número
    if (/[0-9]/.test(senha)) {
      reqNumber.classList.add('valid');
    } else {
      reqNumber.classList.remove('valid');
    }
  };
  
  senhaInput.addEventListener('input', validarSenha);
  
  // Verificar se as senhas coincidem
  confirmaInput.addEventListener('input', function() {
    if (confirmaInput.value && confirmaInput.value === senhaInput.value) {
      confirmaInput.style.borderColor = 'rgba(48, 209, 88, 0.7)';
      confirmaInput.style.boxShadow = '0 0 12px rgba(48, 209, 88, 0.4)';
    } else if (confirmaInput.value) {
      confirmaInput.style.borderColor = 'rgba(255, 69, 58, 0.7)';
      confirmaInput.style.boxShadow = '0 0 12px rgba(255, 69, 58, 0.4)';
    } else {
      confirmaInput.style.borderColor = '';
      confirmaInput.style.boxShadow = '';
    }
  });
});

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

// Função principal de cadastro
document.getElementById('cadastroForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  const cadastroButton = this.querySelector('button[type="submit"]');
  const buttonText = cadastroButton.innerHTML;
  
  // Adiciona efeito de carregamento
  cadastroButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processando...';
  cadastroButton.classList.add('loading');
  
  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const usuario = document.getElementById('usuario').value.trim();
  const senha = document.getElementById('senha').value;
  const confirmaSenha = document.getElementById('confirmaSenha').value;

  // Simula atraso de rede
  setTimeout(() => {
    // Reset do botão em caso de erro
    const resetButton = () => {
      cadastroButton.innerHTML = buttonText;
      cadastroButton.classList.remove('loading');
    };

    // Validações
    if (!nome || !email || !usuario || !senha) {
      resetButton();
      mostrarMensagem('Por favor, preencha todos os campos.', false);
      animarErro();
      return;
    }

    if (senha !== confirmaSenha) {
      resetButton();
      mostrarMensagem('As senhas não coincidem.', false);
      animarErro();
      return;
    }

    if (senha.length < 6 || !/[a-zA-Z]/.test(senha) || !/[0-9]/.test(senha)) {
      resetButton();
      mostrarMensagem('Sua senha não atende aos requisitos de segurança.', false);
      animarErro();
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      resetButton();
      mostrarMensagem('Por favor, insira um e-mail válido.', false);
      animarErro();
      return;
    }

    // Verificar se já existe usuário
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuarios.some(u => u.usuario.toLowerCase() === usuario.toLowerCase())) {
      resetButton();
      mostrarMensagem('Este nome de usuário já está em uso.', false);
      animarErro();
      return;
    }
    
    if (usuarios.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      resetButton();
      mostrarMensagem('Este e-mail já está cadastrado.', false);
      animarErro();
      return;
    }

    // Salvar o usuário
    const usuarioData = { 
      nome, 
      email, 
      usuario,
      senha,
      dataCadastro: new Date().toISOString()
    };
    
    usuarios.push(usuarioData);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Mostrar sucesso
    cadastroButton.innerHTML = '<i class="fas fa-check"></i> Sucesso!';
    mostrarMensagem('Cadastro realizado com sucesso!', true);
    
    // Redirecionar para o login
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 2000);
  }, 800);
});

// Função para animar o container quando há erro
function animarErro() {
  const container = document.querySelector('.container');
  container.classList.add('erro-shake');
  
  setTimeout(() => {
    container.classList.remove('erro-shake');
  }, 500);
}

// Aplicar classe de animação para o container se não existir
if (!document.head.querySelector('style#custom-animations')) {
  document.head.insertAdjacentHTML('beforeend', `
    <style id="custom-animations">
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
}
