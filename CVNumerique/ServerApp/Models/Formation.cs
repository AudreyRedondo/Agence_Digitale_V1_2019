using System;

namespace CVNumerique.ServerApp.Models
{
    public partial class Formation
    {
        public int ID { get; set; }
        public string Training { get; set; }
        public string TrainingCenter { get; set; }
        public string City { get; set; }
        public string Sector { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Context { get; set; }
        public bool Graduate { get; set; }
        public string Details { get; set; }
        public bool Certification { get; set; }
    }
}
