async function deleteNewsletterUser(element){
    const newsLetterUserId = $(element).parents('tr').find('td:first-child').text();

    try{
        const newsLetterUserInfo = await deleteNewsletterUser(newsLetterUserId);

        $("#btn-delete").val(newsLetterUserInfo);
    }catch(error){
        Swal.fire({
            icon: 'error',
            title: 'Problema interno.',
            text: error
            // text: "Lo sentimos, ha surgido un problema interno. Intentalo más tarde"
        });
    }
}

$("#btn-delete").click(async function(){
    const newsletterUserId = $("#btn-delete").val();

    try {
       await deleteNewsletterUser(newsletterUserId, {
            id
        });

        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Usuario newletter eliminado',
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

})

$('#datatable').DataTable({
    ajax: {
        url: `${API_URL}/newsletterusers`,
        dataType: 'json',
        headers: {
            "Authorization": `Bearer ${getCookie("token")}`
        },
        language: {
            "processing": "Cargando información...",
            "lengthMenu": "Mostrar MENU filas",
            "zeroRecords": "¡Aún no tienes información!",
            "emptyTable": "¡Aún no tienes información!",
            "info": "Del _START_ al _END_ , Total: _TOTAL_",
            "infoEmpty": "¡No hay datos para mostrar!",
            "infoFiltered": "(filtrado de un total de MAX registros)",
            "infoPostFix": "",
            search: "INPUT",
            searchPlaceholder: "Buscar...",
            "thousands": ",",
            "loadingRecords": "Por Favor Espera - Cargando información...",
            "paginate": {
                "first": "Primero",
                "last": "Último",
                "next": 'Anterior',
                "previous": 'Siguiente'
            },
            "aria": {
                "sortAscending": ": Activar para ordenar la columna de manera ascendente",
                "sortDescending": ": Activar para ordenar la columna de manera descendente"
            }
        },
        contentType: 'application/json',
        dataSrc: 'data',
        error: function (error) {
            if(error.status === 401){
                window.location.href = "/";
            }
        }
    },
    columns: [
        { data: 'id' },
        { data: 'name' },
        { data: 'email' },
        { data: 'cellphone' },
        {
            defaultContent: `<button class="col-12 btn btn-danger" id="btn-delete" onclick="deleteNewsletterUser(this)">Eliminar</button>`
        }
    ]
});