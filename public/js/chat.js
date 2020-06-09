var socket = io('http://localhost:3000');

var msg = 0;

function renderMessages(message) {
    $('.messages').append('<div id="' + msg + '" class="message"><strong>' + message.author + '</strong>: ' + message.message);
    
    setTimeout(function() {
        $('.message').each(function(i) {
            $(this).css('transform', 'translate3d(0, 0, 0)');
            $(this).css('opacity', 1);
        });
    },50);

    msg++;
}

function gera_cor(){
    var hexadecimais = '0123456789ABCDEF';
    var cor = '#';
  
    // Pega um número aleatório no array acima
    for (var i = 0; i < 6; i++ ) {
    //E concatena à variável cor
        cor += hexadecimais[Math.floor(Math.random() * 16)];
    }
    return cor;
}

socket.on('previousMessages', messages => {
    for (message of messages) {
        renderMessages(message);
    }
});

socket.on('receivedMessage', data => {
    renderMessages(data);
});

$('#chat').submit(function(event) {
    event.preventDefault();

    var author = $('input[name=username]').val();
    var message = $('input[name=message]').val();

    if (author != "" && message != "") {
        var messageObject = {
            author: author,
            message: message
        };

        renderMessages(messageObject);

        socket.emit('sendMessage', messageObject);

        $('input[name=message]').val("");
    }
});