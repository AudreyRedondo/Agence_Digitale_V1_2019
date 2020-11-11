using System;
using System.Collections.Generic;

namespace CVNumerique.ServerApp.ViewModels
{
    public partial class vmExperience
    {
        public int id { get; set; }
        public string job { get; set; }
        public string company { get; set; }
        public string city { get; set; }
        public string sector { get; set; }
        public DateTime startDate { get; set; }
        public DateTime? endDate { get; set; }
        public string context { get; set; }
        public string details { get; set; }
        public List<vmCompetence> skills { get; set; }

    }
}
