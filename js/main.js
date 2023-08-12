var bookName = document.getElementById("bookName");
var bookLink = document.getElementById("bookLink");
var submitbtn = document.getElementById("submit");

var tBody = document.getElementById("tBody");

var allBooks = [];

if(localStorage.getItem("allBooks") != null){
    allBooks=JSON.parse(localStorage.getItem("allBooks"));
    display()
}

var validName = /^[A-Za-z_]{1,}$/g;
function validateName(){
    return validName.test(bookName.value);
}
bookName.onkeyup = function(){
    if(validateName() && validateURL()){
        submitbtn.removeAttribute("disabled");
    }else{
        submitbtn.disabled = "true";
    }
}
var validUrl = /^(https:\/\/)?(www\.)?[A-Za-z0-9_]{1,}\.[a-z]{3}$/g;
function validateURL(){
    return validUrl.test(bookLink.value);
}
bookLink.onkeyup = function(){
    if(validateName() && validateURL()){
        submitbtn.removeAttribute("disabled");
    }else{
        submitbtn.disabled = "true";
    }
}

function submit(){
    var book = {
        bookName:bookName.value,
        bookLink:bookLink.value
    }

    localStorage.setItem("allBooks",JSON.stringify(allBooks));
    allBooks.push(book);
    display();
    console.log(allBooks);
    clear();
}
function clear(){
    bookName.value="";
    bookLink.value="";
}

function display(){
    var box = ``;
    
    for(var i=0; i<allBooks.length; i++){
        box+=`
        <tr>
        <td>${i}</td>
        <td>${allBooks[i].bookName}</td>
        <td><button onclick="Visit(${i})" class="btn btn-success"><i class="fa-solid fa-eye"></i> Visit</button></td>
        <td><button onclick="deleteBook(${i})" class="btn btn-danger"><i class="fa-solid fa-trash-can"></i> Delete</button></td>
        </tr>
        `
    }
    tBody.innerHTML=box;
}


function deleteBook(index){

    allBooks.splice(index,1);

    localStorage.setItem("allBooks",JSON.stringify(allBooks));
    display();
}

function Visit(e){

    window.open('https://'+allBooks[e].bookLink);
    
    localStorage.setItem("allBooks",JSON.stringify(allBooks));
    display();
}

// function search(term){
//     var findBook=[];
//     for(var i=0; i<allBooks.length; i++){
//         if(allBooks[i].bookName.toLowerCase().includes(term)){
//             findBook.push(allBooks[i]);
//         }
//     }
//     display(findBook);
// }
