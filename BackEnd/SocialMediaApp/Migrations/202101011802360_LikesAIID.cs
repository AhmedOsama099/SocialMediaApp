namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class LikesAIID : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Likes", new[] { "ScreamId" });
            DropPrimaryKey("dbo.Likes");
            AlterColumn("dbo.Likes", "Id", c => c.Int(nullable: false, identity: true));
            AlterColumn("dbo.Likes", "ScreamId", c => c.String(nullable: false, maxLength: 128));
            AddPrimaryKey("dbo.Likes", "Id");
            CreateIndex("dbo.Likes", "ScreamId", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.Likes", new[] { "ScreamId" });
            DropPrimaryKey("dbo.Likes");
            AlterColumn("dbo.Likes", "ScreamId", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.Likes", "Id", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.Likes", "Id");
            CreateIndex("dbo.Likes", "ScreamId", unique: true);
        }
    }
}
