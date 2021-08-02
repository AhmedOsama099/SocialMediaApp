namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserCommentRelation : DbMigration
    {
        public override void Up()
        {
            CreateIndex("dbo.Comments", "UserHandle");
            AddForeignKey("dbo.Comments", "UserHandle", "dbo.ApplicationUsers", "UserHandle", cascadeDelete: false);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Comments", "UserHandle", "dbo.ApplicationUsers");
            DropIndex("dbo.Comments", new[] { "UserHandle" });
        }
    }
}
