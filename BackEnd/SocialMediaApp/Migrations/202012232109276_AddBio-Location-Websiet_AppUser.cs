namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddBioLocationWebsiet_AppUser : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ApplicationUsers", "Bio", c => c.String(maxLength: 250));
            AddColumn("dbo.ApplicationUsers", "Location", c => c.String(maxLength: 100));
            AddColumn("dbo.ApplicationUsers", "WebSite", c => c.String(maxLength: 50));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ApplicationUsers", "WebSite");
            DropColumn("dbo.ApplicationUsers", "Location");
            DropColumn("dbo.ApplicationUsers", "Bio");
        }
    }
}
