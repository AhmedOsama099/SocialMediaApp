using Microsoft.AspNet.Identity.EntityFramework;
using SocialMediaApp.Migrations.EntityConfigurations;
using SocialMediaApp.Models.IdentityModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SocialMediaApp.Models
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            //this.Configuration.LazyLoadingEnabled = false;
            //this.Configuration.ProxyCreationEnabled = false;
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        // Adding Models DbSets
        //public virtual DbSet<ApplicationUser> ApplicationUser { get; internal set; }
        public virtual DbSet<Screams> Screams { get; set; }
        public virtual DbSet<Comments> Comments { get; set; }
        public virtual DbSet<Likes> Likes { get; set; }
        public virtual DbSet<Notifications> Notifications { get; set; }

        // Adding configurations by fluent api
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Adding ApplicationUser Table Configuration
            modelBuilder.Configurations.Add(new ApplicationUserConfiguration());

            // Adding Screams Table Configuration
            modelBuilder.Configurations.Add(new ScreamsConfiguration());

            // Adding Comments Table Configuration
            modelBuilder.Configurations.Add(new CommentsConfiguration());
            // Adding Likes Table Configuration
            modelBuilder.Configurations.Add(new LikesConfiguration());

            // Adding Notifications Table Configuration
            modelBuilder.Configurations.Add(new NotificationsConfigurations());


        }

    }
}