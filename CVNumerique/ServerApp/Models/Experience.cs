using System;
using System.Collections.Generic;

namespace CVNumerique.ServerApp.Models
{
    public partial class Experience
    {
        public int ExperienceID { get; set; }
        public string Job { get; set; }
        public string Company { get; set; }
        public string City { get; set; }
        public string Sector { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Context { get; set; }
        public string Details { get; set; }
        public List<CompetenceExperience> Skills { get; set; }
    }
}
