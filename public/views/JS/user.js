const sock = io();
sock.on('username',name=>{
    mName=name;
    sock.on('QnA',hello =>{
        question=hello.msg;
        output(hello); 
    });
    function output(hello){
        const div = document.createElement('div');
        div.classList.add('content');
        if(hello.selectedValue=='Poll'){
            div.innerHTML=`<form>
            <h3>${hello.msg}</h3>
            <br> &nbsp;
            <input type="radio" id="pull" name="question" value="Yes">
            <label for="Yes">Yes</label>
            <input type="radio" id="pull" name="question" value="No">
            <label for="No">No</label>
             <br><br> &nbsp; &nbsp;
            <input type="button" id="studbut" value="submit" onClick="getPoll(this.form,'${mName}','${hello.msg}')">
            <br><br><br><br>
            <script src="user.js"></script>
            </form>`;
        }
        else{
            div.innerHTML=`<form>
            <h3>${hello.msg}</h3>
            <br>
            <textarea name="Answer" id="user" cols="35" rows="5" placeholder="Solution is... "></textarea>
            <br><br>
            <input type="button" value="submit" id="subbtn" onClick="getQnA(this.form,'${mName}','${hello.msg}')">
            <br><br><br>
           <script src="user.js"><script>
            </form>`;
        }
        document.querySelector('.content').parentNode.removeChild(document.querySelector('.content'));
        document.querySelector('.form-wrap').appendChild(div);
    }
    
    
    
    
});
function getPoll(form,myName,q){
        
    const rbs = form.question;
    // for (const rb of rbs){
    //     if(rb.checked){
    //         ans= rb.value;
    //         break;
    //     } 
    // }
    ans=rbs.value;
    alert('your answer '+ans);
    sock.emit('pollResult',{myName,ans,q});
}; 
function getQnA(form,myName,q){
    console.log('inside getQnA');
    const textAns = form.Answer.value;
    alert('QnA form');
    sock.emit('QnAResult',{myName,textAns,q});
};



