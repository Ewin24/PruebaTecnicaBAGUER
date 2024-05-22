using API.Dtos;
using AutoMapper;
using Dominio.Entities;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Usuario, UsuarioDTO>().ReverseMap();
        CreateMap<Usuario, RegistroUsuarioDTO>().ReverseMap();
        CreateMap<InicioSesionDTO, Usuario>().ReverseMap();
    }
}