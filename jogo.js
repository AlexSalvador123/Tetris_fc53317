document.addEventListener('DOMContentLoaded',() =>{
    const players = document.getElementById('lol-checkbox')
    const Submit = document.getElementById('submitForm')
    Submit.addEventListener('click',()=>{
        if(players.checked){
            console.log("ola");
            window.location = "1Player/index.html";
        }else{
            console.log("adeus");
            window.location = "2Players/index.html";
        }
    })
})