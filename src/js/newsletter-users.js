
$('#datatable').DataTable({
    ajax: {
        "url": `${API_URL}/newsletterusers`,
        "dataType": 'json',
        "headers": {
            "Authorization": `Bearer ${getCookie("token")}`
        },
        "contentType": 'application/json',
        "dataSrc": 'data'
    },
    columns: [
        { data: 'id' },
        { data: 'name' },
        { data: 'email' },
        { data: 'cellphone' }
    ]
});