const socket = io();
socket.on('uid', (k)=>{
    var name = k;
    console.log(name);
});

socket.on('uname',(n)=>{
    output(n);
});
function output(n){
    const div = document.createElement('div'); 
    div.innerHTML=`${n}`;
    document.querySelector('.box').appendChild(div);
}