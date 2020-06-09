var socket = io('/chat');

var msg = 0;

function scroll(tempo) {
    $(".messages").stop().animate({ scrollTop: $(".messages")[0].scrollHeight}, tempo);
}

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

socket.on('previousMessages', messages => {
    for (message of messages) {
        renderMessages(message);
    }

    scroll(250);
});

socket.on('receivedMessage', data => {
    renderMessages(data);
    scroll(1000);
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

    scroll(1000);
});