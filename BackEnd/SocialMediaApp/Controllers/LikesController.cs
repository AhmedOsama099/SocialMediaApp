using SocialMediaApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace SocialMediaApp.Controllers
{
    [RoutePrefix("api/Screams/{ScreamId}")]
    public class LikesController : ApiController
    {
        ApplicationDbContext context = new ApplicationDbContext();

        public class Data
        {
            public string userHandle { get; set; }
            public string screamId { get; set; }

        }

        [Route("Like")]
        // GET: api/Likes
        [HttpGet]
        public HttpResponseMessage Like()
        {
            // Define user depending on user toke
            var email = HttpContext.Current.User.Identity.Name;
            var userHandlesList = context.Users.Where(s => s.Email == email).ToList();
            var userHandle = userHandlesList[0].UserHandle;

            var urlParamsArray = Request.RequestUri.AbsoluteUri.Split('/');
            var screamId = urlParamsArray[5];
            var likeExists = context.Likes
                .Where(l => l.UserHandle == userHandle)
                .Where(l => l.ScreamId == screamId).FirstOrDefault();


            var scream = context.Screams.Where(s => s.ScreamId == screamId).FirstOrDefault();

            if (scream != null)
            {
                if (likeExists == null)
                {
                    Likes like = new Likes()
                    {
                        ScreamId = screamId,
                        UserHandle = userHandle
                    };
                    context.Likes.Add(like);
                    context.SaveChanges();


                    ScreamsController screamsController = new ScreamsController();
                    var scream1 = screamsController.Get(scream.ScreamId);
                    return Request.CreateResponse(HttpStatusCode.OK, scream1);

                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Scream Already Liked!");
                }
            }
            else
            {

                return Request.CreateResponse(HttpStatusCode.NotFound, "Scream Already Liked!");
            }

        }



        [Route("UnLike")]
        // GET: api/Likes
        [HttpGet]
        public HttpResponseMessage UnLike()
        {
            // Define user depending on user toke
            var email = HttpContext.Current.User.Identity.Name;
            var userHandlesList = context.Users.Where(s => s.Email == email).ToList();
            var userHandle = userHandlesList[0].UserHandle;

            var urlParamsArray = Request.RequestUri.AbsoluteUri.Split('/');
            var screamId = urlParamsArray[5];
            var likeExists = context.Likes
                .Where(l => l.UserHandle == userHandle)
                .Where(l => l.ScreamId == screamId).FirstOrDefault();


            var scream = context.Screams.Where(s => s.ScreamId == screamId).FirstOrDefault();

            if (scream != null)
            {
                if (likeExists != null)
                {

                    context.Likes.Remove(context.Likes
                   .Where(l => l.UserHandle == userHandle)
                   .Where(l => l.ScreamId == screamId).FirstOrDefault());
                    context.SaveChanges();

                    ScreamsController screamsController = new ScreamsController();
                    var scream1 = screamsController.Get(scream.ScreamId);
                    return Request.CreateResponse(HttpStatusCode.OK, scream1);
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Scream Not Liked!");

                }
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound, "No screams found");

            }

        }



        [Route("GetUserLikes")]
        // GET: api/Likes
        [HttpGet]
        public List<Data> GetUserLikes(string user)
        {
            return context.Likes.AsEnumerable().Where(s => s.UserHandle == user).Select( s => new Data() {userHandle= s.UserHandle, screamId = s.ScreamId }).ToList();

        }
    }
}   