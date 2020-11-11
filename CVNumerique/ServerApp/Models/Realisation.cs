using System;
using System.Collections.Generic;

namespace CVNumerique.ServerApp.Models
{
    public partial class Realisation
    {
        public int RealisationID { get; set; }
        public string Title { get; set; }
        public string Resume { get; set; }
        public string Client { get; set; }
        public DateTime Delivered { get; set; }
        public string Project { get; set; }
        public string Link { get; set; }
        public string Picture { get; set; }


        //Foreign key
        public int TypeRealisationID { get; set; }
        public TypeRealisation TypeRealisation { get; set; }

        public List<RealisationCompetence> Competences { get; set; }
    }
}
