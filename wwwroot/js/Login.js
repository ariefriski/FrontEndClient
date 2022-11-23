$(document).ready(function () {
    $('#btnLogin').on('click', function () {
        var email = $('#login-email').val();
        var password = $('#login-password').val();
        var data = { email, password };
        $.ajax({
            
            url: `https://localhost:44332/api/User/Login?email=${email}`+`&password=${password}`,
            type: 'POST',
            async:'false',
          
            contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
            success: function () {
                alert("Login Sukses");
            },
            error: function (jqXHR) {
                alert("Login Gagal");
                alert(jqXHR.responseText);
            }
        });
        


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