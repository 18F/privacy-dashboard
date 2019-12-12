// Add your custom javascript here
console.log("Hi from Federalist");
$(document).ready( function () {
    $('#myTable').DataTable({
        searchHighlight: true,
        "columns": [
            { "searchable": false, "width": "10%" },
            { "searchable": true, "width": "10%" },
            { "searchable": false, "width": "35%" },
            { "searchable": false, "width": "35%" },
            null
        ] });
} );