'use strict';

(function(){
    let idField;
    let nameField;
    let typeField;
    let processorField;
    let amountField;

    document.addEventListener('DOMContentLoaded',init);

    function init(){
        idField=document.getElementById('id');
        nameField=document.getElementById('name');
        typeField=document.getElementById('type');
        processorField=document.getElementById('processor');
        amountField=document.getElementById('amount');

        document.getElementById('submit')
        .addEventListener('click',send);
    } //end of init

    async function send(){
        cleareMessagearea();
        const computer={
            id:idField.value,
            name:nameField.value,
            type:typeField.value,
            processor:processorField.value,
            amount:amountField.value
        };

        try{
            const options={
                method:'POST',
                body:JSON.stringify(computer),
                headers:{
                    'Content-Type':'application/json'
                }
            };
            const data = await fetch('/add',options);
            const resultJson=await data.json();
            if(resultJson.message){
                updateMessagearea(resultJson.message, resultJson.type);
            }
        }
        catch(error){
            updateMessagearea(error.message, 'error');
        }
    }
})();