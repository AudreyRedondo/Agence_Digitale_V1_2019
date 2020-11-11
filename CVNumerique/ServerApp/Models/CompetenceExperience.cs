namespace CVNumerique.ServerApp.Models
{
    public partial class CompetenceExperience
    {
        public int CompetenceID { get; set; }
        public Competence Competence { get; set; }
        public int ExperienceID { get; set; }
        public Experience Experience { get; set; }
    }
}
