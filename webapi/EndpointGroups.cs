using Microsoft.EntityFrameworkCore;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Endpoints;

public static class FamousPaintingsEndpoints
{
    public static RouteGroupBuilder MapFamousPaintingsApi(this RouteGroupBuilder group)
    {
        group.MapGet("/paintings", async (AppDbContext db) =>
            await db.FamousPaintings.ToListAsync())
            .WithName("GetAllPaintings")
            .WithSummary("Get all famous paintings")
            .WithDescription("Retrieves a list of all famous paintings in the database.");

        group.MapGet("/paintings/{id:int}", async (int id, AppDbContext db) =>
            await db.FamousPaintings.FindAsync(id)
                is FamousPainting painting
                    ? Results.Ok(painting)
                    : Results.NotFound())
            .WithName("GetPaintingById")
            .WithSummary("Get a painting by ID")
            .WithDescription("Retrieves a specific famous painting by its unique identifier.");

        group.MapPost("/paintings", async (FamousPainting painting, AppDbContext db) =>
        {
            db.FamousPaintings.Add(painting);
            await db.SaveChangesAsync();
            return Results.Created($"/api/paintings/{painting.Id}", painting);
        })
        .WithName("CreatePainting")
        .WithSummary("Create a new painting")
        .WithDescription("Adds a new famous painting to the database.");

        group.MapPut("/paintings/{id:int}", async (int id, FamousPainting inputPainting, AppDbContext db) =>
        {
            var painting = await db.FamousPaintings.FindAsync(id);
            if (painting is null)
            {
                return Results.NotFound();
            }

            painting.Title = inputPainting.Title;
            painting.Artist = inputPainting.Artist;
            painting.Year = inputPainting.Year;
            painting.Medium = inputPainting.Medium;
            painting.Museum = inputPainting.Museum;
            painting.Description = inputPainting.Description;

            await db.SaveChangesAsync();
            return Results.NoContent();
        })
        .WithName("UpdatePainting")
        .WithSummary("Update an existing painting")
        .WithDescription("Updates the details of an existing famous painting.");

        group.MapDelete("/paintings/{id:int}", async (int id, AppDbContext db) =>
        {
            var painting = await db.FamousPaintings.FindAsync(id);
            if (painting is null)
            {
                return Results.NotFound();
            }

            db.FamousPaintings.Remove(painting);
            await db.SaveChangesAsync();
            return Results.NoContent();
        })
        .WithName("DeletePainting")
        .WithSummary("Delete a painting")
        .WithDescription("Removes a famous painting from the database.");

        return group;
    }
}
