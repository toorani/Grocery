using Microsoft.EntityFrameworkCore.Migrations;

namespace Grocery_Server.Migrations
{
    public partial class add_relation_update_goods : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Title",
                table: "Goods");

            migrationBuilder.AddColumn<string>(
                name: "DeTitle",
                table: "Goods",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EnTitle",
                table: "Goods",
                maxLength: 50,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "FaTitle",
                table: "Goods",
                maxLength: 50,
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DeTitle",
                table: "Goods");

            migrationBuilder.DropColumn(
                name: "EnTitle",
                table: "Goods");

            migrationBuilder.DropColumn(
                name: "FaTitle",
                table: "Goods");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "Goods",
                type: "varchar(50) CHARACTER SET utf8mb4",
                maxLength: 50,
                nullable: true);
        }
    }
}
