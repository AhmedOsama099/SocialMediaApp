namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddCommentsTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Comments",
                c => new
                    {
                        CommentId = c.String(nullable: false, maxLength: 128),
                        ScreamId = c.String(nullable: false, maxLength: 128),
                        UserHandle = c.String(nullable: false, maxLength: 128),
                        Body = c.String(nullable: false),
                        CreatedAt = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.CommentId)
                .Index(t => t.CommentId, unique: true);
            
        }
        
        public override void Down()
        {
            DropIndex("dbo.Comments", new[] { "CommentId" });
            DropTable("dbo.Comments");
        }
    }
}
