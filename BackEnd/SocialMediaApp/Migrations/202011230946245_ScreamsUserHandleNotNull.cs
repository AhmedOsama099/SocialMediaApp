namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ScreamsUserHandleNotNull : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Screams", new[] { "UserHandle" });
            CreateIndex("dbo.Screams", "UserHandle");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Screams", new[] { "UserHandle" });
            CreateIndex("dbo.Screams", "UserHandle", unique: true);
        }
    }
}
