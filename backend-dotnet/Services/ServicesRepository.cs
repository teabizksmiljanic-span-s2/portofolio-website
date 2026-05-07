using DotnetDuo.Api.Models;

namespace DotnetDuo.Api.Services;

public interface IServicesRepository
{
    Task<IEnumerable<ServiceItem>> GetServicesAsync();
}

public class ServicesRepository : IServicesRepository
{
    public async Task<IEnumerable<ServiceItem>> GetServicesAsync()
    {
        // Simulate database fetch (e.g., using Entity Framework Core or Dapper)
        await Task.Delay(100);
        
        return new List<ServiceItem>
        {
            new("vibe", "1. 🤖 VIBE Coding & AI-Accelerated Development", "Ship faster without sacrificing quality", 
                new[] { "Rapid application prototyping", "Prompt-driven architecture" }, "Startups"),
            new("modernisation", "2. 🔄 .NET Modernisation", "Old system. New future.", 
                new[] { "Legacy to .NET 8", "Monolith to microservices" }, "Enterprise")
        };
    }
}
