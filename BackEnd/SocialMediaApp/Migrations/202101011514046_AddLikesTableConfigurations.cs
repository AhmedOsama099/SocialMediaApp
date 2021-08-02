namespace SocialMediaApp.Migrations
{
    using System.Data.Entity.Migrations;

    public partial class AddLikesTableConfigurations : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.Likes");
            AlterColumn("dbo.Likes", "id", c => c.Int(nullable: false));
            AlterColumn("dbo.Likes", "userHandle", c => c.String(maxLength: 128));
            AlterColumn("dbo.Likes", "screamId", c => c.String(nullable: false, maxLength: 128));
            AddPrimaryKey("dbo.Likes", "id");
            CreateIndex("dbo.Likes", "userHandle", unique: true);
            CreateIndex("dbo.Likes", "screamId", unique: true);
        }

        public override void Down()
        {
            DropIndex("dbo.Likes", new[] { "screamId" });
            DropIndex("dbo.Likes", new[] { "userHandle" });
            DropPrimaryKey("dbo.Likes");
            AlterColumn("dbo.Likes", "screamId", c => c.String());
            AlterColumn("dbo.Likes", "userHandle", c => c.String());
            AlterColumn("dbo.Likes", "id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.Likes", "id");
        }
    }
}
