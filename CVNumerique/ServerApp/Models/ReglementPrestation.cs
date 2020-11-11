namespace CVNumerique.ServerApp.Models
{
    public partial class ReglementPrestation
    {
        public int ReglementID { get; set; }
        public Reglement Reglement { get; set; }
        public int PrestationID { get; set; }
        public Prestation Prestation { get; set; }
    }
}
