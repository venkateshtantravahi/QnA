
    
    const socket = io();
    var but = document.getElementById('clck');
    //but.click();

    const url = window.location.search;
    console.log(url);

    const urlParams = new URLSearchParams(url);
    const user = urlParams.get('cid');
    console.log(user)

    // if (user==('admin')){
    //     // var but = document.getElementById('clck');    
    //     // but.click();
    //     send();
    //     console.log('hey');
    // }
    // else{
    //     setTimeout(send()
    //         , 3000);
    // }
    
but.addEventListener('click', function(){
        // window.addEventListener('message', (event)=>{
        //     var dat = JSON.stringify(event.data);
        //     localStorage.setItem('username', JSON.stringify(dat.username.toString()))
        // });
        //var data = localStorage.getItem('username');
    //function send(){
        var n = user;
        socket.emit('names',n);
        if (n==('admin')){
            
            window.location="admin.html";
        }
        else{
            window.location="pindex.html";
        }
    //};
    });
    // function clicked(){
    //     const socket = io();
    //     const url = window.location.search;
    //     console.log(url);

    //     const urlParams = new URLSearchParams(url);
    //     const user = urlParams.get('cid');
    //     console.log(user)
            
    
    //     var n = user;
    //     socket.emit('names',n);
    //     if (n==('admin')){
                
    //         window.location="admin.html";
    //     }
    //     else{
    //         window.location="pindex.html";
    //     }
    // };

