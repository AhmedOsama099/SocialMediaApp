using SocialMediaApp.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace SocialMediaApp.Migrations.EntityConfigurations
{
    public class ScreamsConfiguration : EntityTypeConfiguration<Screams>
    {
        public ScreamsConfiguration()
        {
            // Table Name Determining
            ToTable("Screams");

            //  Primary Key Determining 
            HasKey(s => s.ScreamId);

            // Defining General Properties
            // Scream Id
            Property(s => s.ScreamId)
            .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None)
            .IsRequired();

            HasIndex(s => s.ScreamId)
            .IsUnique();

            // Body
            Property(s => s.Body)
            .IsMaxLength()  // Giving body var char max length.
            .IsRequired();  // Making body prop required
            // User Handle

            // User handle
            Property(s => s.UserHandle)
            .HasMaxLength(128)
            .IsRequired();    // Making userhandle prop required

            //HasIndex(s => s.UserHandle)
            //.IsUnique();     // making userhandle prop unique

            // Like Count
            Property(s => s.LikeCount).IsOptional();

            // Comment Count
            Property(s => s.CommentCount).IsOptional();



         


           // One to many relation with ApplicationUser
            HasRequired(s => s.ApplicationUser)
              .WithMany(a => a.Screams)
              .HasForeignKey(s => s.UserHandle);

            // One to many relation ship with comments
            HasMany(s => s.Comments)
                .WithRequired(c => c.Screams)
                .HasForeignKey(c => c.ScreamId);

            // One to many relationship with comments
            HasMany(s => s.Likes)
                .WithRequired(c => c.Screams)
                .HasForeignKey(c => c.ScreamId);

            // One to many realtionship with notifications
            HasMany(s => s.Notifications)
                .WithRequired(n => n.Screams)
                .HasForeignKey(n => n.ScreamId);


        }
    }
}