using MedInventory.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedInventory.Domain.Interfaces
{
    public interface IMedicineRepository
    {
        // A contract saying: "Whoever implements this MUST be able to add a medicine"
        Task AddAsync(Medicine medicine);

        // A contract saying: "Whoever implements this MUST be able to give me all medicines"
        Task<IEnumerable<Medicine>> GetAllAsync();
    }
}
