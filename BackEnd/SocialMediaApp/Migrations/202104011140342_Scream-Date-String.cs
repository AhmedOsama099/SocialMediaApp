namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ScreamDateString : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Screams", "CreatedAt", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Screams", "CreatedAt", c => c.DateTime(nullable: false));
        }
    }
}
