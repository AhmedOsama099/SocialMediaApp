namespace SocialMediaApp.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Userdatestring : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.ApplicationUsers", "createdAt", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.ApplicationUsers", "createdAt", c => c.DateTime(nullable: false));
        }
    }
}
