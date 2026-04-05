// 🔒 trava orientação (funciona melhor como app)
if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock("portrait").catch(() => {});
}

function enviarWhats(bairro, horario) {
    const nome = document.getElementById('nome_user').value;
    const idade = document.getElementById('idade_user').value;
    const numero = "5512997243471"; 

    if (!nome || !idade) {
        alert("Por favor, preencha seu Nome e Idade!");
        return;
    }

    // ✅ evita erro com acento
    const mensagem = encodeURIComponent(
        `Nova Inscrição Dança SJC\n` +
        `Nome: ${nome}\n` +
        `Idade: ${idade}\n` +
        `Bairro: ${bairro}\n` +
        `Horário: ${horario}`
    );

    window.open(`https://wa.me/${numero}?text=${mensagem}`, '_blank');
}