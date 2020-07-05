#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app


FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["Grocery_Server.csproj", ""]
RUN dotnet restore "./Grocery_Server.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "Grocery_Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Grocery_Server.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Grocery_Server.dll"]