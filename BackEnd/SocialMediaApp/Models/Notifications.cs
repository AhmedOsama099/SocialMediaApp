using SocialMediaApp.Models.IdentityModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SocialMediaApp.Models
{
    public class Notifications
    {
        public int Id { get; set; }
        public string Recipient { get; set; }
        public string Sender { get; set; }
        public bool IsRead { get; set; }
        public string ScreamId { get; set; }
        public DateTime CreatedAt { get; set; }
        public string type { get; set; }
        public virtual Screams Screams { get; set; }
        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual ICollection<ApplicationUser> ApplicationUsers { get; set; }
    }
}