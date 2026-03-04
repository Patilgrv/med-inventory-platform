using MediatR;
using MedInventory.Domain.Entities;
using MedInventory.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedInventory.Application.Medicines.Queries
{
    public class GetMedicinesHandler(IMedicineRepository repository) : 
        IRequestHandler<GetMedicinesQuery, IEnumerable<Medicine>>
    {
        public async Task<IEnumerable<Medicine>> Handle(GetMedicinesQuery request, CancellationToken cancellationToken)
        {
            return await repository.GetAllAsync();
        }

    }
}
