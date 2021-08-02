using FluentValidation;
using SocialMediaApp.Models;
using SocialMediaApp.Models.IdentityModels;
using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace SocialMediaApp.Migrations.EntityConfigurations
{
    // Validation using Fluent API
    public class ApplicationUserConfiguration : EntityTypeConfiguration<ApplicationUser>
    {
        public ApplicationUserConfiguration()
        {
            // UserHandle property
            Property(a => a.UserHandle).IsRequired().HasMaxLength(128);
            HasIndex(a => a.UserHandle).IsUnique();

            // Image Path property
            Property(a => a.ImagePath).IsOptional().IsMaxLength();

            // Ignore Image file in mapping between database and code via entity framework
            Ignore(a => a.ImageFile);

            // Bio property
            Property(a => a.Bio).IsOptional().HasMaxLength(250);
            // Location property
            Property(a => a.Location).IsOptional().HasMaxLength(100);
            // Website property
            Property(a => a.WebSite).IsOptional().HasMaxLength(50);

            // One to many relation ship with comments
            HasMany(a => a.Comments)
            .WithRequired(c => c.ApplicationUser)
            .HasForeignKey(c => c.UserHandle);

            // One to many relationship with likes
            HasMany(a => a.Likes)
          .WithRequired(c => c.ApplicationUser)
          .HasForeignKey(c => c.UserHandle);

            // One to many relation between sender user and nad notifications 
            HasMany(a => a.Notifications)
                .WithRequired(n => n.ApplicationUser)
                .HasForeignKey(n => n.Sender);

            // Many to many relationship with Notifications
            HasMany(a => a.Notifications)
            .WithMany(n => n.ApplicationUsers)
            .Map(m => m.ToTable("UsersNotifications"));







        }
    }

    // Validation Using Fluent Validation
    public class ApplicationUserValidator : AbstractValidator<ApplicationUser>
    {
        public ApplicationUserValidator()
        {
            RuleFor(a => a.UserHandle).Must(BeUniqueUserHandle).WithName("UserHandle").WithMessage("User handle must be unique");
        }

        // Cutsom validator for unique user handles
        private bool BeUniqueUserHandle(string handle)
        {
            return new ApplicationDbContext().Users.FirstOrDefault(a => a.UserHandle == handle) == null;

        }
    }



}