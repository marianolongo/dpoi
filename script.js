function appendActions(row, id) {

    const td1 = document.createElement("td");
    const centeredPointer1 = document.createElement("div");
    centeredPointer1.className = "centered pointer";
    const viewImage = document.createElement("img");
    viewImage.width = 20;
    viewImage.src = "view.png";
    viewImage.alt = "View";
    viewImage.onclick = () => viewPerson(id);
    centeredPointer1.appendChild(viewImage);
    td1.appendChild(centeredPointer1);

    const td2 = document.createElement("td");
    const centeredPointer2 = document.createElement("div");
    centeredPointer2.className = "centered pointer";
    const editImage = document.createElement("img");
    editImage.width = 20;
    editImage.src = "edit.png";
    editImage.alt = "Edit";
    editImage.onclick = () => openEditDialog(id);
    centeredPointer2.appendChild(editImage);
    td2.appendChild(centeredPointer2);

    const td3 = document.createElement("td");
    const centeredPointer3 = document.createElement("div");
    centeredPointer3.className = "centered pointer";
    const deleteImage = document.createElement("img");
    deleteImage.width = 20;
    deleteImage.src = "delete.png";
    deleteImage.alt = "Delete";
    deleteImage.onclick = () => deletePerson(id);
    centeredPointer3.appendChild(deleteImage);
    td3.appendChild(centeredPointer3);

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
}

function createPersonRow(person) {
    const row = document.createElement("tr");
    const name = document.createElement("td");
    name.innerText = person.firstname;
    const lastName = document.createElement("td");
    lastName.innerText = person.lastname;
    const mail = document.createElement("td");
    mail.innerText = person.mail;
    const phone = document.createElement("td");
    phone.innerText = person.phone;

    row.appendChild(name);
    row.appendChild(lastName);
    row.appendChild(mail);
    row.appendChild(phone);
    return row;
}

const getPersons = () => {
    document.addEventListener("DOMContentLoaded", (() => {
        const request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState === XMLHttpRequest.DONE) {
                document.getElementById("table-loader").style.display = "none";
                document.getElementById("persons-table").setAttribute("style", undefined);
                const persons = JSON.parse(request.responseText).payload.items;
                let table = document.getElementById("persons-table-body");
                for (let i = 0; i < persons.length; i++) {
                    const row = createPersonRow(persons[i]);
                    appendActions(row, persons[i].id);
                    table.appendChild(row)
                }
            }
        };
        request.open('GET', "http://dpoi2012api.appspot.com/api/1.0/list?credential=mlongo", true);
        request.send(null);
    }));
};

const persons = getPersons();

const createPerson = (e) => {
    e.preventDefault();
    const firstname = document.getElementById("input-name").value;
    const lastname = document.getElementById("input-lastname").value;
    const mail = document.getElementById("input-mail").value;
    const phone = document.getElementById("input-phone").value;
    const birthday = document.getElementById("input-birthday").value;
    const civilStatus = document.querySelector('input[name="estado_civil"]:checked').value;
    const province = document.getElementById("input-province").value;
    const street = document.getElementById("input-street").value;
    const zipCode = document.getElementById("input-zipcode").value;


    const request = new XMLHttpRequest();
    request.open('POST', `http://dpoi2012api.appspot.com/api/1.0/create?credential=mlongo&firstname=${firstname}&lastname=${lastname}&mail=${mail}&phone=${phone}&birthday=${birthday}&civilStatus=${civilStatus}&province=${province}&street=${street}&zipCode=${zipCode}`, true);
    request.onload = () => {
        const response = JSON.parse(request.responseText);
        if(response.status.code === 5){
            const id = response.payload.id;
            let table = document.getElementById("persons-table-body");
            const row = createPersonRow({firstname, lastname, mail, phone});
            appendActions(row, id);
            table.appendChild(row);
            alert("Persona Creada!");
        }
    };
    request.send(null);
};


const viewPerson = (id) => {
    const request = new XMLHttpRequest();
    request.open('POST', `http://dpoi2012api.appspot.com/api/1.0/view?credential=mlongo&id=${id}`, true);
    request.onload = () => {
        const response = JSON.parse(request.responseText);
        if(response.status.code === 1){
            _openViewDialog();
            const person = response.payload;
            document.getElementById("view-input-name").value = person.firstname;
            document.getElementById("view-input-lastname").value = person.lastname;
            document.getElementById("view-input-mail").value = person.mail;
            document.getElementById("view-input-phone").value = person.phone;
            document.getElementById("view-input-birthday").value = person.birthday;
            switch (person.civilStatus) {
                case "married":
                    document.getElementById("view-married").checked = true;
                    break;
                case "single":
                    document.getElementById("view-single").checked = true;
                    break;
                case "widow":
                    document.getElementById("view-widow").checked = true;
                    break;
            }
            document.getElementById("view-input-street").value = person.street;
            document.getElementById("view-input-province").value = person.province;
            document.getElementById("view-input-zipcode").value = person.zipCode;
            document.getElementById("view-input-created").value = person.created;
            document.getElementById("view-input-host").value = person.host;
        }
    };
    request.send(null);
};

const openEditDialog = (id) => {
    const request = new XMLHttpRequest();
    request.open('POST', `http://dpoi2012api.appspot.com/api/1.0/view?credential=mlongo&id=${id}`, true);
    request.onload = () => {
        const response = JSON.parse(request.responseText);
        if(response.status.code === 1){
            _openEditDialog();
            const person = response.payload;
            document.getElementById("edit-input-id").value = person.id;
            document.getElementById("edit-input-name").value = person.firstname;
            document.getElementById("edit-input-lastname").value = person.lastname;
            document.getElementById("edit-input-mail").value = person.mail;
            document.getElementById("edit-input-phone").value = person.phone;
            document.getElementById("edit-input-birthday").value = person.birthday;
            switch (person.civilStatus) {
                case "married":
                    document.getElementById("edit-married").checked = true;
                    break;
                case "single":
                    document.getElementById("edit-single").checked = true;
                    break;
                case "widow":
                    document.getElementById("edit-widow").checked = true;
                    break;
            }
            document.getElementById("edit-input-street").value = person.street;
            document.getElementById("edit-input-province").value = person.province;
            document.getElementById("edit-input-zipcode").value = person.zipCode;
        }
    };
    request.send(null);
};

const _openViewDialog = () => {
    document.getElementById("view-person-dialog").open = true;
};

const _openEditDialog = () => {
    document.getElementById("edit-person-dialog").open = true;
};

const editPerson = (e) => {
    e.preventDefault();
    const id = document.getElementById("edit-input-id").value;
    const firstname = document.getElementById("edit-input-name").value;
    const lastname = document.getElementById("edit-input-lastname").value;
    const mail = document.getElementById("edit-input-mail").value;
    const phone = document.getElementById("edit-input-phone").value;
    const birthday = document.getElementById("edit-input-birthday").value;
    const civilStatus = document.querySelector('input[name="estado_civil"]:checked').value;
    const province = document.getElementById("edit-input-province").value;
    const street = document.getElementById("edit-input-street").value;
    const zipCode = document.getElementById("edit-input-zipcode").value;


    const request = new XMLHttpRequest();
    request.open('POST', `http://dpoi2012api.appspot.com/api/1.0/update?credential=mlongo&id=${id}&firstname=${firstname}&lastname=${lastname}&mail=${mail}&phone=${phone}&birthday=${birthday}&civilStatus=${civilStatus}&province=${province}&street=${street}&zipCode=${zipCode}`, true);
    request.onload = () => {
        const response = JSON.parse(request.responseText);
        if(response.status.code === 6){
            alert("Persona modifcada!");
            window['edit-person-dialog'].close()
        }
    };
    request.send(null);
};

const deletePerson = (id) => {
    const request = new XMLHttpRequest();
    request.open('POST', `http://dpoi2012api.appspot.com/api/1.0/delete?credential=mlongo&id=${id}`, true);
    request.onload = () => {
        const response = JSON.parse(request.responseText);
        if(response.status.code === 6){
            alert("Persona Eliminada!")
            window.location.reload();
        }
    };
    request.send(null);
};