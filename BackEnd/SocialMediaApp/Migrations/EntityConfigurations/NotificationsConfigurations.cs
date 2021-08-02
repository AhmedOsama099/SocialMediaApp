using SocialMediaApp.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace SocialMediaApp.Migrations.EntityConfigurations
{
    public class NotificationsConfigurations : EntityTypeConfiguration<Notifications>
    {
        public NotificationsConfigurations()
        {
            ToTable("Notifications");

            HasKey(n => n.Id);

            Property(n => n.Id)
           .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None)
           .IsRequired();

            Property(n => n.Recipient)
                .IsRequired()
                .HasMaxLength(128);


            HasIndex(n => n.Id)
          .IsUnique();




        }

    }
}