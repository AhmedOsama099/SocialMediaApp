using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.Owin;
using Owin;
using Microsoft.Owin.Cors;

[assembly: OwinStartup(typeof(SocialMediaApp.Startup))]

namespace SocialMediaApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            // CORS enabling for both OAuth and general.
            app.UseCors(CorsOptions.AllowAll);
            ConfigureAuth(app);
            // Signal r Configuration
            app.MapSignalR();
        }
    }
}
