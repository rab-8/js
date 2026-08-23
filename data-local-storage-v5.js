var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    rag = document.getElementById("rag"),
    rationi = document.getElementById("rationi"),
    dag = document.getElementById("dag"),
    userName = document.getElementById("name"),
    work = document.getElementById("work"),
    posting = document.getElementById("posting"),
    sarok = document.getElementById("sarok"),
    phone = document.getElementById("phone"),
    sDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "নতুন সদস্য যুক্ত ফরম"
    isEdit = false
    imgInput.src = "./image/Profile Icon.webp"
    form.reset()
})


file.onchange = function(){
    if(file.files[0].size < 1000000){  // 1MB = 1000000
        var fileReader = new FileReader();

        fileReader.onload = function(e){
            imgUrl = e.target.result
            imgInput.src = imgUrl
        }

        fileReader.readAsDataURL(file.files[0])
    }
    else{
        alert("This file is too large!")
    }
}


function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td><img src="${element.picture}" alt="" width="50" height="50"></td>
            <td>${element.employeeRag}</td>
            <td>${element.employeeRationi}</td>
            <td>${element.employeeDag}</td>
            <td>${element.employeeName}</td>
            <td>${element.employeeWork}</td>
            <td>${element.employeePosting}</td>
            <td>${element.employeeSarok}</td>
            <td>${element.employeePhone}</td>
            <td>${element.startDate}</td>


            <td>
                <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.employeeRag}', '${element.employeeRationi}', '${element.employeeDag}', '${element.employeeName}', '${element.employeeWork}', '${element.employeePosting}', '${element.employeeSarok}', '${element.employeePhone}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.employeeRag}', '${element.employeeRationi}', '${element.employeeDag}', '${element.employeeName}', '${element.employeeWork}', '${element.employeePosting}', '${element.employeeSarok}', '${element.employeePhone}', '${element.startDate}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(pic, rag, rationi, dag, name, work, posting, sarok, phone, sDate){
    document.querySelector('.showImg').src = pic,
    document.querySelector("#showRag").value = rag,
    document.querySelector("#showRationi").value = rationi,
    document.querySelector("#showDag").value = dag,
    document.querySelector('#showName').value = name,
    document.querySelector("#showWork").value = work,
    document.querySelector("#showPosting").value = posting,
    document.querySelector("#showSarok").value = sarok,
    document.querySelector("#showPhone").value = phone,
    document.querySelector("#showsDate").value = sDate
}


function editInfo(index, pic, rag, rationi, dag, name, work, posting, sarok, Phone, Sdate){
    isEdit = true
    editId = index
    imgInput.src = pic
    rag.value = Rag
    rationi.value = Rationi
    dag.value = dag
    userName.value = name
    work.value = Work
    posting.value = Posting
    sarok.value = Sarok
    phone.value = Phone
    sDate.value = Sdate

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        picture: imgInput.src == undefined ? "./image/Profile Icon.webp" : imgInput.src,
        employeeRag: rag.value,
        employeeRationi: rationi.value,
        employeeDag: dag.value,
        employeeName: userName.value,
        employeeWork: work.value,
        employeePosting: posting.value,
        employeeSarok: sarok.value,
        employeePhone: phone.value,
        startDate: sDate.value
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "নতুন সদস্য যুক্ত ফরম"

    showInfo()

    form.reset()

    imgInput.src = "./image/Profile Icon.webp"  

    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()
})
