namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddScreamsApplicationUserRelation : DbMigration
    {
        public override void Up()
        {
            AddForeignKey("dbo.Screams", "UserHandle", "dbo.ApplicationUsers", "UserHandle", cascadeDelete: true);
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Screams", "UserHandle", "dbo.ApplicationUsers");
        }
    }
}
