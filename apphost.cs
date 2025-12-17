#:sdk Aspire.AppHost.Sdk@13.0.2
#:package Aspire.Hosting.JavaScript@*
#:package Aspire.Hosting.Azure.PostgreSQL@*
#:package Aspire.Hosting.Azure.AppContainers@*
#:package CommunityToolkit.Aspire.Hosting.PostgreSQL.Extensions@*
#:project ./WebApi/WebApi.csproj

var builder = DistributedApplication.CreateBuilder(args);

// Add Azure Container Apps environment for deployment
builder.AddAzureContainerAppEnvironment("aca");

// Use Azure PostgreSQL Flexible Server (runs as container locally)
var pgServer = builder.AddAzurePostgresFlexibleServer("pg")
    .RunAsContainer();

var postgres = pgServer.AddDatabase("db");

// Add DbGate and connect it to the PostgreSQL server
builder.AddDbGate("dbgate")
    .WithReference(pgServer);

var api = builder.AddProject<Projects.WebApi>("api")
    .WithReference(postgres)
    .WaitFor(postgres)
    .WithExternalHttpEndpoints();

var frontend = builder.AddViteApp("frontend", "./frontend")
    .WithReference(api)
    .WithOtlpExporter()
    .WithExternalHttpEndpoints();

builder.Build().Run();
