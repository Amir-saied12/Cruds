// inbuts
let title = document.getElementById("title")

let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")

let count = document.getElementById("count")
let category = document.getElementById("category")

// total
let total = document.getElementById("total")

// btns
let submit = document.getElementById("submit")

let mood = ""
let tmp; 

// Total
function getTotal() {

    if (price.value !== '') {
        let result = ( +price.value +  +taxes.value +  +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.backgroundColor ="green";
        console.log(result)
    }
    else {
        total.innerHTML = "";
        total.style.backgroundColor ="red";
    }


}

// Array Container
let arrContainer =[];
if (localStorage.product != null) {
    arrContainer = JSON.parse(localStorage.product)
} else {
    let arrContainer = [];
}

// click add
submit.addEventListener ("click", function() {
    let objData = {
        title:title.value,
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value,
    }
    if (mood === "add") {
        if (objData.count > 1) {
            for (let i = 0; i <objData.count ; i++) {
                arrContainer.push(objData) 
            }  
        }
        else{
            arrContainer.push(objData)
        }
    }else{
        arrContainer[tmp] = objData;
        mood = "add"
        submit.innerHTML = "add"
        count.style.display = "block"
    }
    localStorage.setItem("product",JSON.stringify(arrContainer))
    clrInb()
    displeyPro()
})

// displey Product
function displeyPro() {
    tablePro = ""
    for (let i = 0; i < arrContainer.length; i++) {
        tablePro += 
        `<tr>
            <td>${i+1}</td>
            <td>${arrContainer[i].title}</td>
            <td>${arrContainer[i].price}</td>
            <td>${arrContainer[i].taxes}</td>
            <td>${arrContainer[i].ads}</td>
            <td>${arrContainer[i].discount}</td>
            <td>${arrContainer[i].total}</td>
            <td>${arrContainer[i].category}</td>
            <td><button id="update" onclick="updateRow(${i})" class="btn btn-warning">update</button></td>
            <td><button id="delete" onclick="delRow(${i})" class="btn btn-danger">delete</button></td>
        </tr>`
    }
    document.getElementById("tBody").innerHTML = tablePro
    let delAll = document.getElementById("deleteAll")
    if (arrContainer.length > 0) {
        delAll.innerHTML=`<button class="btn btn-danger w-100 my-3" onclick="delAll()">delete All(${arrContainer.length})</button>`
    }else{
        delAll.innerHTML = ""
    }
}
displeyPro()

// clrInb
function clrInb() {
    title.value = ""
    price.value = ""
    taxes.value = ""
    ads.value = ""
    discount.value = ""
    count.value = ""
    category.value = ""
    total.innerHTML = ""
}

// Delete All
function delAll() {
    arrContainer.splice(0)
    localStorage.setItem("product",JSON.stringify(arrContainer))
    displeyPro()
}

// Delete Row
function delRow(i) {
    arrContainer.splice(i,1)
    localStorage.setItem("product",JSON.stringify(arrContainer))
    displeyPro()
}

// Update Row

function updateRow(i) {
    title.value = arrContainer[i].title
    price.value = arrContainer[i].price
    taxes.value = arrContainer[i].taxes
    ads.value = arrContainer[i].ads
    discount.value = arrContainer[i].discount
    getTotal()
    count.style.display ="none"
    category.value = arrContainer[i].category
    submit.innerHTML = "update"
    mood = "update"
    tmp = i
    scroll({
        top: 0,
        behavior:"smooth"
    })
}

// Search

let moodSearch = 'title'

function bySearch(id) {
    let search = document.getElementById("search");
    if (id == 'searchByTitle') {
        moodSearch = 'title'
        search.placeholder = 'search By Title'
    }else{
        moodSearch = 'category'
        search.placeholder = 'search By Category'
    }
    search.focus()
}

function searchProduct(value) {
    tablePro = ""
    if (moodSearch == "title") {
        for (let i = 0; i < arrContainer.length; i++) {
            if (arrContainer[i].title.toLowerCase().includes(value)) {
                tablePro += 
                `<tr>
                    <td>${i+1}</td>
                    <td>${arrContainer[i].title}</td>
                    <td>${arrContainer[i].price}</td>
                    <td>${arrContainer[i].taxes}</td>
                    <td>${arrContainer[i].ads}</td>
                    <td>${arrContainer[i].discount}</td>
                    <td>${arrContainer[i].total}</td>
                    <td>${arrContainer[i].category}</td>
                    <td><button id="update" onclick="updateRow(${i})" class="btn btn-warning">update</button></td>
                    <td><button id="delete" onclick="delRow(${i})" class="btn btn-danger">delete</button></td>
                </tr>`
            }
        }
    }else{
        for (let i = 0; i < arrContainer.length; i++) {
            if (arrContainer[i].category.toLowerCase().includes(value)) {
                tablePro += 
                `<tr>
                    <td>${i+1}</td>
                    <td>${arrContainer[i].title}</td>
                    <td>${arrContainer[i].price}</td>
                    <td>${arrContainer[i].taxes}</td>
                    <td>${arrContainer[i].ads}</td>
                    <td>${arrContainer[i].discount}</td>
                    <td>${arrContainer[i].total}</td>
                    <td>${arrContainer[i].category}</td>
                    <td><button id="update" onclick="updateRow(${i})" class="btn btn-warning">update</button></td>
                    <td><button id="delete" onclick="delRow(${i})" class="btn btn-danger">delete</button></td>
                </tr>`
            }
        }
    }
    document.getElementById("tBody").innerHTML = tablePro
}