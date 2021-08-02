namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddUserDate : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.ApplicationUsers", "createdAt", c => c.DateTime(nullable: true));
        }
        
        public override void Down()
        {
            DropColumn("dbo.ApplicationUsers", "createdAt");
        }
    }
}
