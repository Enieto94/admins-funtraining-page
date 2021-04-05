async function getEvents() {
    try {
        const serverResponse = await axios.get(`${API_URL}/events/all`, { headers: { 'Authorization': `Bearer ${getCookie("token")}` } });
        const events = serverResponse.data.data;
        return events;

    } catch (error) {
        console.warn("ERROR: ", error);
        if (error.response.status === 401) {
            window.location.href = "/";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Problema interno.',
                text: "Lo sentimos, ha surgido un problema interno. Intentalo más tarde"
            });
        }
    }

};

async function createEvent(event) {
    try {
        const serverResponse = await axios.post(`${API_URL}/admins/events`, event, { headers: { 'Authorization': `Bearer ${getCookie("token")}` } });
        return serverResponse.data;

    } catch (error) {
        console.warn("ERROR: ", error);
        if (error.response.status === 401) {
            window.location.href = "/";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Problema interno.',
                text: "Lo sentimos, ha surgido un problema interno. Intentalo más tarde"
            });
        }
    }
};

async function updateEvent(event) {
    try {
        const serverResponse = await axios.put(`${API_URL}/admins/events/${event.id}`, event, { headers: { 'Authorization': `Bearer ${getCookie("token")}` } });
        return serverResponse.data;

    } catch (error) {
        console.warn("ERROR: ", error);
        if (error.response.status === 401) {
            window.location.href = "/";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Problema interno.',
                text: "Lo sentimos, ha surgido un problema interno. Intentalo más tarde"
            });
        }
    }
};

async function deleteEvent(eventId) {
    try {
        await axios.delete(`${API_URL}/admins/events/${eventId}`, { headers: { 'Authorization': `Bearer ${getCookie("token")}` } });

    } catch (error) {
        console.warn("ERROR: ", error);
        if (error.response.status === 401) {
            window.location.href = "/";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Problema interno.',
                text: "Lo sentimos, ha surgido un problema interno. Intentalo más tarde"
            });
        }
    }
};

function getTodayDate() {
    const actualYear = new Date().getFullYear();
    const actualMonth = new Date().getMonth() + 1;
    const actualDay = new Date().getDate();
    const today = `${actualYear}-${(actualMonth < 10) ? '0' + actualMonth : actualMonth}-${(actualDay < 10) ? '0' + actualDay : actualDay}`;

    return today;
}

function setMinutesToCero(element) {
    const date = element.value;
    const dateWithCeroMinutes = moment(date).minutes(0).format('YYYY-MM-DDTHH:mm');
    element.value = dateWithCeroMinutes;
    let endInput = "end";
    if (element.id === "edit-start") {
        endInput = "edit-end";
    }
    updateEndDateSiblingInput(element, endInput);
}

function updateEndDateSiblingInput(startInput, endInput) {
    const $endInput = document.getElementById(endInput);
    $endInput.value = moment(startInput.value).minutes(0).add(1, 'hour').format('YYYY-MM-DDTHH:mm');
}

async function getUsers() {
    try {
        const serverResponse = await axios.get(`${API_URL}/users`, { headers: { 'Authorization': `Bearer ${getCookie("token")}` } });
        const users = serverResponse.data.data;
        return users;

    } catch (error) {
        console.warn("ERROR: ", error);
        if (error.response.status === 401) {
            window.location.href = "/";
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Problema interno.',
                text: "Lo sentimos, ha surgido un problema interno. Intentalo más tarde"
            });
        }
    }
}

function getUsersOptions(usersList) {
    return usersList.map((user) => `<option value="${user.id}">${user.name}</option>`);
}

/**
 * INIT
 */
let userEvents;
let calendar;

// ESTRUCTURA DÍAS FESTIVOS MES-DIA 00-00
const holidays = [
    "03-08",
    "03-22",
    "04-01",
    "04-02-",
    "05-01",
    "05-09",
    "05-17",
    "06-07",
    "06-14",
    "06-20",
    "07-05",
    "07-20",
    "08-07",
    "08-16",
    "10-18",
    "11-01",
    "11-15",
    "12-08",
    "12-25"
]

async function main() {
    userEvents = await getEvents();
    const calendarElement = document.getElementById('calendar');
    const usersList = await getUsers();
    const usersOptionsHtml = getUsersOptions(usersList);
    $('#title').append(usersOptionsHtml);
    $('#edit-title').append(usersOptionsHtml);

    calendar = new FullCalendar.Calendar(calendarElement, {
        locale: 'es',
        initialView: 'diario', // ['dayGridMonth : DEFAULT', 'dayGridWeek', 'timeGridDay', 'listWeek']
        headerToolbar: {
            center: 'dayGridMonth,diario' // buttons for switching between views
          },
          views: {
            diario: {
              type: 'timeGrid',
              duration: { days: 1 },
              buttonText: 'Diario'
            }
        },
        timeZone: 'local',
        fixedWeekCount: false,
        validRange: {
            start: getTodayDate()
        },
        businessHours: [
            {
                daysOfWeek: [1, 2, 3, 4, 5], // Monday, Tuesday, Wednesday, Thursday, Friday
                startTime: '05:00', // 5am
                endTime: '22:00' // 10pm
            },
            {
                daysOfWeek: [6], // Saturday
                startTime: '08:00', // 8am
                endTime: '14:00' // 2pm
            }
        ],
        events: userEvents,
        dateClick: function (dateInfo) {
            let dateSelectedMonth = dateInfo.date.getMonth() + 1;
            const daySelectedFormated = moment(dateInfo.date).minutes(0).format('YYYY-MM-DDTHH:mm');
            $('#ModalAdd #start').prop("min", `${dateInfo.date.getFullYear()}-${(dateSelectedMonth < 10) ? '0' + dateSelectedMonth : dateSelectedMonth}-${dateInfo.date.getDate()}T05:00`);
            $('#ModalAdd #start').prop("max", `${dateInfo.date.getFullYear()}-${(dateSelectedMonth < 10) ? '0' + dateSelectedMonth : dateSelectedMonth}-${dateInfo.date.getDate()}T21:00`);
            $('#ModalAdd #start').val(daySelectedFormated);
            $('#ModalAdd #end').val(moment(daySelectedFormated).add(1, 'hour').format('YYYY-MM-DDTHH:mm'));
            $('#ModalAdd').modal('show');
        },
        eventClick: function (info) {
            let eventSelected = info.event;
            let eventSelectedDateMonth = eventSelected.start.getMonth() + 1;

            $('#ModalEdit #edit-start').prop("min", `${eventSelected.start.getFullYear()}-${(eventSelectedDateMonth < 10) ? '0' + eventSelectedDateMonth : eventSelectedDateMonth}-${eventSelected.start.getDate()}T05:00`);
            $('#ModalEdit #edit-start').prop("max", `${eventSelected.start.getFullYear()}-${(eventSelectedDateMonth < 10) ? '0' + eventSelectedDateMonth : eventSelectedDateMonth}-${eventSelected.start.getDate()}T21:00`);

            $('#ModalEdit #edit-id').val(eventSelected.id);
            const eventUser = usersList.find(user => user.name === eventSelected.title);
            console.log("EVENT USER: ", eventUser.id);
            $(`#ModalEdit #edit-title option[value="${eventUser.id}"]`).prop('selected', true);
            $('#ModalEdit #edit-color').val(eventSelected.backgroundColor);
            $('#ModalEdit #edit-start').val(moment(eventSelected.start).format('YYYY-MM-DDTHH:mm'));
            $('#ModalEdit #edit-end').val(moment(eventSelected.end).format('YYYY-MM-DDTHH:mm'));
            $('#ModalEdit').modal('show');
        }
    });

    calendar.render();


}
main();

$('#create-event-form').submit(async function (event) {
    event.preventDefault();
    const newEventTitle = $("#title>option:selected").text();
    const newEventColor = $('#color').val();
    const newEventStart = $('#start').val();
    const newEventEnd = $('#end').val();
    const newEvent = await createEvent({
        title: newEventTitle,
        color: newEventColor,
        start: moment(newEventStart).format('YYYY-MM-DD HH:mm:ss'),
        end: moment(newEventEnd).format('YYYY-MM-DD HH:mm:ss'),
        user_id: user.id
    });

    calendar.addEvent(newEvent);
    $('#ModalAdd').modal('toggle');
});


$('#edit-event-form').submit(async function (event) {
    event.preventDefault();

    const eventSelectedId = $('#edit-id').val();
    const eventToEdit = calendar.getEventById(eventSelectedId);

    if ($('#delete-event-checkbox').prop("checked")) {
        await deleteEvent(eventSelectedId);
        eventToEdit.remove();
        $('#delete-event-checkbox').prop("checked", false);

    } else {
        const edittingEventTitle = $('#edit-title option:selected ').text();
        console.log("texto option: ", $('#edit-title option:selected ').text());
        const edittingEventColor = "#0071c5";
        const edittingEventStart = $('#edit-start').val();
        const edittingEventEnd = $('#edit-end').val();

        const eventEditted = await updateEvent({
            id: eventSelectedId,
            title: edittingEventTitle,
            color: edittingEventColor,
            start: moment(edittingEventStart).format('YYYY-MM-DD HH:mm:ss'),
            end: moment(edittingEventEnd).format('YYYY-MM-DD HH:mm:ss'),
            user_id: $('#edit-title option:selected').val()
        });

        eventToEdit.remove();
        calendar.addEvent(eventEditted);
    }

    $('#ModalEdit').modal('toggle');
});