using System.Collections.Generic;

namespace CVNumerique.ServerApp.Models
{
    public partial class Competence
    {
        public int CompetenceID { get; set; }
        public string Title { get; set; }
        public string Icon { get; set; }
        public int Level { get; set; }
        public List<CompetenceExperience> Experiences { get; set; }
        public List<RealisationCompetence> Realisations { get; set; }

    }
}
