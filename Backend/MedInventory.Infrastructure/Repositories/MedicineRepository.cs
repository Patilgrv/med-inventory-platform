using MedInventory.Domain.Entities;
using MedInventory.Domain.Interfaces;
using MedInventory.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace MedInventory.Infrastructure.Repositories;

public class MedicineRepository : IMedicineRepository
{
    private readonly AppDbContext _context;

    public MedicineRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Medicine medicine)
    {
        await _context.Medicines.AddAsync(medicine);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<Medicine>> GetAllAsync()
    {
        return await _context.Medicines.ToListAsync();
    }

    public async Task<Medicine?> GetByIdAsync(Guid id)
    {
        return await _context.Medicines.FindAsync(id);
    }

    public async Task UpdateAsync(Medicine medicine) 
    {
        _context.Medicines.Update(medicine);
            await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(Guid id)
    {
        var medicine = await _context.Medicines.FindAsync(id);
        if (medicine != null)
        {
            _context.Medicines.Remove(medicine);
            await _context.SaveChangesAsync();
        }
    }
}