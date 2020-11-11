namespace CVNumerique.ServerApp.Models
{
    public partial class PrestationService
    {
        public int ServiceID { get; set; }
        public Service Service { get; set; }
        public int PrestationID { get; set; }
        public Prestation Prestation { get; set; }
    }
}
