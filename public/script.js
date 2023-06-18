function send_info(){
    console.log($('#nome').val(), $('#conteudo').val())
    $.post('/mensagem', {nome :$('#nome').val(), conteudo: $('#conteudo').val()})
    .done(function (response) {
        console.log(response, 'hahah function');
    })
    .fail(function (error) {
        console.log('Erro na requisição:', error);
    });

}


function get_info() {
    var url = '/envio_chat';
    $.get(url, function(data, status) {
        console.log('Dados recebidos:', data);
      exibirDados(data);
    });
  }

function exibirDados(Dados){
    let saida = '';

    for (let line of Dados) {
      saida += `Nome: ${line.nome}<br>Mensagem: ${line.conteudo}<br><br>`;
    }

    document.getElementById('paragrafo').innerHTML = saida;
}
  
