#:sdk Aspire.AppHost.Sdk@13.0.2
#:package Aspire.Hosting.JavaScript@*
#:package CommunityToolkit.Aspire.Hosting.SQLite@*
#:project ./WebApi/WebApi.csproj

var builder = DistributedApplication.CreateBuilder(args);

var sqlite = builder.AddSqlite("db", Environment.CurrentDirectory, "app.db")
     .WithSqliteWeb(c =>
     {
        // https://github.com/CommunityToolkit/Aspire/issues/1060
         c.WithArgs("app.db");
     });

var api = builder.AddProject<Projects.WebApi>("api")
    .WithReference(sqlite);
    ;

var viteApp = builder.AddViteApp("frontend", "./frontend")
    .WithReference(api);

builder.Build().Run();
