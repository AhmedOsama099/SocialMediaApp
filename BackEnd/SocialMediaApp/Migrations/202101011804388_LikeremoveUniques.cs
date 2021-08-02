namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class LikeremoveUniques : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Likes", new[] { "UserHandle" });
            DropIndex("dbo.Likes", new[] { "ScreamId" });
            CreateIndex("dbo.Likes", "UserHandle");
            CreateIndex("dbo.Likes", "ScreamId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Likes", new[] { "ScreamId" });
            DropIndex("dbo.Likes", new[] { "UserHandle" });
            CreateIndex("dbo.Likes", "ScreamId", unique: true);
            CreateIndex("dbo.Likes", "UserHandle", unique: true);
        }
    }
}
