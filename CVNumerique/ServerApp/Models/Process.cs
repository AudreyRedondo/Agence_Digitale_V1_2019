using System.Collections.Generic;

namespace CVNumerique.ServerApp.Models
{
    public partial class Process
    {
        public int ProcessID { get; set; }
        public string ShortTitle { get; set; }
        public string Title { get; set; }
        public string Icon { get; set; }
        public string Description { get; set; }
        public List<ProcessService> Services { get; set; }
    }
}
