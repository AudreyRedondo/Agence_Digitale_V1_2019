namespace CVNumerique.ServerApp.Models
{
    public partial class Attachement
    {
        public int AttachementID { get; set; }
        public string Title { get; set; }
        public string Path { get; set; }
        

        //Foreign key
        public int CommandeID { get; set; }
        public Commande Commande { get; set; }
        public int TypeAttachementID { get; set; }
        public TypeAttachement TypeAttachement { get; set; }
    }
}
