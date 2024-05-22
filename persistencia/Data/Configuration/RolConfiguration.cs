using Dominio.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistencia.Data.Configuration;
public class RolConfiguration : IEntityTypeConfiguration<Rol>
{
    public void Configure(EntityTypeBuilder<Rol> builder)
    {

        // Nombre de la tabla en la base de datos
        builder.ToTable("Roles");

        // Configuración de las propiedades
        builder.Property(r => r.Nombre)
               .IsRequired()
               .HasMaxLength(100);
        builder.Property(r => r.Descripcion)
               .IsRequired()
               .HasMaxLength(250);
    }
}
