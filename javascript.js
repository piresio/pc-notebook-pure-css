jQuery(function() {
    /*
     * http://css-tricks.com/snippets/jquery/move-cursor-to-end-of-textarea-or-input/
     */

    jQuery.fn.putCursorAtEnd = function() {

        return this.each(function() {

            $(this).focus()

            // If this function exists...
            if (this.setSelectionRange) {
                // ... then use it (Doesn't work in IE)

                // Double the length because Opera is inconsistent about whether a carriage return is one character or two. Sigh.
                var len = $(this).val().length * 2;

                this.setSelectionRange(len, len);

            } else {
                // ... otherwise replace the contents with itself
                // (Doesn't work in Google Chrome)

                $(this).val($(this).val());

            }

            // Scroll to the bottom, in case we're in a tall textarea
            // (Necessary for Firefox and Google Chrome)
            this.scrollTop = 999999;

        });

    };

    $('#txtScreen').putCursorAtEnd();

    $(window).on({
        'keydown': function(e) {
            $('#key' + e.keyCode).addClass('key-pressed');
            $('#txtScreen').putCursorAtEnd();
        },
        'keyup': function(e) {
            var pressedKey = $('#key' + e.keyCode).removeClass('key-pressed');
            pressedKey;
        }
    });

    var screen = document.getElementById("txtScreen");
    var capsLock = false;

    $(".key").click(function() {
        var code = parseInt(this.getAttribute("id").replace("key", ""), 10);
        switch (code) {
            case 8:
                screen.value = screen.value.slice(0, -1);
            case 20:
                capsLock = !capsLock;
            default:
                var letter = String.fromCharCode(code);
                screen.value += capsLock ? letter.toUpperCase() : letter.toLowerCase();
        }
    });

    $('#capture-button').click(function() {

        navigator.getUserMedia = (navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia);

        if (navigator.getUserMedia) {
            document.getElementById('txtScreen').classList.add("hide");
            document.getElementById('camera-stream').classList.remove("hide");

            navigator.getUserMedia({
                    video: true
                },

                function(localMediaStream) {
                    var vid = document.getElementById('camera-stream');

                    vid.src = window.URL.createObjectURL(localMediaStream);
                },

                function(err) {
                    console.log('Erro ocorrido: ' + err);
                }
            );

        } else {
            alert('Seu navegador não suporta esse recurso');
        }

    });

});
