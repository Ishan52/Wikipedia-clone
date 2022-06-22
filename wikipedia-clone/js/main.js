let searchText = document.querySelector("#searchText");
let container = document.querySelector("#container");
let findNow = document.querySelector("#findNow");
let searchResult = document.querySelector("#searchResult");
let tree = document.querySelector("#tree");
let count=1;

findNow.addEventListener("click" , ()=>{
    if(searchText.value !== ""){
        displayresult();
        tree.style.animation="zoomin 1s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards";
    }
})
searchText.addEventListener("keydown" , (event)=>{
    if(event.key== "Enter"){
        displayresult();
        tree.style.animation="zoomin 1s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards";
    }
})

function displayresult() {
    let url = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${searchText.value}`;
        fetch(url).then(response => response.json()).then(data =>{
            console.log(data);

            searchResult.innerHTML = ``;
            data.query.search.forEach(items =>{
                if(count == 5){
                    count=1;
                }
                let resultURL = `https://en.wikipedia.org/?curid=${items.pageid}`;
                searchResult.insertAdjacentHTML(`afterBegin` , `
            <div onclick="location.href='${resultURL}';" class="resultItem class${count}" href="${resultURL}" style="-webkit-animation: anvil 1s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;">
            <a href="${resultURL}" target="_blank" class="resultTitle">${items.title}</a><br>
            
            <p>${items.snippet}</p>
        </div>`)
        count++;
            
    })
        })
    
}