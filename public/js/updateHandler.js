'use strict';

(function(){
    let resultarea;
    let inputfield;
    let nameField;
    let typeField;
    let processorField;
    let amountField;
    document.addEventListener('DOMContentLoaded',init);


    function init(){
        resultarea=document.getElementById('resultarea');
        inputfield=document.getElementById('id');

        document.getElementById('submit')
        .addEventListener('click',send);
    } //end of init

    async function send(){
        clearMessagearea();
        const id=inputfield.value
        try{
            const options={
                method:'POST',
                body:JSON.stringify({id}),
                headers:{
                    'Content-Type':'application/json'
                }
            };
            const data= await fetch('/getOne',options)
            const resultJson=await data.json();
            updatePage(resultJson);
        }
        catch(err){
            updateMessagearea(err.clearMessagearea,'error');

        }
    } //end of send

    function updatePage(result){
        if(result){
            if(result.message){
                updateMessagearea(result.message,result.type);
            }
            else{
                updateComputer(result)
            }
        }
        else{
            updateMessagearea('Not found','error');
        }
    } // end of updatePage
    // function updateComputer(computer){
    //     resultarea.innerHTML=`
    //     <p disabled><span class="legend">ID:</span> ${computer[0].id}</p>
    //     <p id="name"><span class="legend">Name:</span> ${computer[0].name}</p>
    //     <p id="type"><span class="legend">Type:</span> ${computer[0].type}</p>
    //     <p id="processor"><span class="legend">Processor:</span> ${computer[0].processor}</p>
    //     <p id="amount"><span class="legend">Amount:</span> ${computer[0].amount}</p>
    //     `;
    // } //end of updateComputer


})();