using System.Collections.Generic;

namespace CVNumerique.ServerApp.Models
{
    public partial class Service
    {
        public int ServiceID { get; set; }
        public string Title { get; set; }
        public string Picture { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }

        public List<PrestationService> PriceList { get; set; }
        public List<ProcessService> ProcessList { get; set; }
        public List<Commande> Commandes { get; set; }
    }
}
