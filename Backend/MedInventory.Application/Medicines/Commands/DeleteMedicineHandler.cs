using MediatR;
using MedInventory.Domain.Interfaces;

namespace MedInventory.Application.Medicines.Commands;

public class DeleteMedicineHandler(IMedicineRepository repository) : IRequestHandler<DeleteMedicineCommand, Unit>
{
    public async Task<Unit> Handle(DeleteMedicineCommand request, CancellationToken cancellationToken)
    {
        await repository.DeleteAsync(request.Id);
        return Unit.Value;
    }
}