const userNameInput = document.getElementById("username");
const submitButton = document.getElementById("submit-button");
const userNameContainer = document.getElementById("username-container");


submitButton?.addEventListener("click",()=>{

    if(userNameInput.value === ""){
        userNameContainer.innerHTML+= `
        <p>Note! You must enter a username</p>
        submitButton
        `
        setTimeout(()=>{
            window.location.reload()   
        },700)
    } 
     else{
        localStorage.setItem("userName",userNameInput.value) ;
        window.location.href = "http://127.0.0.1:5500/pages/dashboard.html"
     }
})
