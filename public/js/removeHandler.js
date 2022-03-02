'use strict';

(function(){
 let inputField;

 document.addEventListener('DOMContentLoaded',init);

 function init(){
     inputField=document.getElementById('id');

     document.getElementById('submit')
     .addEventListener('click',send)
 } // end on init

 async function send(){

    clearMessagearea();
    const id= inputField.value;
    try{
        const options={
            method:'POST',
            body:JSON.stringify({id}),
            headers:{
                'Content-Type':'application/json'
            }
        }
        const data = await fetch('/remove',options);
        const result = await data.json();
        if(result.message){
            updateMessagearea(result.message,result.type);
        }
    }
    catch(error){
        updateMessagearea(error.message, 'error');
    }
 }
})();