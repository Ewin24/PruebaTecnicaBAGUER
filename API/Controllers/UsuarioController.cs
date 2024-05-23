using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Dominio.Entities;
using Aplicacion.UnitOfWork;
using Dominio.Interfaces;
using API.Dtos;
using AutoMapper;
using Persistencia;
using iText.Signatures;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class UsuariosController : BaseController
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        private readonly ApiContext _context;
        private readonly AuthService _authService;

        public UsuariosController(IUnitOfWork unitOfWork, IMapper mapper, ApiContext context, AuthService authService)
        {
            _unitOfWork = unitOfWork;
            _authService = authService;
            _mapper = mapper;
            _context = context;
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<UsuarioDTO>> GetUsuario(int id)
        {
            var result = await _unitOfWork.Usuarios.GetByIdAsync(id);
            return _mapper.Map<UsuarioDTO>(result);
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<IEnumerable<UsuarioDTO>>> GetUsuarios()
        {
            var result = await _unitOfWork.Usuarios.GetAllAsync();
            return _mapper.Map<List<UsuarioDTO>>(result);
        }

        [HttpPost("registro")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]

        public async Task<ActionResult<Usuario>> RegistroUsuario(RegistroUsuarioDTO registroUsuarioDTO)
        {
            var existingUserWithUserName = await _context.Usuarios.FirstOrDefaultAsync(u => u.NombreUsuario == registroUsuarioDTO.NombreUsuario);
            if (existingUserWithUserName != null)
            {
                ModelState.AddModelError("Nombre de Usuario", "El nombre de usuario ya está registrado");
                return BadRequest(ModelState);
            }

            var result = _mapper.Map<Usuario>(registroUsuarioDTO);
            Console.WriteLine(result.ClaveHash);
            string ClaveHashed = _authService.GenerarClaveHash(result.ClaveHash);
            result.ClaveHash = ClaveHashed;
            result.RolId = 20;

            this._unitOfWork.Usuarios.Add(result);
            await _unitOfWork.SaveAsync();

            if (result == null)
            {
                return BadRequest();
            }

            registroUsuarioDTO.Nombres = result.Nombres;
            return CreatedAtAction(nameof(RegistroUsuario), new { id = registroUsuarioDTO.Nombres }, registroUsuarioDTO);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> EditUsuario(int id, [FromBody] UsuarioUpdateDTO usuarioDto)
        {
            var usuario = await _unitOfWork.Usuarios.GetByIdAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }

            usuario.Nombres = usuarioDto.Nombres;
            usuario.NombreUsuario = usuarioDto.NombreUsuario;
            try
            {
                _unitOfWork.Usuarios.Update(usuario);
                await _unitOfWork.SaveAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest("Error al actualizar el usuario: " + ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteUsuario(int id)
        {
            var usuario = await _unitOfWork.Usuarios.GetByIdAsync(id);
            if (usuario == null)
            {
                return NotFound();
            }
            _unitOfWork.Usuarios.Remove(usuario);
            await _unitOfWork.SaveAsync();

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] InicioSesionDTO credenciales)
        {
            var result = _authService.Authenticate(credenciales.NombreUsuario, credenciales.ClaveHash);

            if (result)
            {
                return Ok(new { message = "Inicio de sesión exitoso" });
            }
            else
            {
                return Unauthorized(new { message = "Correo electrónico o contraseña incorrectos" });
            }
        }
    }
}