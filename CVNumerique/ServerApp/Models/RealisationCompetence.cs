namespace CVNumerique.ServerApp.Models
{
    public partial class RealisationCompetence
    {
        public int RealisationID { get; set; }
        public Realisation Realisation { get; set; }
        public int CompetenceID { get; set; }
        public Competence Competence { get; set; }
    }
}
