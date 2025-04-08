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
    
    // Gera um código de verificação de 6 dígitos
    const codigoVerificacao = Math.floor(100000 + Math.random() * 900000);
    
    // Armazena o código temporariamente no localStorage com prazo de validade (ex: 10 minutos)
    const dadosRecuperacao = {
        codigo: codigoVerificacao,
        usuario: usuario,
        expira: Date.now() + 10 * 60 * 1000 // 10 minutos em milissegundos
    };
    localStorage.setItem('recuperacao_' + usuario, JSON.stringify(dadosRecuperacao));
    
    // Simulação de envio de e-mail com o código
    const mensagem = `Olá, ${usuarioData.nome}!\n\nSeu código de verificação é: ${codigoVerificacao}\n\nEste código expira em 10 minutos.`;
    console.log('E-mail simulado enviado para:', email);
    console.log(mensagem);
    
    alert('Um e-mail com o código de verificação foi enviado para ' + email + '! (Verifique o console para simulação)');
    
    // Solicita o código do usuário
    const codigoInserido = prompt('Insira o código de verificação recebido no e-mail:');
    
    // Verifica o código
    const recuperacaoData = JSON.parse(localStorage.getItem('recuperacao_' + usuario));
    
    if (!recuperacaoData || recuperacaoData.expira < Date.now()) {
        alert('Código expirado ou inválido!');
        localStorage.removeItem('recuperacao_' + usuario);
        return;
    }
    
    if (parseInt(codigoInserido) !== recuperacaoData.codigo) {
        alert('Código incorreto!');
        return;
    }
    
    // Se o código estiver correto, mostra a senha
    alert(`Senha recuperada com sucesso!\nSua senha é: ${usuarioData.senha}`);
    localStorage.removeItem('recuperacao_' + usuario); // Limpa o código usado
    window.location.href = 'login.html';
});
