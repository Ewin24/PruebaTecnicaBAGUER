using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Dtos
{
    public class RegistroUsuarioDTO
    {
        public string Nombres { get; set; }
        public string NombreUsuario { get; set; }
        public string ClaveHash { get; set; }
    }
}