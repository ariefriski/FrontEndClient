$(document).ready(function () {
    $('#btnLogin').click(function () {
        var email = $('#login-email').val().trim();
        var password = $('#login-password').val().trim();
       // var datas = $('#myForm').serialize();
        var datas = { email, password };
        $.ajax({
            url: 'https://localhost:44332/api/User/Login',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(datas),
            success: function (data) {
                if (data.Message == "Login gagal") {
                    Swal.fire("Error!", `${data.Message}`, "error")
                } else {
                    Swal.fire("Done!", `${data.Message}`, "success")
                    console.log(data.Token)
                }

            }, error: function (jqXHR) {
               Swal.fire("Error!", "Please try again", "error");

            }

        })

    });
});

$(document).ready(function () {
    $('#btnRegister').click(function () {
        var name= $('#fullname').val().trim();
        var email = $('#signup-email').val().trim();
        var birthdate = $('#birthdate').val().trim();
        var password = $('#signup-password').val().trim();
        // var datas = $('#myForm').serialize();
        var datas = { name,email,birthdate, password };
        $.ajax({
            url: 'https://localhost:44332/api/User/Register',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(datas),
            success: function (data) {
                if (data.Message == "Error Email Sudah Terdaftar!") {
                    Swal.fire("Error!", `${data.Message}`, "error")
                } else {
                    Swal.fire("Done!", `${data.Message}`, "success")
                   // console.log(data.Token)
                }

            }, error: function (jqXHR) {
                Swal.fire("Error!", "Please try again", "error");
                console.log(datas);
                alert(jqXHR.responseText);
            }

        })

    });
});
//$(document).ready(function () {
//    $('#btnBuat').on('click', function (e) {
//        var fullname = $('#fullname').val();
//        var email = $('#signup-email').val();
//        var birthdate = $('#birthdate').val();
//        var password = $('#signup - password').val();
//        var data = { fullname,email,birthdate, password };
//        $.ajax({
//            url: "https://localhost:44332/api/User/Register",
//            type: "POST",
//            contentType: "application/json",
//            data: JSON.stringify(data),
//            success: function () {
//                alert("Login Sukses");

//            }, error: function (jqXHR) {
//                alert("Login Gagal");
//                alert(jqXHR.responseText)
//            }
//        });




//    });
//});

//$(document).ready(function () {
//    $("#form").submit(function (e) {
//        e.preventDefault();
//        var login = {
//            email: $('#login-email').val(),
//            password: $('#login-password').val(),
//        }
//        $.ajax({
//            type: "POST",
//            url: "https://localhost:44332/api/User/Login",
//            data: JSON.stringify(login),
//            type: "application/json",
//            // encode: true,
//            success: function () {
//                alert("Login Sukses");

//            }, error: function (jqXHR) {
//                alert(JSON.stringify(login));
//                alert(jqXHR.responseText)
//            }
//        });
  


       
//    });
//});