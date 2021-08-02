using SocialMediaApp.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace SocialMediaApp.Migrations.EntityConfigurations
{
    public class CommentsConfiguration : EntityTypeConfiguration<Comments>
    {
        public CommentsConfiguration()
        {
            // Table Name Determining
            ToTable("Comments");

            //  Primary Key Determining 
            HasKey(c => c.CommentId);

            // Defining General Properties
            // Comment Id
            Property(c => c.CommentId)
            .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None)
            .IsRequired()
            .HasMaxLength(128);

            HasIndex(c => c.CommentId)
            .IsUnique();

            // Body
            Property(c => c.Body)
            .IsMaxLength()  // Giving body var char max length.
            .IsRequired();  // Making body prop required


            // ScreamId  ==> foreign key
            Property(c => c.ScreamId)
            .HasMaxLength(128)  // Giving scream id var char 128.
            .IsRequired();  // Making scream id prop required

            // UserHandle  ==> foreign key
            Property(c => c.UserHandle)
            .HasMaxLength(128)  // Giving user handle var char 128.
            .IsRequired();  // Making scream id prop required



        }
    }
}