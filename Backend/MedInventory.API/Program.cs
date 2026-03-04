using MedInventory.Application.Medicines.Commands;
using MedInventory.Domain.Interfaces;
using MedInventory.Infrastructure.Persistence;
using MedInventory.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


// 1. Register the Database (DbContext)
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// 2. Register the Repository
// This says: "Whenever someone asks for IMedicineRepository, give them MedicineRepository"
builder.Services.AddScoped<IMedicineRepository, MedicineRepository>();

// 3. Register MediatR
// This tells MediatR to look in the Application project for your Handlers
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(AddMedicineCommand).Assembly));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
