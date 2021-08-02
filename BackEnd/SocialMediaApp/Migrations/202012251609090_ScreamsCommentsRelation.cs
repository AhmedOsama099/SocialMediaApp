namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ScreamsCommentsRelation : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Comments", "ScreamId");
            AddForeignKey("dbo.Comments", "ScreamId", "dbo.Screams", "ScreamId", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Comments", "ScreamId", "dbo.Screams");
            DropIndex("dbo.Comments", new[] { "ScreamId" });
        }
    }
}
