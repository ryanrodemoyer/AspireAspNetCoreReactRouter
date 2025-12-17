namespace WebApi.Models;

public class FamousPainting
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public required string Artist { get; set; }
    public int Year { get; set; }
    public string? Medium { get; set; }
    public string? Museum { get; set; }
    public string? Description { get; set; }
    public string? ImageUrl { get; set; }
}
