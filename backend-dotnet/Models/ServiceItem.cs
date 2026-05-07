namespace DotnetDuo.Api.Models;

public record ServiceItem(
    string Id,
    string Title,
    string Subtitle,
    string[] Items,
    string BestFor
);
