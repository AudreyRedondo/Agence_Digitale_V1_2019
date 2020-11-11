namespace CVNumerique.ServerApp.ViewModels
{
    public partial class vmRubrique
    {
        public int id { get; set; }
        public string title { get; set; }
        public string tooltip { get; set; }
        public string icon { get; set; }
        public string firstSubtitle { get; set; }
        public string secondSubtitle { get; set; }
        public string routerLink { get; set; }
        public string fragment { get; set; }
        public int order { get; set; }
    }
}
