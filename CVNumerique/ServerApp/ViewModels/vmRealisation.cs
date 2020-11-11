using CVNumerique.ServerApp.Models;
using System;
using System.Collections.Generic;

namespace CVNumerique.ServerApp.ViewModels
{
    public partial class vmRealisation
    {
        public int id { get; set; }
        public string title { get; set; }
        public string resume { get; set; }
        public string client { get; set; }
        public DateTime delivered { get; set; }
        public string project { get; set; }
        public string link { get; set; }
        public string picture { get; set; }
        public List<vmCompetence> skills { get; set; }
        public TypeRealisation category { get; set; }
    }
}
