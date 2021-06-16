onmessage=function(e){
    if(e.data.length){
        postMessage(e.data[1]-e.data[0])
    }
}