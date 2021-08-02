using Microsoft.AspNet.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR.Hubs;

namespace SocialMediaApp.Hubs
{
    [HubName("notificationsHub")]
    public class NotificationsHub : Hub
    {
        [HubMethodName("sendNotification")]
        public void SendNotification(string body, string sender, string recepient)
        {
            // Save in DB


            // Prodcast to clients
            // newNoftification is the event to be consumed.
            Clients.All.newNotification(body, sender, recepient);
        }

    }
}