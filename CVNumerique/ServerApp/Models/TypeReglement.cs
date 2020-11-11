using System.Collections.Generic;

namespace CVNumerique.ServerApp.Models
{
    public partial class TypeReglement
    {
        public int TypeReglementID { get; set; }
        public string Title { get; set; }

        public ICollection<Reglement> Reglements { get; set; }
    }
}
