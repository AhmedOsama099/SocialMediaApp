namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddLikesTableRelations : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Likes", new[] { "userHandle" });
            AlterColumn("dbo.Likes", "userHandle", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.Likes", "userHandle", unique: true);
            AddForeignKey("dbo.Likes", "screamId", "dbo.Screams", "ScreamId", cascadeDelete: false);
            AddForeignKey("dbo.Likes", "userHandle", "dbo.ApplicationUsers", "UserHandle", cascadeDelete: false);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Likes", "userHandle", "dbo.ApplicationUsers");
            DropForeignKey("dbo.Likes", "screamId", "dbo.Screams");
            DropIndex("dbo.Likes", new[] { "userHandle" });
            AlterColumn("dbo.Likes", "userHandle", c => c.String(maxLength: 128));
            CreateIndex("dbo.Likes", "userHandle", unique: true);
        }
    }
}
