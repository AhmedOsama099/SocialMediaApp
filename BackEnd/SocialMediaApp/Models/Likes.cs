using SocialMediaApp.Models.IdentityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SocialMediaApp.Models
{
    public class Likes
    {
        public int Id { get; set; }
        public string UserHandle { get; set; }
        public string ScreamId { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual Screams Screams { get; set; }
    }
}