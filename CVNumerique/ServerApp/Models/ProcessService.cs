namespace CVNumerique.ServerApp.Models
{
    public partial class ProcessService
    {
        public int ServiceID { get; set; }
        public Service Service { get; set; }
        public int ProcessID { get; set; }
        public Process Process { get; set; }
    }
}
