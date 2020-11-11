using System;
using System.Collections.Generic;

namespace CVNumerique.ServerApp.Models
{
    public partial class Commande
    {
        public int CommandeID { get; set; }
        public DateTime Date { get; set; }
        public string Details { get; set; }

        //Foreign key
        public int ServiceID { get; set; }
        public Service Service { get; set; }
        public int ContactID { get; set; }
        public Contact Contact { get; set; }

        public List<Attachement> Attachements { get; set; }
        public List<PrestationCommande> Prestations { get; set; }

        public List<Reglement> Reglements { get; set; }

        public Commande()
        {
            Attachements = new List<Attachement>();
            Prestations = new List<PrestationCommande>();
            Reglements = new List<Reglement>();
        }
    }
}
