namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class RemovingCommentsRealtions : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Comments", "UserHandle", "dbo.ApplicationUsers");
            DropForeignKey("dbo.Comments", "ScreamId", "dbo.Screams");
            DropIndex("dbo.Comments", new[] { "ScreamId" });
            DropIndex("dbo.Comments", new[] { "UserHandle" });
        }
        
        public override void Down()
        {
            CreateIndex("dbo.Comments", "UserHandle");
            CreateIndex("dbo.Comments", "ScreamId");
            AddForeignKey("dbo.Comments", "ScreamId", "dbo.Screams", "ScreamId", cascadeDelete: true);
            AddForeignKey("dbo.Comments", "UserHandle", "dbo.ApplicationUsers", "Id", cascadeDelete: true);
        }
    }
}
