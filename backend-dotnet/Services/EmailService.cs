using DotnetDuo.Api.Models;

namespace DotnetDuo.Api.Services;

public interface IEmailService
{
    Task<bool> SendContactEmailAsync(ContactRequest request);
}

public class EmailService : IEmailService
{
    private readonly ILogger<EmailService> _logger;

    public EmailService(ILogger<EmailService> logger)
    {
        _logger = logger;
    }

    public async Task<bool> SendContactEmailAsync(ContactRequest request)
    {
        // Simulate async email sending (e.g., via SendGrid, SMTP, or Azure Communication Services)
        _logger.LogInformation("Sending email from {Email}...", request.Email);
        
        // Simulate network latency
        await Task.Delay(500); 
        
        _logger.LogInformation("Email sent successfully.");
        return true;
    }
}
