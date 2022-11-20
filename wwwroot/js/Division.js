$(document).ready(function () {

    $('#table_division').DataTable({

        ajax: {
            url: 'https://localhost:44332/api/Division',
            dataSrc: 'data',
            "headers": {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
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
                className: "d-none d-sm-table-cell",
                "render": function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#editModal" onclick="GetDetail('${data.Id}')">Edit</button>
                        <button type="button" class="btn btn-danger" onclick="Delete('${data.Id}')">Hapus</button>`;
                }
            }

        ]

    });
});

function GetDetail(Id) {
    $.ajax({
        url: `https://localhost:44332/api/Division/${Id}`,
        type: "GET"
    }).done((res) => {
        let temp = "";

        temp += `
                          <tr>
                          <input type="hidden" class="form-control" id="hiddenIdDiv" readonly placeholder="" value="0">
                          <td><input type="text" id="divId" class="form-control"  readonly placeholder="${res.Data.Id}" value="${res.Data.Id}"></td>
                          <td><input type="text" id="divName" class="form-control" readonly placeholder="${res.Data.Name}" value="${res.Data.Name}"></td>
                          </tr>`;
        console.log(res);
        console.log(res.Data);
        $("#table_modal_edit").html(temp);
    }).fail((err) => {
        console.log(err);
    });
}

function Delete(Id) {
    var hapus = confirm("Yakin ingin menghapus ?");
    if (hapus) {
        $.ajax({    
            url: `https://localhost:44332/api/Division/${Id}`,
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
    $('#insertBtnDiv').on('click', function () {
        //  $("#insertBtn").attr("disabled", "disabled");
        var Id = parseInt($('#IdDiv').val());
        var Name = $('#divisionName').val();
        var data = { Id, Name};
        if (Name != "") {
            $.ajax({
                url: "https://localhost:44332/api/Division",
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
    $('#editBtn').on('click', function () {
        var id = parseInt($('#divId').val());
        $('#divName').removeAttr('readonly', 'readonly');
        $('#saveEdit').removeAttr('hidden');
        $('#saveEdit').attr('onclick', `editData(${id})`);
    });
});

function editData(id) {
    var Id = parseInt($('#hiddenIdDiv').val());
    var Name = $('#divName').val();
    var data = { Id, Name };
    if (Name != "") {
        $.ajax({
            url: `https://localhost:44332/api/Division/update/${id}`,
            type: "PUT",
            contentType: "application/json",
            dataType: "json",
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