
const weatherForm=document.querySelector('form');
const search = document.querySelector('input');
const output1 = document.querySelector('#message1');
const output2 = document.querySelector('#message2');


weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location = search.value;
    output1.textContent="Loading....";
    output2.textContent=''
    fetch('/home?address='+location).then((response)=>{

        
        response.json().then((data)=>{
            if(data.data==''){
                output1.textContent='';
                output2.textContent=data.error;
            }
            else{
                output1.textContent=JSON.stringify(data.data);

            }
        })
        .catch((error)=>{
            output1.textContent='';
            output2.textContent=data.error;
        })
    })
})

