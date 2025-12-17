using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Data;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<FamousPainting> FamousPaintings => Set<FamousPainting>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<FamousPainting>().HasData(
            new FamousPainting
            {
                Id = 1,
                Title = "Mona Lisa",
                Artist = "Leonardo da Vinci",
                Year = 1503,
                Medium = "Oil on poplar panel",
                Museum = "Louvre Museum, Paris",
                Description = "A half-length portrait painting considered an archetypal masterpiece of the Italian Renaissance.",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg"
            },
            new FamousPainting
            {
                Id = 2,
                Title = "The Starry Night",
                Artist = "Vincent van Gogh",
                Year = 1889,
                Medium = "Oil on canvas",
                Museum = "Museum of Modern Art, New York",
                Description = "A swirling night sky over a village, painted during van Gogh's stay at the Saint-Paul-de-Mausole asylum.",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
            },
            new FamousPainting
            {
                Id = 3,
                Title = "The Persistence of Memory",
                Artist = "Salvador Dalí",
                Year = 1931,
                Medium = "Oil on canvas",
                Museum = "Museum of Modern Art, New York",
                Description = "A surrealist masterpiece featuring melting clocks in a dreamlike landscape.",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/en/d/dd/The_Persistence_of_Memory.jpg"
            },
            new FamousPainting
            {
                Id = 4,
                Title = "Girl with a Pearl Earring",
                Artist = "Johannes Vermeer",
                Year = 1665,
                Medium = "Oil on canvas",
                Museum = "Mauritshuis, The Hague",
                Description = "Often referred to as the 'Mona Lisa of the North', depicting a girl wearing an exotic dress and a large pearl earring.",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg"
            },
            new FamousPainting
            {
                Id = 5,
                Title = "The Birth of Venus",
                Artist = "Sandro Botticelli",
                Year = 1485,
                Medium = "Tempera on canvas",
                Museum = "Uffizi Gallery, Florence",
                Description = "Depicts the goddess Venus emerging from the sea as a fully grown woman.",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg"
            },
            new FamousPainting
            {
                Id = 6,
                Title = "The Scream",
                Artist = "Edvard Munch",
                Year = 1893,
                Medium = "Oil, tempera, pastel and crayon on cardboard",
                Museum = "National Gallery, Oslo",
                Description = "An expressionist icon showing an agonized figure against a tumultuous orange sky.",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/800px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg"
            },
            new FamousPainting
            {
                Id = 7,
                Title = "Guernica",
                Artist = "Pablo Picasso",
                Year = 1937,
                Medium = "Oil on canvas",
                Museum = "Museo Reina Sofía, Madrid",
                Description = "A powerful anti-war statement responding to the bombing of Guernica during the Spanish Civil War.",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Mural_del_%22Guernica%22_de_Picasso.jpg/2560px-Mural_del_%22Guernica%22_de_Picasso.jpg"
            },
            new FamousPainting
            {
                Id = 8,
                Title = "The Great Wave off Kanagawa",
                Artist = "Katsushika Hokusai",
                Year = 1831,
                Medium = "Woodblock print",
                Museum = "Various collections worldwide",
                Description = "An iconic Japanese ukiyo-e print depicting a towering wave threatening boats near Mount Fuji.",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/1280px-Tsunami_by_hokusai_19th_century.jpg"
            },
            new FamousPainting
            {
                Id = 9,
                Title = "A Sunday Afternoon on the Island of La Grande Jatte",
                Artist = "Georges Seurat",
                Year = 1886,
                Medium = "Oil on canvas",
                Museum = "Art Institute of Chicago",
                Description = "A pointillist masterpiece depicting Parisians relaxing in a suburban park.",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg/1280px-A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg"
            },
            new FamousPainting
            {
                Id = 10,
                Title = "The Night Watch",
                Artist = "Rembrandt van Rijn",
                Year = 1642,
                Medium = "Oil on canvas",
                Museum = "Rijksmuseum, Amsterdam",
                Description = "A grand group portrait of a city militia company, famous for its colossal size and dramatic use of light.",
                ImageUrl = "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/1280px-The_Night_Watch_-_HD.jpg"
            }
        );
    }
}
