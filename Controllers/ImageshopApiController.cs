using Imageshop.Umbraco.Configuration;
using Imageshop.Umbraco.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Web.Common.Controllers;

namespace Imageshop.Umbraco.Controllers
{
    [Route("umbraco/api/imageshop/[action]")]
    public class ImageshopApiController : UmbracoApiController
    {
        private readonly ImageshopSettings _settings;

        public ImageshopApiController(IOptions<ImageshopSettings> settings)
        {
            _settings = settings.Value;
        }
        [HttpGet]
        public IActionResult Ping()
        {
            return Ok("Pong from Imageshop");
        }

        [HttpGet]
        public IActionResult InsertImage()
        {
            // Return partial view from App_Plugins
            var model = new InsertImageModel { Settings = _settings };
            return new PartialViewResult
            {
                ViewName = "~/App_Plugins/Imageshop/Views/InsertImage.cshtml",
                ViewData = new Microsoft.AspNetCore.Mvc.ViewFeatures.ViewDataDictionary<InsertImageModel>(
                    new Microsoft.AspNetCore.Mvc.ModelBinding.EmptyModelMetadataProvider(),
                    new Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary())
                {
                    Model = model
                }
            };
        }
    }
}
