async function getAdmin(adminId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${API_URL}/admins/${adminId}`,
            headers: {
                "Authorization": `Bearer ${getCookie("token")}`
            },
            contentType: 'application/json',
            method: 'GET',
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}


async function updateAdmin(adminId, adminToUpdate) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${API_URL}/admins/${adminId}`,
            headers: {
                "Authorization": `Bearer ${getCookie("token")}`
            },
            contentType: 'application/json',
            method: 'PUT',
            data: JSON.stringify(adminToUpdate),
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

async function insertAdmin(adminToInsert) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${API_URL}/admins`,
            headers: {
                "Authorization": `Bearer ${getCookie("token")}`
            },
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify(adminToInsert),
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                reject(error);
            }
        });
    });
}

async function prepareToUpdate(element) {
    const adminId = $(element).parents('tr').find('td:first-child').text();

    try {
        const adminInfo = await getAdmin(adminId);

        $('#edit-id').val(adminId);
        $('#edit-identification').val(adminInfo.identification);
        $('#edit-name').val(adminInfo.name);
        $('#edit-email').val(adminInfo.email);
        $('#edit-account-state').val(adminInfo.account_state);

        $('.modal-container').css('display', 'flex');
        $("#modal-editar").addClass('active');
        $("#btn-cerrar-popup").css('display', 'block');

    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Problema interno.',
            text: error
            // text: "Lo sentimos, ha surgido un problema interno. Intentalo más tarde"
        });
    }
}

$('#btn-cerrar-popup').click(function () {
    $('.modal-container').css('display', 'flex');
    $('.modal-fade').removeClass('active');
    $("#btn-cerrar-popup").css('display', 'none');
});

$("#btn-agregar").click(function () {
    $('.modal-container').css('display', 'flex');
    $("#modal-agregar").addClass('active');
    $("#btn-cerrar-popup").css('display', 'block');
});

$('#btn-update').click(async function () {
    const adminId = $('#edit-id').val();
    const identification = $('#edit-identification').val();
    let name = $('#edit-name').val();
    name = name.toUpperCase();
    const email = $('#edit-email').val();

    if (identification === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Escribe un número de identificación."
        });

    } else if (name === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Escribe un nombre."
        });

    } else if (email === '') {
         Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Escribe un correo electrónico."
        });

    } else {
        try {
            await updateAdmin(adminId, {
                identification: identification,
                name: name,
                email: email
            });

            $('#edit-id').val("");
            $('#edit-identification').val("");
            $('#edit-name').val("");
            $('#edit-email').val("");

            $('.modal-container').css('display', 'flex');
            $('.modal-fade').removeClass('active');
            $("#btn-cerrar-popup").css('display', 'none');

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Administrador actualizado',
                showConfirmButton: false,
                timer: 1500
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Problema interno.',
                text: error
                // text: "Lo sentimos, ha surgido un problema interno. Intentalo más tarde"
            });
        }
    }
});

$('#btn-insert').click(async function () {
    const identification = $('#add-identification').val();
    let name = $('#add-name').val();
    name = name.toUpperCase();
    const email = $('#add-email').val();
    const password = $('#add-password').val();

    if (identification === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Escribe un número de identificación."
        });

    } else if (name === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Escribe un nombre."
        });

    } else if (email === '') {
         Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Escribe un correo electrónico."
        });

    } else if (password === '') {
        Swal.fire({
           icon: 'error',
           title: 'Ups!',
           text: "Escribe una contraseña."
       });

   } else {
        try {
            await insertAdmin({
                identification: identification,
                name: name,
                email: email,
                password: password,
            });

            $('#add-id').val("");
            $('#add-identification').val("");
            $('#add-name').val("");
            $('#add-email').val("");
            $('#add-password').val("");

            $('.modal-container').css('display', 'flex');
            $('.modal-fade').removeClass('active');
            $("#btn-cerrar-popup").css('display', 'none');

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Administrador creado',
                showConfirmButton: false,
                timer: 1500
            });

        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Problema interno.',
                text: error
                // text: "Lo sentimos, ha surgido un problema interno. Intentalo más tarde"
            });
        }
    }
});

$('#datatable').DataTable({
    ajax: {
        "url": `${API_URL}/admins`,
        "dataType": 'json',
        "headers": {
            "Authorization": `Bearer ${getCookie("token")}`
        },
        "contentType": 'application/json',
        "dataSrc": 'data'
    },
    columns: [
        { data: 'id' },
        { data: 'identification' },
        { data: 'name' },
        { data: 'email' },
        {
            defaultContent: `<button class="col-12 btn btn-primary btn-editar" onclick="prepareToUpdate(this)">editar</button>`
        }
    ]
});