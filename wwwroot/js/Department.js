$(document).ready(function(){

    $('#table_department').DataTable({

     ajax: {
           url: 'https://localhost:44332/api/Department',
           dataSrc: 'data',
           "headers": {
           'Content-Type': 'application/x-www-form-urlencoded'},
            "type": "GET",
        },
   columns: [
       {
           data: 'Id',
           className: "d-none d-sm-table-cell",
       },   
       {
           data: 'Name',
           className: "d-none d-sm-table-cell",
       },
       {
           data: null,
           className:"d-none d-sm-table-cell",
           "render": function (data, type, row, meta) {
               return `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModalDepartment" onclick="GetDetailDepartment('${data.Id}')">Edit</button>
                        <button type="button" class="btn btn-danger" onclick="DeleteDepartment('${data.Id}')">Hapus</button>`;
           }
       }

        ],
        dom: "Bfrtip",
        buttons: [
            {
                extend: "pdf",
                exportOptions: {
                    columns:[0,1]
                }
            },
            {
                extend: "csv",
                exportOptions: {
                    columns: [0, 1]
                }
            },
            {
                extend: "excel",
                exportOptions: {
                    columns: [0, 1]
                }
            },
            {
                extend: "print",
                exportOptions: {
                    columns: [0, 1]
                }
            },
            {
                extend: "copy",
                exportOptions: {
                    columns: [0, 1]
                }
            },
            "colvis"

        ]

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
                          <td><input type="text" id="divId" class="form-control" readonly placeholder="${res.Data.DivisionId}" value="${res.Data.DivisionId}"></td>
                          </tr>`;
        //console.log(res);
        //console.log(res.Data);
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

$(document).ready(function () {
    $('#insertBtnDepartment').on('click', function () {
      //  $("#insertBtn").attr("disabled", "disabled");
        var IdDep = parseInt($('#IdDep').val());
        var Name = $('#departmentName').val();
        var DivisionId = parseInt($('#divisionId').val());
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
        var id = parseInt($('#deptId').val());
        $('#deptName').removeAttr('readonly', 'readonly');
        $('#divId').removeAttr('readonly', 'readonly');
        $('#saveEditDepartment').removeAttr('hidden');
        $('#saveEditDepartment').attr('onclick', `editDataDept(${id})`);
    });




});

function editDataDept(id) {
    var Id = parseInt($('#hiddenId').val());
    var Name = $('#deptName').val();
    var DivisionId = parseInt($('#divId').val());
    var data = {Id,Name, DivisionId };
    if (Name != "" && DivisionId != "") {
        $.ajax({
            url: `https://localhost:44332/api/Department/update/${id}`,
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