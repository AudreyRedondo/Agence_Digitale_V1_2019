using System;

namespace CVNumerique.ServerApp.ViewModels
{
    public partial class vmFormation
    {
        public int id { get; set; }
        public string training { get; set; }
        public string trainingCenter { get; set; }
        public string city { get; set; }
        public string sector { get; set; }
        public DateTime startDate { get; set; }
        public DateTime? endDate { get; set; }
        public string context { get; set; }
        public bool graduate { get; set; }
        public string details { get; set; }
        public bool certification { get; set; }
    }
}
