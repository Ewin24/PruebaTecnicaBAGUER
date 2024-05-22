namespace Dominio.Entities;
public class Rol : BaseEntity
{
    public string Nombre { get; set; }
    public string Descripcion { get; set; }

    //Relaciones 
    //sin relacion ya que usuario lleva la foranea
}