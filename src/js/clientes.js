
async function getUser(userId) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${API_URL}/users/${userId}`,
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

async function updateUser(userId, userToUpdate) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${API_URL}/users/${userId}`,
            headers: {
                "Authorization": `Bearer ${getCookie("token")}`
            },
            contentType: 'application/json',
            method: 'PUT',
            data: JSON.stringify(userToUpdate),
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
    const userId = $(element).parents('tr').find('td:first-child').text();

    try {
        const userInfo = await getUser(userId);

        $('#edit-id').val(userId);
        $('#edit-identification').val(userInfo.identification);
        $('#edit-name').val(userInfo.name);
        $('#edit-age').val(userInfo.age);
        $('#edit-weight').val(userInfo.weight);
        $('#edit-email').val(userInfo.email);
        $('#edit-cellphone').val(userInfo.cellphone);
        $('#edit-wounds').val(userInfo.wounds);

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

async function insertUser(userToInsert) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `${API_URL}/users`,
            headers: {
                "Authorization": `Bearer ${getCookie("token")}`
            },
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify(userToInsert),
            success: function (data) {
                resolve(data);
            },
            error: function (error) {
                if (error.status === 409) {
                    reject("Este Número de identifición o correo ya existe");

                }
            }

        });
    });
}



$('#btn-cerrar-popup').click(function () {
    $('.modal-container').css('display', 'none');
    $('.modal-fade').removeClass('active');
    $("#btn-cerrar-popup").css('display', 'none');
});

$("#btn-agregar").click(function () {
    $('.modal-container').css('display', 'flex');
    $("#modal-agregar").addClass('active');
    $("#btn-cerrar-popup").css('display', 'block');
});




$('#btn-update').click(async function () {
    const userId = $('#edit-id').val();
    const identification = $('#edit-identification').val();
    let name = $('#edit-name').val();
    name = name.toUpperCase();
    const age = $('#edit-age').val();
    const weight = $('#edit-weight').val();
    const email = $('#edit-email').val();
    const cellphone = $('#edit-cellphone').val();
    const wounds = $('#edit-wounds').val();

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

    } else if (age === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Escribe una edad."
        });

    } else if (weight === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Escribe el peso."
        });

    } else if (email === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Escribe un correo electrónico."
        });

    } else if (cellphone === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Escribe el número de celular."
        });

    } else if (wounds === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Escribe las lesiones/ heridas."
        });

    } else {
        try {
            await updateUser(userId, {
                identification: identification,
                name: name,
                age: age,
                weight: weight,
                email: email,
                cellphone: cellphone,
                wounds: wounds
            });

            $('#edit-id').val("");
            $('#edit-identification').val("");
            $('#edit-name').val("");
            $('#edit-age').val("");
            $('#edit-weight').val("");
            $('#edit-email').val("");
            $('#edit-cellphone').val("");
            $('#edit-wounds').val("");

            $('.modal-container').css('display', 'none');
            $('.modal-fade').removeClass('active');
            $("#btn-cerrar-popup").css('display', 'none');

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
    const age = $('#add-age').val();
    const weight = $('#add-weight').val();
    const email = $('#add-email').val();
    const cellphone = $('#add-cellphone').val();
    const wounds = $('#add-wounds').val();
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

    } else if (age === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Escribe una edad."
        });

    } else if (weight === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Escribe el peso."
        });

    } else if (email === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Escribe un correo electrónico."
        });

    } else if (cellphone === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Escribe el número de celular."
        });

    } else if (wounds === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Escribe las lesiones/ heridas."
        });

    } else if (password === '') {
        Swal.fire({
            icon: 'error',
            title: 'Ups!',
            text: "Cree una contraseña"
        });

    } else {
        try {
            await insertUser({
                identification: identification,
                name: name,
                age: age,
                weight: weight,
                email: email,
                cellphone: cellphone,
                wounds: wounds,
                password: password
            });

            $('#add-identification').val("");
            $('#add-name').val("");
            $('#add-age').val("");
            $('#add-weight').val("");
            $('#add-email').val("");
            $('#add-cellphone').val("");
            $('#add-wounds').val("");
            $('#add-password').val("");

            $('.modal-container').css('display', 'flex');
            $('.modal-fade').removeClass('active');
            $("#btn-cerrar-popup").css('display', 'none');

            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Usuario creado.',
                showConfirmButton: false,
                timer: 1500
            });

           var dataSend = {
               solicitud: "enviarMsj",
               name,
               email,
               password
            }
            
            $.ajax({
                url: "../../controller/enviar-correo.php",
                data: dataSend,
                method: "POST",
                dataType: "JSON",
                cache: false
            })

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
        responsive: true,
        serverSide: true,
        // url: 'http://localhost:64506/api/values',
        // // dataType: 'text',
        // type: 'post',
        // contentType: 'application/x-www-form-urlencoded',
        // data: {
        //     RecordsStart: data.start,
        //     PageSize: data.length
        // },
        // success: function( data, textStatus, jQxhr ){
        //     callback({
        //         // draw: data.draw,
        //         data: data.Data,
        //         recordsTotal:  data.TotalRecords,
        //         recordsFiltered:  data.RecordsFiltered
        //     });
        // },
        // error: function( jqXhr, textStatus, errorThrown ){
        // }
        paging: true,
        pageLength: 5,
        "url": `${API_URL}/users`,
        "dataType": 'json',
        "headers": {
            "Authorization": `Bearer ${getCookie("token")}`
        },
        "contentType": 'application/json',
        // "dataSrc": 'data',
        "data": function ( d ) {
            return JSON.stringify( d );
          }

          

    },
    language: {
        "processing": "Cargando información...",
        "lengthMenu": "Mostrar _MENU_ filas",
        "zeroRecords": "¡Aún no tienes ingresos!",
        "emptyTable": "¡Aún no tienes ingresos!",
        "info": "Del _START_ al _END_ , Total: _TOTAL_",
        "infoEmpty": "¡No hay datos para mostrar!",
        "infoFiltered": "(filtrado de un total de MAX registros)",
        "infoPostFix": "",
        search: "_INPUT_",
        searchPlaceholder: "Buscar...",
        "thousands": ",",
        "loadingRecords": "Por Favor Espera - Cargando información...",
        "paginate": {
            "first": "Primero",
            "last": "Último",
            "next": 'Siguiente',
            "previous": 'Anterior'
        },
        "aria": {
            "sortAscending": ": Activar para ordenar la columna de manera ascendente",
            "sortDescending": ": Activar para ordenar la columna de manera descendente"
        }
    },
    columns: [
        { data: 'id' },
        { data: 'identification' },
        { data: 'name' },
        { data: 'age' },
        { data: 'email' },
        { data: 'cellphone' },
        {
            defaultContent: `<button class="col-12 btn btn-primary btn-editar" onclick="prepareToUpdate(this)">editar</button>`
        }
    ]
});
