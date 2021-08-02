using FluentValidation;
using FluentValidation.Attributes;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using SocialMediaApp.Migrations.EntityConfigurations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace SocialMediaApp.Models.IdentityModels
{
    [Validator(typeof(ApplicationUserValidator))]
    public class ApplicationUser : IdentityUser
    {

        public string UserHandle { get; set; }

        public string ImagePath { get; set; }

        public string Bio { get; set; }
        public string Location { get; set; }
        public string WebSite { get; set; }

        public string createdAt { get; set; }

        public HttpPostedFileWrapper ImageFile { get; set; }
        // Navigation property of screams
        public virtual ICollection<Screams> Screams { get; set; }
        // Navigation property of Comments
        public virtual ICollection<Comments> Comments { get; set; }
        // Navigation property of Likes
        public virtual ICollection<Likes> Likes { get; set; }
        // Navigation property of Notifications
        public virtual ICollection<Notifications> Notifications { get; set; }
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }


   
}