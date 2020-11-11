namespace CVNumerique.ServerApp.Models
{
    public partial class Rubrique
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Tooltip { get; set; }
        public string Icon { get; set; }
        public string FirstSubtitle { get; set; }
        public string SecondSubtitle { get; set; }
        public string RouterLink { get; set; }
        public string Fragment { get; set; }
        public int Order { get; set; }
    }
}
