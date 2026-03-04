using MediatR;

namespace MedInventory.Application.Medicines.Commands;

public record DeleteMedicineCommand(Guid Id) : IRequest<Unit>;