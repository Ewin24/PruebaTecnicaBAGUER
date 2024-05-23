document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("login-button").addEventListener("click", function (event) {
        event.preventDefault();
        var nombreUsuario = document.getElementById("name").value;
        var password = document.getElementById("password").value;
        var data = {
            NombreUsuario: nombreUsuario,
            ClaveHash: password
        };
        if (nombreUsuario == "" || password == "") {
            window.alert("Campos no validos")
        } else {
            const endpointUrl = "http://localhost:5124/api/Usuarios/login";
            fetch(endpointUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then(response => {
                    console.log(response);
                    if (!response.ok) {
                        window.alert("Credenciales no validas")
                        throw new Error('Contraseña o email incorrecto');
                    }
                    return response.json();
                })
                .then(data => {
                    console.log(data)
                    if (data.message === 'Inicio de sesión exitoso') {
                        window.location.href = "/FrontEnd/Pages/usuarios.html";
                        localStorage.setItem('nombreUsuario', nombreUsuario);
                    } else {
                        console.log("La respuesta del backend no es verdadera");
                        window.alert("Credenciales no validas")
                    }
                })
                .catch(error => {
                    alert(error.message);
                });
        }
    });
});