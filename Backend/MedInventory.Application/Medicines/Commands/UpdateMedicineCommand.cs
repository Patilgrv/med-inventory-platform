using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedInventory.Application.Medicines.Commands
{
    public record UpdateMedicineCommand(
        Guid Id,
        string Name,
        int Quantity,
        decimal Price) : IRequest<Unit>;
    // 'Unit' is MediatR's way of saying "void" or "nothing to return"

}
