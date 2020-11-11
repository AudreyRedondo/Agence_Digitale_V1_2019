using System;
using System.Collections.Generic;

namespace CVNumerique.ServerApp.Models
{
    public partial class Contact
    {
        public int ContactID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Company { get; set; }
        public string Job { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime Date {get; set; }

        public List<Demande> Demandes { get; set; }
        public List<Avis> Avis { get; set; }
        public List<Commande> Commandes { get; set; }


        public Contact()
        {
            Demandes = new List<Demande>();
            Avis = new List<Avis>();
            Commandes = new List<Commande>();
            Date = DateTime.Today;
        }
    }
}
