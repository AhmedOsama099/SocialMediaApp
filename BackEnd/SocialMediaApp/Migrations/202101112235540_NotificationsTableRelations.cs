namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class NotificationsTableRelations : DbMigration
    {
        public override void Up()
        {
         

            AlterColumn("dbo.Notifications", "ScreamId", c => c.String(nullable: false, maxLength: 128));
            CreateIndex("dbo.Notifications", "ScreamId");
            AddForeignKey("dbo.Notifications", "ScreamId", "dbo.Screams", "ScreamId", cascadeDelete: false);
        }

        public override void Down()
        {
        
            DropForeignKey("dbo.Notifications", "ScreamId", "dbo.Screams");
            DropIndex("dbo.Notifications", new[] { "ScreamId" });
            AlterColumn("dbo.Notifications", "ScreamId", c => c.String());
        }
    }
}
