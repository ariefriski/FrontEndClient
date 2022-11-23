function format(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>Division Id:</td>' +
        '<td>' + d.DivisionId + '</td>' +
        '</tr>' +
        '</table>';
}

$(document).ready(function () {

    var table = $('#table_department').DataTable({

        ajax: 'https://localhost:44332/api/Department',
        columns: [
            {
                className: 'dt-control',
                orderable: false,
                data: null,
                defaultContent: '',
            },
            { data: 'Id' },
            { data: 'Name' },
        ],
        order: [[1, 'asc']],

   //  ajax: {
   //        url: 'https://localhost:44332/api/Department',
   //        dataSrc: 'data',
   //        "headers": {
   //        'Content-Type': 'application/x-www-form-urlencoded'},
   //         "type": "GET",
   //     },
   //columns: [
   //    {
   //        data: 'Id',
   //        className: "dt-control",
   //    },   
   //    {
   //        data: 'Name',
   //        className: "d-none d-sm-table-cell",
   //    },
   //    {
   //        data: null,
   //        className:"d-none d-sm-table-cell",
   //        "render": function (data, type, row, meta) {
   //            return `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModalDepartment" onclick="GetDetailDepartment('${data.Id}')">Edit</button>
   //                     <button type="button" class="btn btn-danger" onclick="DeleteDepartment('${data.Id}')">Hapus</button>`;
   //        }
   //    }

   //     ],
   //     dom: "Bfrtip",
   //     buttons: [
   //         {
   //             extend: "pdf",
   //             exportOptions: {
   //                 columns:[0,1]
   //             }
   //         },
   //         {
   //             extend: "csv",
   //             exportOptions: {
   //                 columns: [0, 1]
   //             }
   //         },
   //         {
   //             extend: "excel",
   //             exportOptions: {
   //                 columns: [0, 1]
   //             }
   //         },
   //         {
   //             extend: "print",
   //             exportOptions: {
   //                 columns: [0, 1]
   //             }
   //         },
   //         {
   //             extend: "copy",
   //             exportOptions: {
   //                 columns: [0, 1]
   //             }
   //         },
   //         "colvis"

   //     ]

    });

    $('#table_department tbody').on('click', 'td.dt-control', function () {

            var tr = $(this).closest('tr');
            var row = table.row(tr);

            if (row.child.isShown()) {
                // This row is already open - close it
                row.child.hide();
                tr.removeClass('shown');
            } else {
                // Open this row
                row.child(format(row.data())).show();
                tr.addClass('shown');
            }
        
    });
    

});

function GetDetailDepartment(Id) {
    $.ajax({
        url: `https://localhost:44332/api/Department/${Id}`,
        type:"GET"
    }).done((res) => {
            let temp = "";
            
                temp += `
                          <tr>
                          <input type="hidden" class="form-control" id="hiddenId" readonly placeholder="" value="0">
                          <td><input type="text" class="form-control" id="deptId" readonly placeholder="${res.Data.Id}" value="${res.Data.Id}"></td>
                          <td><input type="text" id="deptName" class="form-control" readonly placeholder="${res.Data.Name}" value="${res.Data.Name}"></td>
                          <td><select class="form-control" id="DivisionNameDetail" name="material-select2" disabled></select></td>
                          </tr>`;
        $.ajax({
            url: `https://localhost:44332/api/Division/${res.Data.DivisionId}`,
            type: "GET"
        }).done((rest) => {
            let divisionName = "";

            divisionName += `<option value="${rest.Data.Id}">${rest.Data.Name}</option>`



            $("#DivisionNameDetail").html(divisionName);
        })


        $("#table_modal_edit_dept").html(temp);

        }).fail((err) => {
            console.log(err);
        });
}

function DeleteDepartment(Id) {
    var urll = Id;
    return new Swal({
        title: 'Are you sure?',
        text: 'You will not be able to recover this imaginary file!',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: `https://localhost:44332/api/Department/${urll}`,
                type: "DELETE", // <- Change here
                contentType: "application/json",
                success: function (data) {
                    return new swal({
                        title: 'Success!',
                        type: 'success',
                        timer: '1500'
                    }).then(function () {
                        location.reload();
                    });

                },
                error: function () {
                    swal({
                        title: 'Oops...',
                        type: 'error',
                        timer: '1500'
                    })
                }
            });

        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
            )
        }
    })
}


$.ajax({
    url: 'https://localhost:44332/api/Division',
}).done((res) => {
    let divisions = "";
    $.each(res.data, function (key, val) {
        divisions += `<option value="${val.Id}">${val.Name}</option>`
    });

    $("#DivisionName").html(divisions);
});


$(document).ready(function () {
    $('#insertBtnDepartment').on('click', function () {
      //  $("#insertBtn").attr("disabled", "disabled");
        var IdDep = parseInt($('#IdDep').val());
        var Name = $('#departmentName').val();
        var DivisionId = parseInt($('#DivisionName').val());
        var data = { IdDep, Name, DivisionId };
        if (Name != "" && DivisionId!= "") {
            $.ajax({
                url: "https://localhost:44332/api/Department",
                type: "POST",
                contentType: "application/json",
                dataTpe: "json",
                data: JSON.stringify(data),
                //cache: false,
                success: function () {
                    return new swal({
                        title: "Good job!",
                        text: "Data di buat !",
                        icon: "success",
                        button: "Oke",
                    }).then(function () {
                        location.reload();
                    });
                }, error: function () {
                }
            });
        }
        else {
            alert('Please fill all the field !');
        }
    });
});

$(document).ready(function () {
    $('#editBtnDepartment').on('click', function () {
        $('#deptName').removeAttr('readonly', 'readonly');
        $('#divId').removeAttr('readonly', 'readonly');
        $('#DivisionNameDetail').attr('disabled', false);
        $('#saveEditDepartment').removeAttr('hidden');
        $("#DivisionNameDetail").empty();
        $.ajax({
            url: 'https://localhost:44332/api/Division',
        }).done((res) => {

            let divisions = "";
            $.each(res.data, function (key, val) {
                divisions += `<option value="${val.Id}">${val.Name}</option>`
            });

            $("#DivisionNameDetail").html(divisions);

        })
        
        var idDept = parseInt($('#deptId').val());

        $('#saveEditDepartment').attr('onclick', `editDataDept(${idDept})`);
       
    });




});

function editDataDept(idDept) {
    var idDiv = $('#DivisionNameDetail').val();
    var Id = parseInt($('#hiddenId').val());
    var Name = $('#deptName').val();
    var DivisionId = idDiv;
    var data = {Id,Name, DivisionId };
    if (Name != "" && DivisionId != "") {
        $.ajax({
            url: `https://localhost:44332/api/Department/update/${idDept}`,
            type: "PUT",
            contentType: "application/json",
            dataTpe: "json",
            data: JSON.stringify(data),
            //cache: false,
            success: function () {
                return new swal({
                    title: "Good job!",
                    text: "Data Berhasil di Edit !",
                    icon: "success",
                    button: "Oke",
                }).then(function () {
                    location.reload();
                });
            }, error: function () {
            }
        });
    }
    else {
        alert('Please fill all the field !');
        console.log(id);
    }
}

$.ajax({
    url: `https://localhost:44332/api/Department/`,
    type: "GET"
}).done((rest) => {
    let divisionId = [];
    $.each(rest.data, function (key, val) {
        divisionId.push(val.DivisionId);
    });
    $.ajax({
        url: `https://localhost:44332/api/Division/`,
        type: "GET"
    }).done((res) => {
        let divisionName = [];
        $.each(res.data, function (key, val) {
            divisionName.push(val.Name);
        });
        const counts = {};
        const sampleArray = divisionId;
        sampleArray.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        console.log(counts);
        let Cseries = [];
        for (const key in counts) {
            
            Cseries.push(counts[key]);
        }


        var options = {
            series: Cseries,
            chart: {
                width: 380,
                type: 'pie',
            },
            labels: divisionName,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    }
                }
            }]
        };


        var options2 = {
            series: [{
                data: Cseries
            }],
            chart: {
                height: 350,
                type: 'bar',
                events: {
                    click: function (chart, w, e) {
                        // console.log(chart, w, e)
                    }
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: divisionName,
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            }
        };






        var hist = new ApexCharts(document.querySelector("#hist"), options2);
        hist.render();

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
    })
    

    //console.log(rest);
    //console.log(divisionId);
}).fail((err) => {
    console.log(err);
})




//https://localhost:44332/api/Department/2
//data: null,
//    className : "align-middle text-center text-sm",
//        "render": function (data, type, row, meta) {
//            return `<button type="button" class="btn btn-primary">Edit</button>
//                        <button type="button" class="btn btn-danger">Hapus</button>`;
//$.ajax({
//    url: `https://localhost:44332/api/Department/${urll}`,
//    type: "DELETE", // <- Change here
//    contentType: "application/json",
//    success: function () {
//        swal("Poof! Your imaginary file has been deleted!", {
//            icon: "success",
//        });

//    },
//    error: function () {
//    }
//});