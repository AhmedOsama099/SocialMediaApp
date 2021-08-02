namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UserNotificationsManyMany : DbMigration
    {
        public override void Up()
        {
            //DropForeignKey("dbo.Notifications", "Sender", "dbo.ApplicationUsers");
            //DropIndex("dbo.Notifications", new[] { "Sender" });
            CreateTable(
                "dbo.UsersNotifications",
                c => new
                {
                    Recipient = c.String(nullable: false, maxLength: 128),
                    Notifications_Id = c.Int(nullable: false),
                })
                .PrimaryKey(t => new { t.Recipient, t.Notifications_Id })
                .ForeignKey("dbo.ApplicationUsers", t => t.Recipient, cascadeDelete: false)
                .ForeignKey("dbo.Notifications", t => t.Notifications_Id, cascadeDelete: false)
                .Index(t => t.Recipient)
                .Index(t => t.Notifications_Id);

            AlterColumn("dbo.Notifications", "Recipient", c => c.String(nullable: false, maxLength: 128));
            //AddColumn("dbo.Notifications", "Recipient", c => c.String(maxLength: 128));
            //AlterColumn("dbo.Notifications", "Sender", c => c.String());
            CreateIndex("dbo.Notifications", "Recipient");
            AddForeignKey("dbo.Notifications", "Recipient", "dbo.ApplicationUsers", "UserHandle");

         
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Notifications", "Recipient", "dbo.ApplicationUsers");
            DropForeignKey("dbo.UsersNotifications", "Notifications_Id", "dbo.Notifications");
            DropForeignKey("dbo.UsersNotifications", "Recipient", "dbo.ApplicationUsers");
            DropIndex("dbo.UsersNotifications", new[] { "Notifications_Id" });
            DropIndex("dbo.UsersNotifications", new[] { "Recipient" });
            DropIndex("dbo.Notifications", new[] { "Recipient" });
            AlterColumn("dbo.Notifications", "Sender", c => c.String(nullable: false, maxLength: 128));
            AlterColumn("dbo.Notifications", "Recipient", c => c.String());
            DropColumn("dbo.Notifications", "Recipient");
            DropTable("dbo.UsersNotifications");
            CreateIndex("dbo.Notifications", "Sender");
            AddForeignKey("dbo.Notifications", "Sender", "dbo.ApplicationUsers", "Id", cascadeDelete: true);
        }
    }
}
