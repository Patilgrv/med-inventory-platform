using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MedInventory.Domain.Entities
{
    public class Medicine
    {
        // A unique ID so we can find this specific medicine later
        public Guid Id { get; set; }

        // The name of the medicine (e.g., "Paracetamol")
        public string Name { get; set; } = string.Empty;

        // How many are currently on the shelf
        public int Quantity { get; set; }

        // The price per unit
        public decimal Price { get; set; }

        // When this item was added to our system
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
