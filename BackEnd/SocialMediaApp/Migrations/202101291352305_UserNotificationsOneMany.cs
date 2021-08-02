namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserNotificationsOneMany : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Notifications", "Sender", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.Notifications", "Sender");
            AddForeignKey("dbo.Notifications", "Sender", "dbo.ApplicationUsers", "UserHandle", cascadeDelete: false);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Notifications", "Sender", "dbo.ApplicationUsers");
            DropIndex("dbo.Notifications", new[] { "Sender" });
            AlterColumn("dbo.Notifications", "Sender", c => c.String());
        }
    }
}
