namespace DotnetDuo.Api.Models;

// Using C# 12 record types for immutable data models
public record ContactRequest(
    string Name,
    string Email,
    string Message
);
