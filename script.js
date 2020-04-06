function appendActions(row) {

    const td1 = document.createElement("td");
    const centeredPointer1 = document.createElement("div");
    centeredPointer1.className = "centered pointer";
    const viewImage = document.createElement("img");
    viewImage.width = 20;
    viewImage.src = "view.png";
    viewImage.alt = "View";
    centeredPointer1.appendChild(viewImage);
    td1.appendChild(centeredPointer1);

    const td2 = document.createElement("td");
    const centeredPointer2 = document.createElement("div");
    centeredPointer2.className = "centered pointer";
    const editImage = document.createElement("img");
    editImage.width = 20;
    editImage.src = "edit.png";
    editImage.alt = "Edit";
    centeredPointer2.appendChild(editImage);
    td2.appendChild(centeredPointer2);

    const td3 = document.createElement("td");
    const centeredPointer3 = document.createElement("div");
    centeredPointer3.className = "centered pointer";
    const deleteImage = document.createElement("img");
    deleteImage.width = 20;
    deleteImage.src = "delete.png";
    deleteImage.alt = "Delete";
    centeredPointer3.appendChild(deleteImage);
    td3.appendChild(centeredPointer3);

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
}

function createPersonRow(persons, i) {
    const row = document.createElement("tr");
    const name = document.createElement("td");
    name.innerText = persons[i].firstname;
    const lastName = document.createElement("td");
    lastName.innerText = persons[i].lastname;
    const mail = document.createElement("td");
    mail.innerText = persons[i].mail;
    const phone = document.createElement("td");
    phone.innerText = persons[i].phone;

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
                    const row = createPersonRow(persons, i);
                    appendActions(row);
                    table.appendChild(row)
                }
            }
        };
        request.open('GET', "http://dpoi2012api.appspot.com/api/1.0/list_delay?credential=dpoi", true);
        request.send(null);
    }));
};

const persons = getPersons();