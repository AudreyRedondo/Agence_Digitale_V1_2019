using System.Collections.Generic;

namespace CVNumerique.ServerApp.Models
{
    public partial class TypeConnaissance
    {
        public int TypeconnaissanceID { get; set; }
        public string Title { get; set; }

        public List<Avis> Avis { get; set; }
    }
}
