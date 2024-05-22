using Dominio.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistencia.Data.Configuration;
public class UsuarioConfiguration : IEntityTypeConfiguration<Usuario>
{
    public void Configure(EntityTypeBuilder<Usuario> builder)
    {
        // Nombre de la tabla en la base de datos
        builder.ToTable("Usuarios");

        // Configuración de las propiedades
        // builder.Property(u => u.Password)
        //        .IsRequired()
        //        .HasMaxLength(50);

        builder.Property(u => u.NombreUsuario)
               .IsRequired()
               .HasMaxLength(50);

        builder.Property(u => u.Nombres)
               .IsRequired()
               .HasMaxLength(100);

        // Configuración de la relación con Rol
        builder.HasOne(u => u.Rol)// Usuario tiene un Rol
        .WithOne()// Un Rol pertenece a un solo Usuario
        .HasForeignKey<Usuario>(u => u.RolId);
    }
}
