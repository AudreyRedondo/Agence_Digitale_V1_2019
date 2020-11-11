using CVNumerique.ServerApp.Models;

namespace CVNumerique.ServerApp.ViewModels
{
    public class vmAttachement
    {
        public int id { get; set; }
        public string title { get; set; }
        public string path { get; set; }
        public TypeAttachement typeAttachement { get; set; }
    }
}
