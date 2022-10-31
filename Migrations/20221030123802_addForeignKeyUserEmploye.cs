using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BelajarWeb1.Migrations
{
    /// <inheritdoc />
    public partial class addForeignKeyUserEmploye : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "employeeId",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Users_employeeId",
                table: "Users",
                column: "employeeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Employees_employeeId",
                table: "Users",
                column: "employeeId",
                principalTable: "Employees",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Employees_employeeId",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Users_employeeId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "employeeId",
                table: "Users");
        }
    }
}
