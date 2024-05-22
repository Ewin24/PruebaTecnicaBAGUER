using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class InicioSesionDTO
    {
        public string NombreUsuario { get; set; }
        public string ClaveHash { get; set; }
    }
}