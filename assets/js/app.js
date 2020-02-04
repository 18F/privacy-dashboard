// Add your custom javascript here
console.log("Hi from Federalist");

$(document).ready( function () {
    $('#myTable').DataTable({
        paging: false,
        scrollX: true,
        searchHighlight: true
     });
});


