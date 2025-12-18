#:sdk Aspire.AppHost.Sdk@13.1.0
#:package Aspire.Hosting.JavaScript@13.1.0
#:package Aspire.Hosting.Azure.PostgreSQL@13.1.0
#:package Aspire.Hosting.Azure.AppContainers@13.1.0
#:package Aspire.Hosting.Azure.ApplicationInsights@13.1.0
#:package CommunityToolkit.Aspire.Hosting.PostgreSQL.Extensions@*
#:project ./WebApi/WebApi.csproj

var builder = DistributedApplication.CreateBuilder(args);
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

// this guard ensures Application Insights is only added in publish mode
// (when deploying to production)
if (builder.ExecutionContext.IsPublishMode)
{
    // Add Azure Application Insights for production telemetry
    var appInsights = builder.AddAzureApplicationInsights("appInsights");
    api.WithReference(appInsights);
    frontend.WithReference(appInsights);
}

builder.Build().Run();
