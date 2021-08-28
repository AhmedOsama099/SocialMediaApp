using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using SocialMediaApp.Models;
using SocialMediaApp.Models.IdentityModels;
using System.Web;
using System.Data.Entity;
using System.Data.SqlClient;
using System.Web.Script.Serialization;

namespace SocialMediaApp.Controllers
{
    [Authorize]

    public class DataObject
    {
        public string ScreamId { get; set; }
        public string CreatedAt { get; set; }
        public string Body { get; set; }
        public string LikeCount { get; set; }
        public string CommentCount { get; set; }
        public string UserHandle { get; set; }
        public string ImagePath { get; set; }
        public object Comments { get; set; }
    }

 


    public class ScreamsController : ApiController
    {
        ApplicationDbContext context = ApplicationDbContext.Create();
       

        // Get All Screams 
        [Route("api/Screams/GetAll")]
        public object GetAllScreams()
        {
            List<DataObject> container = new List<DataObject>();
            string cs = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand("GetAllScreams", con) {CommandType = System.Data.CommandType.StoredProcedure };
            con.Open();

            SqlDataReader reader = cmd.ExecuteReader();
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    container.Add(new DataObject()
                    {
                        Body = reader["Body"].ToString(),
                        CreatedAt = reader["CreatedAt"].ToString(),
                        UserHandle = reader["UserHandle"].ToString(),
                        ImagePath = reader["ImagePath"].ToString(),
                        CommentCount = reader["CommentsNumber"].ToString(),
                        LikeCount = reader["LikesNumber"].ToString(),
                        ScreamId = reader["ScreamId"].ToString(),
                    });
                }

            };
            con.Close();
            return container;

        }

        // GET: api/Screams
        [Route("api/Screams/GetUserScreams")]
        public IQueryable<Screams> GetUserScreams()
        {
            // I changed token returning email property to userhandle
            // to be able to match it here and returns all screams of
            // a user depending on his user handle as it's the foreign
            // key between the application user screams table.
            // Change made in ApplicationOAuthProvider.cs file
            // PS: I used another method


            // Get Current user by his email to be able to get screams 
            // due to him, by Token.
            var email = HttpContext.Current.User.Identity.Name;
            var userHandlesList = context.Users.Where(s => s.Email == email).ToList();
            var userHandle = userHandlesList[0].UserHandle;

            return (context.Screams.Where(s => s.UserHandle == userHandle).OrderByDescending(s => s.CreatedAt).AsQueryable());
        }


        // GET By Id: api/Screams/5
        [Route("api/Screams/{id}")]
        [HttpGet]
        public object Get(string id)
        {
            List<DataObject> container = new List<DataObject>();
            CommentsController commentsController = new CommentsController();
            string cs = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand("GetScreamByID", con) { CommandType = System.Data.CommandType.StoredProcedure };
            cmd.Parameters.Add("@screamId",System.Data.SqlDbType.NVarChar).Value = id;
            con.Open();

            var comments = commentsController.GetScreamComments(id);
            SqlDataReader reader = cmd.ExecuteReader();
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    container.Add(new DataObject()
                    {
                        Body = reader["Body"].ToString(),
                        CreatedAt = reader["CreatedAt"].ToString(),
                        UserHandle = reader["UserHandle"].ToString(),
                        ImagePath = reader["ImagePath"].ToString(),
                        CommentCount = reader["CommentsNumber"].ToString(),
                        LikeCount = reader["LikesNumber"].ToString(),
                        ScreamId = reader["ScreamId"].ToString(),
                        Comments = comments,

                    });
                }

            };
            con.Close();
            return container;

        }

        // POST: api/Screams
        [Route("api/Screams/Post")]
        [HttpPost]
        public HttpResponseMessage Post(Screams screams)
        {

            if(screams.Body != "") { 
            // Define user depending on user toke
            var email = HttpContext.Current.User.Identity.Name;
            var userHandlesList = context.Users.Where(s => s.Email == email).ToList();
            var userHandle = userHandlesList[0].UserHandle;

            var user = context.Users.Where(s => s.UserHandle == userHandle).FirstOrDefault();

            Screams screams1 = new Screams()
            {
                //ApplicationUser = user,
                CreatedAt = DateTime.Now.ToString("MM/dd/yyyy HH:mm:ss.ffff"),
                ScreamId =  Guid.NewGuid().ToString(),
                UserHandle = userHandle,
                Body = screams.Body,
                CommentCount = screams.CommentCount,
                LikeCount = screams.LikeCount,
            };

            var obj = new DataObject()
            {
                CreatedAt = screams1.CreatedAt,
                ScreamId = screams1.ScreamId,
                UserHandle = screams1.UserHandle,
                Body = screams1.Body,
                ImagePath = user.ImagePath,
                CommentCount = "0",
                LikeCount = "0",
            };

                context.Screams.Add(screams1);
                context.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, obj);
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { Body =  "Body mustn't be empty "});
            }
          
        }   



        // DELETE: api/Screams/5
        [Route("api/Screams/Delete/{id}")]
        [HttpPost]
        public HttpResponseMessage Delete(string id)
        {
            var email = HttpContext.Current.User.Identity.Name;
            var userHandlesList = context.Users.Where(s => s.Email == email).ToList();
            var userHandle = userHandlesList[0].UserHandle;


            using (ApplicationDbContext context = new ApplicationDbContext())
            {
                var scream = context.Screams.Where(s => s.ScreamId == id).FirstOrDefault();

                if (context.Screams.FirstOrDefault(s => s.ScreamId == id) != null)
                {
                    if (scream.UserHandle == userHandle)
                    {
                        var screamID = scream.ScreamId;
                        context.Likes.RemoveRange(context.Likes.Where(l => l.ScreamId == scream.ScreamId));
                        context.Screams.Remove(context.Screams.FirstOrDefault(s => s.ScreamId == id));
                        context.SaveChanges();
                        return Request.CreateResponse(HttpStatusCode.OK, screamID);

                    

                    }
                    else
                    {
                        return Request.CreateResponse(HttpStatusCode.Unauthorized, "User is not auzthorized to perform such task");

                    }
                }
                else
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound, "No screams found");



                }
            };
        }



        [Route("api/Screams/GetUserProfile")]
        public object GetUserProfileDetails(string handle)
        {

            var user = context.Users.Where(u => u.UserHandle == handle).FirstOrDefault();
            
            var userInfo = new  { handle = user.UserHandle, createdAt =user.createdAt , imageUrl =user.ImagePath , bio =user.Bio , website =user.WebSite , location= user.Location };

            List<DataObject> container = new List<DataObject>();
            string cs = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand("GetUserScreams", con) { CommandType = System.Data.CommandType.StoredProcedure };
            cmd.Parameters.Add("@UserHandle", System.Data.SqlDbType.NVarChar).Value = handle;
            con.Open();

            SqlDataReader reader = cmd.ExecuteReader();
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    container.Add(new DataObject()
                    {
                        Body = reader["Body"].ToString(),
                        CreatedAt = reader["CreatedAt"].ToString(),
                        UserHandle = reader["UserHandle"].ToString(),
                        ImagePath = reader["ImagePath"].ToString(),
                        CommentCount = reader["CommentsNumber"].ToString(),
                        LikeCount = reader["LikesNumber"].ToString(),
                        ScreamId = reader["ScreamId"].ToString(),
                    });
                }

            };
            con.Close();
            return new { user = userInfo, screams=  container };
        }

    }
}
