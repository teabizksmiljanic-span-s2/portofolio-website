using DotnetDuo.Api.Models;
using DotnetDuo.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace DotnetDuo.Api.Endpoints;

public static class ContactEndpoints
{
    public static void MapContactEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/contact").WithTags("Contact");

        group.MapPost("/", async ([FromBody] ContactRequest request, IEmailService emailService) =>
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Message))
            {
                return Results.BadRequest(new { Error = "Email and Message are required." });
            }

            var success = await emailService.SendContactEmailAsync(request);
            
            return success 
                ? Results.Ok(new { Message = "Message sent successfully!" }) 
                : Results.StatusCode(500);
        })
        .WithName("SubmitContactForm")
        .Produces(StatusCodes.Status200OK)
        .Produces(StatusCodes.Status400BadRequest);
    }
}
