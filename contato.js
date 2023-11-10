document.getElementById('formContato').addEventListener('submit', function (e) {
  var nome = document.getElementById('nome').value;
  var email = document.getElementById('email').value;
  var mensagem = document.getElementById('mensagem').value;

  //Validação dos Campos
  if(!nome || !email || !mensagem) {
    alert('Todos os campos são obrigatórios!');
    return;
  }

  //Aqui você pode enviar os dados do formulário para o servidor
  console.log('Formulário Enviado:', {nome, email, mensagem});
  alert('Mensagem enviada com sucesso!');
});
