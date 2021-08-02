namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddScreamsTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Screams",
                c => new
                    {
                        ScreamId = c.String(nullable: false, maxLength: 128),
                        CreatedAt = c.DateTime(nullable: false),
                        Body = c.String(nullable: false),
                        LikeCount = c.Int(),
                        CommentCount = c.Int(),
                        UserHandle = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.ScreamId)
                .Index(t => t.ScreamId, unique: true)
                .Index(t => t.UserHandle, unique: true);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Screams", new[] { "UserHandle" });
            DropIndex("dbo.Screams", new[] { "ScreamId" });
            DropTable("dbo.Screams");
        }
    }
}
