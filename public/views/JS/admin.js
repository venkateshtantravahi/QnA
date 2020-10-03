



const sock = io();
const questioning = document.getElementById('administration')
questioning.addEventListener('submit',(e) =>{
    e.preventDefault();
    const msg = e.target.elements.QnA.value;
    const rbs = document.querySelectorAll('input[name="question"]');
    for (const rb of rbs) {
        if (rb.checked) {
            selectedValue = rb.value;
            break;
        }
    }
    console.log(selectedValue+ msg);
    sock.emit('question',{selectedValue,msg});
}); 
function getResults(){
    console.log('get the csv');
    sock.emit('results','want results back');
}
sock.on('downloadIt',msg=>{
    window.open('/downloads')
});
sock.on('showChart',data=>{
    

    window.open(
        'chart.html',
        '_blank' // <- This is what makes it open in a new window.
    );
  
  
  
    console.log('no. of yes guys:',data.countNo,'/n no . of No guys:',data.countYes);
});