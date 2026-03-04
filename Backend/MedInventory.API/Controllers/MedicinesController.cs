using MediatR;
using MedInventory.Application.Medicines.Commands;
using MedInventory.Application.Medicines.Queries;
using Microsoft.AspNetCore.Mvc;

namespace MedInventory.API.Controllers;

[ApiController]
[Route("api/[controller]")] // This makes the URL: api/medicines
public class MedicinesController : ControllerBase
{
    private readonly IMediator _mediator;

    // We inject IMediator to send our command to the Handler we wrote earlier
    public MedicinesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpPost]
    public async Task<IActionResult> Create(AddMedicineCommand command)
    {
        // We send the command into the "MediatR pipe"
        var medicineId = await _mediator.Send(command);

        // Return a 200 OK response with the new ID
        return Ok(medicineId);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var medicines = await _mediator.Send(new GetMedicinesQuery());
        return Ok(medicines);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, UpdateMedicineCommand command)
    {
        if (id != command.Id) return BadRequest();
        await _mediator.Send(command);
        return NoContent(); // 204 No Content is standard for successful updates
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _mediator.Send(new DeleteMedicineCommand(id));
        return NoContent(); // 204 No Content is standard for successful deletions
    }
}