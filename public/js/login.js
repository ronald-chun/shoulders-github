$(document).ready(function() {
    $("form").ajaxForm({
        timeout: 5000,
        url: "/login",
        type: "POST",
        error: function(e) {
            if (e.status === 401 && e.statusText === "Unauthorized") {
                alert("Incorrect username or password");
            }
            //alert(e.statusText);
        },
        success: function(data, textStatus, jqXHR) {
            window.location.assign("/home");
        }
    });
});