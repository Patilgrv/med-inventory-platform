using MediatR;
using MedInventory.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedInventory.Application.Medicines.Queries
{
    public record GetMedicinesQuery() : IRequest<IEnumerable<Medicine>>;
}
