// 🔒 Trava orientação nativa (suporte limitado)
if (screen.orientation && screen.orientation.lock) {
  screen.orientation.lock('portrait').catch(() => {});
}

// 🚀 FUNÇÃO DE ENVIO PARA WHATSAPP
function enviarWhats(bairroAula, horario) {
  const nome = document.getElementById('nome_user').value;
  const rua = document.getElementById('rua_user').value;
  const numCasa = document.getElementById('num_casa_user').value;
  const bairro = document.getElementById('bairro_user').value;
  const tamanho = document.getElementById('tamanho_user').value;
  const telefone = document.getElementById('telefone_user').value;

  // Seu número de destino
  const meuWhatsapp = '5512997243471';

  if (!nome || !rua || !numCasa || !bairro || !tamanho || !telefone) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  const mensagem = encodeURIComponent(
    `-- Nova Inscrição Dança SJC --\n\n` +
      `Nome: ${nome}\n` +
      `Tamanho da Camisa: ${tamanho}\n` +
      `Endereço: ${rua}\n` +
      `Número: ${numCasa}\n` +
      `Bairro: ${bairro}\n` +
      `Telefone: ${telefone}\n\n` +
      `-- Aula Escolhida --\n` +
      `Bairro: ${bairroAula}\n` +
      `Horário: ${horario}`
  );

  window.open(`https://wa.me/${meuWhatsapp}?text=${mensagem}`, '_blank');
}

// 🎯 CONFIGURAÇÃO DO CARROSSEL E INDICADORES (BOLINHAS)
const carrossel = document.querySelector('.carrossel-botoes');
const indicadoresContainer = document.getElementById('indicadores');
const inputs = document.querySelectorAll('.input-estilo');
let intervalo;
let index = 0;
const tempo = 5000;

if (carrossel) {
  const botoes = carrossel.children;

  // Cria as bolinhas dinamicamente baseado na quantidade de botões
  if (indicadoresContainer) {
    Array.from(botoes).forEach((_, i) => {
      const ponto = document.createElement('div');
      ponto.classList.add('ponto');
      if (i === 0) ponto.classList.add('ativo');
      indicadoresContainer.appendChild(ponto);
    });
  }

  const pontos = document.querySelectorAll('.ponto');

  function atualizarPontos(idx) {
    if (pontos.length > 0) {
      pontos.forEach(p => p.classList.remove('ativo'));
      if (pontos[idx]) pontos[idx].classList.add('ativo');
    }
  }

  function autoSlide() {
    // Só move sozinho no Desktop (evita pular enquanto digita no celular)
    if (window.innerWidth > 1024) {
      index++;
      if (index >= botoes.length) index = 0;

      botoes[index].scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
      });
      atualizarPontos(index);
    }
  }

  // Inicia o carrossel automático
  intervalo = setInterval(autoSlide, tempo);

  // Sincroniza as bolinhas quando o usuário arrasta com o dedo no celular
  carrossel.addEventListener('scroll', () => {
    const larguraItem = botoes[0].offsetWidth + 12; // largura + gap (12px)
    const novoIndex = Math.round(carrossel.scrollLeft / larguraItem);
    index = novoIndex; 
    atualizarPontos(novoIndex);
  });

  // 🛑 Pausas de segurança (Mouse e Touch)
  carrossel.addEventListener('touchstart', () => clearInterval(intervalo));
  carrossel.addEventListener('touchend', () => intervalo = setInterval(autoSlide, tempo));
  carrossel.addEventListener('mouseenter', () => clearInterval(intervalo));
  carrossel.addEventListener('mouseleave', () => intervalo = setInterval(autoSlide, tempo));
}

// 🛑 Para o carrossel definitivamente ao clicar para escrever nos inputs
inputs.forEach(input => {
  input.addEventListener('focus', () => {
    if (intervalo) clearInterval(intervalo);
  });
});

// 🔄 CONTROLE DE ROTAÇÃO (Bloqueio Horizontal)
function verificarOrientacao() {
  const largura = window.innerWidth;
  const altura = window.innerHeight;

  if (largura < 1024 && largura > altura) {
    document.documentElement.classList.add('bloquear-rotacao');
  } else {
    document.documentElement.classList.remove('bloquear-rotacao');
  }
}

verificarOrientacao();
window.addEventListener('resize', verificarOrientacao);

// 📱 MÁSCARA DE TELEFONE AUTOMÁTICA (Corrigida)
const inputTelefone = document.getElementById('telefone_user');

if (inputTelefone) {
  inputTelefone.addEventListener('input', (e) => {
    let res = e.target.value.replace(/\D/g, ""); // Remove tudo que não é número
    if (res.length > 11) res = res.slice(0, 11); // Limita a 11 dígitos

    if (res.length > 10) {
      // Celular: (12) 99999-9999
      res = res.replace(/^(\d{2})(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (res.length > 6) {
      // Fixo: (12) 9999-9999
      res = res.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (res.length > 2) {
      res = res.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else if (res.length > 0) {
      res = res.replace(/^(\d*)/, "($1");
    }

    e.target.value = res;
  });
}
