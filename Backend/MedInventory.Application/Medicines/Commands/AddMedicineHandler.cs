using MediatR;
using MedInventory.Domain.Entities;
using MedInventory.Domain.Interfaces;

namespace MedInventory.Application.Medicines.Commands
{
    public class AddMedicineHandler : IRequestHandler<AddMedicineCommand, Guid>
    {
        private readonly IMedicineRepository _repository;

        public AddMedicineHandler(IMedicineRepository repository)
        {
            _repository = repository;
        }

        public async Task<Guid> Handle(AddMedicineCommand request, CancellationToken cancellationToken)
        {

            var medicine = new Medicine
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Quantity = request.Quantity,
                Price = request.Price
            };

            await _repository.AddAsync(medicine);
            return medicine.Id;
            //throw new NotImplementedException();
        }
    }
}
