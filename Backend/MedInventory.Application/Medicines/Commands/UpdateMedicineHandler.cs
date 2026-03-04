using MediatR;
using MedInventory.Domain.Interfaces;

namespace MedInventory.Application.Medicines.Commands;

public class UpdateMedicineHandler(IMedicineRepository repository) : IRequestHandler<UpdateMedicineCommand, Unit>
{
    public async Task<Unit> Handle(UpdateMedicineCommand request, CancellationToken cancellationToken)
    {
        var medicine = await repository.GetByIdAsync(request.Id);

        if (medicine == null) throw new Exception("Medicine not found!");

        medicine.Name = request.Name;
        medicine.Quantity = request.Quantity;
        medicine.Price = request.Price;

        await repository.UpdateAsync(medicine);

        return Unit.Value;
    }
}