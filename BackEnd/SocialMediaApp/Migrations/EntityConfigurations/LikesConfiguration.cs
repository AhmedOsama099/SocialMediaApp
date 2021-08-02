using SocialMediaApp.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace SocialMediaApp.Migrations.EntityConfigurations
{
    public class LikesConfiguration : EntityTypeConfiguration<Likes>
    {

        public LikesConfiguration()
        {
            // Table Name Determining
            ToTable("Likes");
            // Primary Key Determining
            HasKey(l => l.Id);
            // id auto increment
            Property(l => l.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
            // scream id property unique 
            Property(l => l.ScreamId).HasMaxLength(128);
       
            // userhandle property unique
            Property(l => l.UserHandle).HasMaxLength(128);
       


        }
    }
}