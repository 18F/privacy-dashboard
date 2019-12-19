// Add your custom javascript here
console.log("Hi from Federalist");

$(document).ready( function () {
    $('#myTable').DataTable({
        searchHighlight: true,
        paging: false
        // "columns": [
        //     { "searchable": true, "width": "20%" },
        //     { "searchable": true, "width": "20%" },
        //     { "searchable": true, "width": "20%" },
        //     { "searchable": false, "width": "20%" },
        //     { "searchable": false, "width": "20%" },
        // ]
     });     
});


