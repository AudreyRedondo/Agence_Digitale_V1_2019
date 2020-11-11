using System.Collections.Generic;

namespace CVNumerique.ServerApp.Models
{
    public partial class TypeRealisation
    {
        public int TypeRealisationID { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }


        public ICollection<Realisation> Realisations { get; set; }
    }
}
