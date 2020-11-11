using System;
using System.ComponentModel.DataAnnotations;

namespace CVNumerique.ServerApp.ViewModels
{
    public class vmContact
    {
        [Required]
        public int id { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(20)]
        public string firstName { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(20)]
        public string lastName { get; set; }
        public string company { get; set; }
        [Required]
        [EmailAddress]
        public string email { get; set; }
        [Required]
        [Phone]
        public string phone { get; set; }
        [Required]
        public string message { get; set; }
        [Required]
        public DateTime date { get; set; }
        [Required]
        public string token { get; set; }
    }
}