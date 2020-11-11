namespace CVNumerique.ServerApp.Models
{
    public partial class PrestationCommande
    {
        public int CommandeID { get; set; }
        public Commande Commande { get; set; }
        public int PrestationID { get; set; }
        public Prestation Prestation { get; set; }
    }
}
