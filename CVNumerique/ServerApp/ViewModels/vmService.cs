using System.Collections.Generic;

namespace CVNumerique.ServerApp.ViewModels
{
    public partial class vmService
    {
        public int id { get; set; }
        public string title { get; set; }
        public string picture { get; set; }
        public string shortDescription { get; set; }
        public string longDescription { get; set; }
        public List<vmPrestation> priceList { get; set; }
        public List<vmProcess> processList { get; set; }

    }
}
