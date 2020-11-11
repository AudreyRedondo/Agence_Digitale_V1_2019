using System.Collections.Generic;

namespace CVNumerique.ServerApp.Models
{
    public partial class ModeReglement
    {
        public int ModeReglementID { get; set; }
        public string Title { get; set; }

        public ICollection<Reglement> Reglements { get; set; }
    }
}
