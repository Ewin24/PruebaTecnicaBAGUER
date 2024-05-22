using Dominio.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistencia;

public class AuthService
{
    private readonly ApiContext _dbContext;

    public AuthService(ApiContext dbContext)
    {
        _dbContext = dbContext;
    }

    public bool Authenticate(string nombreUsuario, string clave)
    {
        // Buscar al usuario
        var usuario = _dbContext.Usuarios.FirstOrDefault(u => u.NombreUsuario == nombreUsuario);

        if (usuario != null)
        {
            // Verificar la clave
            if (VerificarClave(clave, usuario.ClaveHash))
            {
                // Autenticar al usuario exitosamente
                return true;
            }
        }

        // Si no se encuentra al usuario, o si la clave no coincide, la autenticación falla
        return false;
    }

    private bool VerificarClave(string clave, string claveHashAlmacenada)
    {
        return BCrypt.Net.BCrypt.Verify(clave, claveHashAlmacenada);
    }

    public Usuario GenerarUsuarioConClaveHash(Usuario usuario)
    {
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(usuario.ClaveHash);

        usuario.ClaveHash = hashedPassword;

        return usuario;
    }
    public string GenerarClaveHash(string clave)
    {
        string hashedPassword = BCrypt.Net.BCrypt.HashPassword(clave);

        clave = hashedPassword;

        return clave;
    }
}
