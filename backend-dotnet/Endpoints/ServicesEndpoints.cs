using DotnetDuo.Api.Services;

namespace DotnetDuo.Api.Endpoints;

public static class ServicesEndpoints
{
    public static void MapServicesEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/services").WithTags("Services");

        group.MapGet("/", async (IServicesRepository repository) =>
        {
            var services = await repository.GetServicesAsync();
            return Results.Ok(services);
        })
        .WithName("GetServices")
        .Produces(StatusCodes.Status200OK);
    }
}
