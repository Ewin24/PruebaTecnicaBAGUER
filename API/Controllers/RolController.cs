using API.Dtos;
using Dominio.Entities;
using Dominio.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class RolController : BaseController
    {
        private readonly IUnitOfWork _unitOfWork;

        public RolController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<ActionResult<IEnumerable<Rol>>> GetRoles()
        {
            var roles = await _unitOfWork.Roles.GetAllAsync();
            return Ok(roles);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult<Rol>> RegistroRol(Rol rol)
        {
            if (rol == null)
            {
                return BadRequest();
            }
            this._unitOfWork.Roles.Add(rol);
            await _unitOfWork.SaveAsync();

            return CreatedAtAction(nameof(RegistroRol), new { id = rol.Id }, rol);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult<Rol>> GetRol(int id)
        {
            var rol = await _unitOfWork.Roles.GetByIdAsync(id);
            if (rol == null)
            {
                return NotFound();
            }
            return Ok(rol);
        }
    }
}