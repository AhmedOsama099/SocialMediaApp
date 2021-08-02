using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SocialMediaApp.Models.POCO_Classes
{
    public class ApplicationUserPOCO
    {
        public string UserHandle { get; set; }
        public string ImagePath { get; set; }
        // Navigation property of screams
        public virtual ICollection<ScreamsPOCO> ScreamsPOCO { get; set; }

    }
}