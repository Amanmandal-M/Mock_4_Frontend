const baseUrl = "https://mock4jsonserver.up.railway.app";
const appointmentUrl = `${baseUrl}/appointments`;


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
fetchingDataFromJson();

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