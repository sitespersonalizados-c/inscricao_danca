// 🔒 trava orientação (funciona melhor como app)
if (screen.orientation && screen.orientation.lock) {
  screen.orientation.lock ('portrait').catch (() => {});
}

function enviarWhats (bairroAula, horario) {
  const nome = document.getElementById ('nome_user').value;
  const rua = document.getElementById ('rua_user').value;
  const bairro = document.getElementById ('bairro_user').value;
  const tamanho = document.getElementById ('tamanho_user').value;
  const telefone = document.getElementById ('telefone_user').value;

  const numero = '5512997243471';

  if (!nome || !rua || !bairro || !tamanho || !telefone) {
    alert ('Por favor, preencha todos os campos!');
    return;
  }

  const mensagem = encodeURIComponent (
    `📝 Nova Inscrição Dança SJC\n\n` +
      `👤 Nome: ${nome}\n` +
      `👕 Tamanho da Camisa: ${tamanho}\n` +
      `📍 Endereço: ${rua}\n` +
      `🏠 Bairro: ${bairro}\n` +
      `📞 Telefone: ${telefone}\n\n` +
      `📌 Bairro da Aula: ${bairroAula}\n` +
      `⏰ Horário: ${horario}`
  );

  window.open (`https://wa.me/${numero}?text=${mensagem}`, '_blank');
}
