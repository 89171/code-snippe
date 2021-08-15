function stepRead(callback) {
    function onkeypress(s){
        output.write(s)
        line += s
        switch(s){
            case '\r':
                input.pause();
                callback(line)
                break;
        }
    } 

    const input = process.stdin;
    const output = process.stdout;
    let line = '';

    emitKeyPressEvents(input);
    input.on('keypress',onkeypress)

    input.setRawMode(true)
    input.resume()
}

function emitKeyPressEvents(stream){
    const g = emitKeys(stream)
    g.next()
    function onData(chunk){
        g.next(chunk.toString())
    }
    stream.on('data', onData)
}

function* emitKeys(strem){
    while(true){
        let ch = yield;
        strem.emit('keypress', ch)
    }
}
stepRead(function(s){
    console.log('typed: '+ s)
})