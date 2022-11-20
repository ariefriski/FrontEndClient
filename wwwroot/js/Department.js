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
    var hapus = confirm("Yakin ingin menghapus ?");
    if (hapus) {
        $.ajax({
            url: `https://localhost:44332/api/Department/${Id}`,
            type: "DELETE", // <- Change here
            contentType: "application/json",
            success: function () {
                alert("Data dihapus");
                location.reload();
            },
            error: function () {
            }
        });
    }
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
                    alert("Data dibuat");
                    location.reload();
                }, error: function () {
                }
            });
            //alert(typeof(IdDep));
            //alert(IdDep);
            //alert(Name);
            //alert(DivisionId);
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
                alert("Data Diupdate");
                location.reload();
            }, error: function () {
            }
        });
        //alert(typeof(IdDep));
        //alert(IdDep);
        //alert(Name);
        //alert(DivisionId);
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