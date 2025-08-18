namespace Imageshop.Umbraco.Configuration
{
    public class ImageshopSettings
    {
        public string Token { get; set; } = "";
        public bool ShowSizeDialog { get; set; } = true;
        public bool ShowCropDialog { get; set; } = true;
        public bool FreeCrop { get; set; } = true;
        public string InterfaceName { get; set; } = "";
        public string DocumentPrefix { get; set; } = "";
        public string FormattedSizePresets { get; set; } = "";
    }
}
