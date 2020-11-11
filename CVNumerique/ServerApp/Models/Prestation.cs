using System.Collections.Generic;

namespace CVNumerique.ServerApp.Models
{
    public partial class Prestation
    {
        public int PrestationID { get; set; }
        public string Title { get; set; }
        public string Icon { get; set; }
        public decimal? Price { get; set; }
        public string Details { get; set; }

        public List<PrestationService> Services { get; set; }
        public List<ReglementPrestation> Reglements { get; set; }

        public List<PrestationCommande> Commandes { get; set; }

    }
}
