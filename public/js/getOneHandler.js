'use strict';
(function(){
    let resultarea;
    let inputfield;

    document.addEventListener('DOMContentLoaded',init);

    function init(){
        resultarea=document.getElementById('resultarea');
        inputfield=document.getElementById('id');
        document.getElementById('submit')
        .addEventListener('click', send);
    } //end of init

    async function send(){
        cleareMessagearea();
        resultarea.innerHTML='';
        const id=inputfield.value;
        try{
            const options={
                method:'POST',
                body:JSON.stringify({id}),
                headers:{
                    'Content-Type':'application/json'
                }
            };
            const data= await fetch('/getOne',options);
            const resultjson=await data.json();
            updatePage(resultjson);

        }
        catch(error){
            updateMessagearea(error.message, 'error');
        }
    } // end of send

    function updatePage(result){
        if(result){
            if(result.message){
                updateMessagearea(result.message,result.type);
            }
            else{
                updateComputer(result);
                console.log(result)
                console.log(result[0].id)
            }
        }
        else{
            updateMessagearea('Not found','error');
        }
    } // end of updatePage

    function updateComputer(computer){
        resultarea.innerHTML=`
        <p><span class="legend">ID:</span> ${computer[0].id}</p>
        <p><span class="legend">Name:</span> ${computer[0].name}</p>
        <p><span class="legend">Type:</span> ${computer[0].type}</p>
        <p><span class="legend">Processor:</span> ${computer[0].processor}</p>
        <p><span class="legend">Amount:</span> ${computer[0].amount}</p>
        `;
    } //end of updateComputer

})();