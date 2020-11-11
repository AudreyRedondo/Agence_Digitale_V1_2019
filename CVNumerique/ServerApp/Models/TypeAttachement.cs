using System.Collections.Generic;

namespace CVNumerique.ServerApp.Models
{
    public  partial class TypeAttachement
    {
        public int TypeAttachementID { get; set; }
        public string Title { get; set; }

        public List<Attachement> Attachements { get; set; }
    }
}
