namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class NotificationsTableConfigurations : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.Notifications");
            AlterColumn("dbo.Notifications", "Id", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.Notifications", "Id");
            CreateIndex("dbo.Notifications", "Id", unique: true);
        }
        
        public override void Down()
        {
            DropIndex("dbo.Notifications", new[] { "Id" });
            DropPrimaryKey("dbo.Notifications");
            AlterColumn("dbo.Notifications", "Id", c => c.Int(nullable: false, identity: true));
            AddPrimaryKey("dbo.Notifications", "Id");
        }
    }
}
