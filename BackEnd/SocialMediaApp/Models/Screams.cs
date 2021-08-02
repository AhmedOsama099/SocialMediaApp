using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using SocialMediaApp.Models.IdentityModels;
using Newtonsoft.Json;
using System.Net.Http;

namespace SocialMediaApp.Models
{
    public class Screams
    {
       
        public string ScreamId { get; set; }
        public string CreatedAt { get; set; }
        public string Body { get; set; }
        public int LikeCount { get; set; }
        public int CommentCount { get; set; }
        // Navigation property of application user
        public virtual ApplicationUser ApplicationUser { get; set; }
        // Navigation property of Comments
        public virtual ICollection<Comments> Comments { get; set; }
        // Navigation property of Likes
        public virtual ICollection<Likes> Likes { get; set; }
        // Navigation property of Notifications

        [JsonIgnore]
        public virtual ICollection<Notifications> Notifications { get; set; }
        // Foreign Key
        public string UserHandle { get; set; }

      
    }
}