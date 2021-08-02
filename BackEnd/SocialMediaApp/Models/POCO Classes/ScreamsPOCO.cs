using SocialMediaApp.Models.IdentityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SocialMediaApp.Models.POCO_Classes
{
    public class ScreamsPOCO
    {
        public string ScreamId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Body { get; set; }
        public int LikeCount { get; set; }
        public int CommentCount { get; set; }
        // Foreign Key
        public string UserHandle { get; set; }
        // Navigation property of application user
        public virtual ApplicationUserPOCO ApplicationUser { get; set; }
        // Navigation property of Comments

    }
}