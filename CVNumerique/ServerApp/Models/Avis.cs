using System;

namespace CVNumerique.ServerApp.Models
{
    public partial class Avis
    {
        public int AvisID { get; set; }
        public int Note { get; set; }
        public string Testimonial { get; set; }
        public DateTime Date { get; set; }

        //Foreign key
        public int TypeConnaissanceID { get; set; }
        public TypeConnaissance TypeConnaissance { get; set; }
        public int ContactID { get; set; }
        public Contact Contact { get; set; }
    }
}
