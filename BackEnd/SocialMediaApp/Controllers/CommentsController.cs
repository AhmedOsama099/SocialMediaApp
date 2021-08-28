using SocialMediaApp.Models;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Web;
using System.Web.Http;

namespace SocialMediaApp.Controllers
{
    public class CommentsController : ApiController
    {
        public class CommentObject
        {
            public string Body { get; set; }
            public string CreatedAt { get; set; }
            public string UserHandle { get; set; }
            public string ImagePath { get; set; }
            public string CommentsCount { get; set; }
            public object UpdatedScream { get; set; }

            



        }


        ApplicationDbContext context = new ApplicationDbContext();
        // GET: api/Comments
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Comments/id
        public List<Comments> Get(string id)
        {
            return (context.Comments.Where(s => s.ScreamId == id).OrderByDescending(s => s.CreatedAt).ToList());
        }

        // POST: api/Comments
        [Route("api/Comments/SubmitCommet/{id}")]
        [HttpPost]
        public HttpResponseMessage PostComment(Comments comments, string id)
        {

            if (comments.Body != "")
            {

                // Define user depending on user toke
                var email = HttpContext.Current.User.Identity.Name;
                var userHandlesList = context.Users.Where(s => s.Email == email).ToList();
                var userHandle = userHandlesList[0].UserHandle;


                Comments comments1 = new Comments()
                {
                    CommentId = Guid.NewGuid().ToString(),
                    ScreamId = id,
                    UserHandle = userHandle,
                    Body = comments.Body,
                    CreatedAt = DateTime.Now
                };

                

                context.Comments.Add(comments1);

                ScreamsController screamsController = new ScreamsController();
                context.SaveChanges();
                var updatedScream = screamsController.Get(id);


                return Request.CreateResponse(HttpStatusCode.OK, new CommentObject {Body = comments.Body, CreatedAt = comments.CreatedAt.ToString(), UserHandle = userHandle, ImagePath = userHandlesList[0].ImagePath, UpdatedScream = updatedScream });
            }
            else
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, new { Comment = "Field can't be empty"});
            }
        }

        // PUT: api/Comments/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/Comments/5
        public void Delete(int id)
        {
        }


        public  object GetScreamComments(string screamId)
        {
            List<CommentObject> container = new List<CommentObject>();
            string cs = System.Configuration.ConfigurationManager.ConnectionStrings["DefaultConnection"].ConnectionString;
            SqlConnection con = new SqlConnection(cs);
            SqlCommand cmd = new SqlCommand("GetUserComments", con) { CommandType = System.Data.CommandType.StoredProcedure };
            cmd.Parameters.Add("@ScreamId", System.Data.SqlDbType.NVarChar).Value = screamId;
            con.Open();

            SqlDataReader reader = cmd.ExecuteReader();
            if (reader.HasRows)
            {
                while (reader.Read())
                {
                    container.Add(new CommentObject()
                    {
                        Body = reader["Body"].ToString(),
                        CreatedAt = reader["CreatedAt"].ToString(),
                        UserHandle = reader["UserHandle"].ToString(),
                        ImagePath = reader["ImagePath"].ToString(),
                    });
                }

            };
            con.Close();
          return  container;

        }
    }
}
