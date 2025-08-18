using Imageshop.Umbraco.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace Imageshop.Umbraco.Composers
{
    public class ImageshopComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.Configure<ImageshopSettings>(
                builder.Config.GetSection("Imageshop"));
        }
    }
}



