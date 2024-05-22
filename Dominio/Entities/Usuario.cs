namespace Dominio.Entities;
public class Usuario : BaseEntity
{
    public string NombreUsuario { get; set; }
    public string Nombres { get; set; }
    public string ClaveHash { get; set; }

    //relaciones
    public int RolId { get; set; } //unidireaccional hacia rol
    public Rol Rol { get; set; }
}
