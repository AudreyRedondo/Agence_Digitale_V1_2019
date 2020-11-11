using System;
using System.Collections.Generic;

namespace CVNumerique.ServerApp.Models
{
    public partial class Reglement
    {
        public int ReglementID { get; set; }
        public DateTime Date { get; set; }
        public decimal Amount { get; set; }
        public string Transaction { get; set; }


        public List<ReglementPrestation> Prestations { get; set; }

        //Foreign key
        public int CommandeID { get; set; }
        public Commande Commande { get; set; }
        public int TypeReglementID { get; set; }
        public TypeReglement TypeReglement { get; set; }
        public int ModeReglementID { get; set; }
        public ModeReglement ModeReglement { get; set; }
    }
}
