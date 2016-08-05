using System.Web.Http;
using System.IO;
using System.Net.Http;
using System.Net;
using System.Text;
using System.Web;
using System.Collections.Specialized;
using System.Collections.Generic;
using System;
using Newtonsoft.Json.Linq;

namespace WebApplication6.Controllers
{
    public class values
    {
        public string str { get; set; }
        public int number { get; set; }
    }

    public class TempController : ApiController
    {
        public HttpResponseMessage Get()
        {
            var json = File.ReadAllText(
                HttpContext.Current.Server.MapPath(@"~/Models/customers.json"));

            return new HttpResponseMessage()
            {
                Content = new StringContent(json, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK,
            };
        }

        public HttpResponseMessage GetValues()
        {
            var json = File.ReadAllText(
                HttpContext.Current.Server.MapPath(@"~/Models/accounts.json"));

            return new HttpResponseMessage()
            {
                Content = new StringContent(json, Encoding.UTF8, "application/json"),
                StatusCode = HttpStatusCode.OK,
            };
        }
    }
}