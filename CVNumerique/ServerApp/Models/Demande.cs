using System;

namespace CVNumerique.ServerApp.Models
{
    public partial class Demande
    {
        public int DemandeID { get; set; }
        public string Subject { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }

        //Foreign key
        public int ContactID { get; set; }
        public Contact Contact { get; set; }
    }
}
