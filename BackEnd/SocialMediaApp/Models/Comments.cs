using SocialMediaApp.Models.IdentityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SocialMediaApp.Models
{
    public class Comments
    {
        public string CommentId { get; set; }
        public string ScreamId { get; set; }
        public string UserHandle { get; set; }
        public string Body { get; set; }
        public DateTime CreatedAt { get; set; }

        // Navigation Property of screams
        public Screams Screams { get; set; }

        // Navigation Property of ApplicationUser
        public ApplicationUser ApplicationUser { get; set; }
    }
}