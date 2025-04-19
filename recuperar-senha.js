document.addEventListener('DOMContentLoaded', function() {
    const recuperarForm = document.getElementById('recuperarForm');
    const mensagemDiv = document.getElementById('mensagem');
    const usuarioInput = document.getElementById('usuario');
    const emailInput = document.getElementById('email');
    const submitButton = recuperarForm.querySelector('button[type="submit"]');
    const buttonText = submitButton.querySelector('span');
    
    // Função para exibir mensagens
    function mostrarMensagem(texto, tipo) {
        mensagemDiv.textContent = texto;
        mensagemDiv.className = 'mensagem ' + tipo + ' show';
        
        // Esconde a mensagem após 5 segundos
        setTimeout(() => {
            mensagemDiv.classList.remove('show');
            setTimeout(() => {
                mensagemDiv.className = 'mensagem';
            }, 300);
        }, 5000);
    }
    
    // Função para validar email
    function validarEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    
    // Função para validar usuário
    function validarUsuario(usuario) {
        return usuario.trim().length >= 3;
    }
    
    // Simulação do envio do código de recuperação
    function simularEnvioCodigoRecuperacao(usuario, email) {
        return new Promise((resolve, reject) => {
            // Simula uma chamada de API com um atraso
            setTimeout(() => {
                // Simula validação de dados no servidor
                // Para fins de demonstração, consideramos que um usuário "admin" com email "admin@example.com" existe
                if (usuario === 'admin' && email === 'admin@example.com') {
                    resolve({ success: true, message: 'Código de recuperação enviado para o seu email.' });
                } else if (usuario === 'admin' && email !== 'admin@example.com') {
                    reject({ success: false, message: 'O email não corresponde ao usuário informado.' });
                } else {
                    reject({ success: false, message: 'Usuário não encontrado em nosso sistema.' });
                }
            }, 2000); // Atraso de 2 segundos para simular o tempo de resposta da API
        });
    }
    
    // Manipular o envio do formulário
    recuperarForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const usuario = usuarioInput.value;
        const email = emailInput.value;
        
        // Validação do lado do cliente
        if (!validarUsuario(usuario)) {
            mostrarMensagem('O nome de usuário deve ter pelo menos 3 caracteres.', 'erro');
            usuarioInput.focus();
            return;
        }
        
        if (!validarEmail(email)) {
            mostrarMensagem('Por favor, insira um endereço de email válido.', 'erro');
            emailInput.focus();
            return;
        }
        
        // Adiciona classe de carregamento ao botão
        submitButton.classList.add('loading');
        buttonText.textContent = 'Enviando...';
        submitButton.disabled = true;
        
        // Tentar enviar o código de recuperação
        simularEnvioCodigoRecuperacao(usuario, email)
            .then(response => {
                mostrarMensagem(response.message, 'sucesso');
                
                // Redirecionar para página de confirmação de código após 3 segundos
                setTimeout(() => {
                    // Aqui você poderia redirecionar para uma página de confirmação de código
                    // window.location.href = 'confirmar-codigo.html';
                    
                    // Por enquanto, apenas resetamos o formulário
                    recuperarForm.reset();
                }, 3000);
            })
            .catch(error => {
                mostrarMensagem(error.message, 'erro');
            })
            .finally(() => {
                // Remove a classe de carregamento e restaura o botão
                setTimeout(() => {
                    submitButton.classList.remove('loading');
                    buttonText.textContent = 'Enviar código';
                    submitButton.disabled = false;
                }, 500);
            });
    });
    
    // Adicionar efeitos de interatividade aos inputs
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        // Efeito ao focar no input
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        // Efeito ao retirar o foco do input
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Checar se o input já tem valor ao carregar a página
        if (input.value.trim() !== '') {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Efeito de ripple nos botões
    submitButton.addEventListener('mousedown', function(e) {
        const button = this;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;
        
        ripple.style.width = ripple.style.height = `${size}px`;
        ripple.style.left = `${e.clientX - rect.left - size/2}px`;
        ripple.style.top = `${e.clientY - rect.top - size/2}px`;
        ripple.classList.add('ripple');
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});
