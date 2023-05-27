const baseUrl = "https://mock4jsonserver.up.railway.app";
const appointmentUrl = `${baseUrl}/appointments`;

// Initial Data
const names = document.querySelector('.name');
const imageUrl = document.querySelector('.imgUrl');
const specialization = document.querySelector('.specialization');
const experience = document.querySelector('.experience');
const locationData = document.querySelector('.location');
const date = document.querySelector('.date');
const slots = document.querySelector('.slots');
const fees = document.querySelector('.fee');

const tableBody = document.querySelector('tbody');
const submitButton = document.querySelector('.submit');

// Modal Data
const namesModal = document.querySelector('.nameModal');
const imageUrlModal = document.querySelector('.imgUrlModal');
const specializationModal = document.querySelector('.specializationModal');
const experienceModal = document.querySelector('.experienceModal');
const locationDataModal = document.querySelector('.locationModal');
const dateModal = document.querySelector('.dateModal');
const slotsModal = document.querySelector('.slotsModal');
const feesModal = document.querySelector('.feeModal');

const submitModalButton = document.querySelector('.submitModal');

window.addEventListener('load',()=>{
    fetchingDataFromJson();
})

submitButton.addEventListener('click',(e)=>{
    e.preventDefault();

    if(
        slots.value=="" || 
        specialization.value=="" ||
        fees.value==""
        ){
            return alert("Don't select empty values");
    }

    let data = {
        "name":names.value,
        "image":imageUrl.value,
        "specialization":specialization.value,
        "experience":+experience.value,
        "location":locationData.value,
        "date":date.value,
        "slots":+slots.value,
        "fee" : +fees.value
    }

    appointmentsPostData(data);

});

// POST : Post Data in appointments routes
const appointmentsPostData = async (data) => {
    try {
        const apiResponse = await fetch(appointmentUrl,{
            method : 'POST',
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        alert('Appointment Booked Successfully')
        removeInputData();
        fetchingDataFromJson();
    } catch (error) {
        alert(error.message);
    }
};

const removeInputData = () => {
    names.value="";
    imageUrl.value="";
    specialization.value="";
    experience.value="";
    locationData.value="";
    date.value="";
    slots.value="";
    fees.value="";
};


// GET : Get Data from json server and append in Table body
const fetchingDataFromJson = async () => {
    try {
        const apiResponse = await fetch(appointmentUrl);
        const dataOfResponse = await apiResponse.json();
        displayData(dataOfResponse);
    } catch (error) {
        alert(error.message);
    }
}


// Display Data in table body
const displayData = (data) => {

    tableBody.innerHTML="";

    data.forEach((el,index) => {
        let tableRow = document.createElement('tr');

        let nameData = document.createElement('td');
        nameData.textContent = el.name;

        let specialization = document.createElement('td');
        specialization.textContent = el.specialization;

        let experience = document.createElement('td');
        experience.textContent = el.experience;

        let locationData = document.createElement('td');
        locationData.textContent = el.location;

        let slots = document.createElement('td');
        slots.textContent = el.slots;

        let editBtn = document.createElement('td');
        editBtn.textContent = "Edit"
        editBtn.addEventListener('click', () =>{
            openModal(el);
        })

        let deleteBtn = document.createElement('td');
        deleteBtn.textContent = "Delete"
        deleteBtn.addEventListener('click', () =>{
            deleteAppointments(el.id);
        })

        let appointments = document.createElement('td');
        appointments.textContent = "Appointments";
        appointments.addEventListener('click', () =>{

        })

        tableRow.append(nameData,specialization,experience,locationData,slots,editBtn,deleteBtn,appointments);

        tableBody.appendChild(tableRow);
    });
}

// DELETE Appointments 
const deleteAppointments = async (id) => {
    try {
        const apiResponse = await fetch (`${appointmentUrl}/${id}`,{
            method: 'DELETE'
        });
        alert("Delete Appointment Successfully");
        fetchingDataFromJson();
    } catch (error) {
        alert(error.message);
    }
}

// Modal Section For editing the data
var modal = document.getElementById("myModal");
var btn = document.getElementsByTagName("button")[0];
var span = document.getElementsByClassName("close")[0];

function openModal(el) {
    modal.style.display = "block";
    appendingValues(el);
}

function closeModal() {
    modal.style.display = "none";
    fetchingDataFromJson();
}

window.onclick = function (event) {
    if (event.target == modal) {
        return modal.style.display = "none";
    }
};

// PATCH Appointments
const editAppointments = async (data,id) => {
    try {
        const apiResponse = await fetch(`${appointmentUrl}/${id}`,{
            method : 'PATCH',
            headers:{
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });
        alert('Appointment Updated Successfully')
        fetchingDataFromJson();
        return;
    } catch (error) {
        alert(error.message);
    }
};

const appendingValues  = (el) => {
    namesModal.value = el.name;
    imageUrlModal.value = el.image;
    specializationModal.value = el.specialization;
    experienceModal.value = el.experience;
    locationDataModal.value = el.location;
    dateModal.value = el.date;
    slotsModal.value = el.slots;
    feesModal.value = el.fee;


    submitModalButton.addEventListener('click', () =>{

        let data = {
            "name":namesModal.value,
            "image":imageUrlModal.value,
            "specialization":specializationModal.value,
            "experience":+experienceModal.value,
            "location":locationDataModal.value,
            "date":dateModal.value,
            "slots":+slotsModal.value,
            "fee" : +feesModal.value
        }

        editAppointments(data,el.id)
    })
}
