using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedInventory.Application.Medicines.Commands
{
    // This defines WHAT data we need from the user
    // IRequest<Guid> means this command will return the ID of the new medicine
    public record AddMedicineCommand(
        string Name,
        int Quantity,
        decimal Price) : IRequest<Guid>;
}
