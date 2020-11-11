using System;
using System.ComponentModel.DataAnnotations;

namespace CVNumerique.ServerApp.ViewModels
{
    public class vmAvis
    {
        [Required]
        public int id { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string firstName { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string lastName { get; set; }
        [MaxLength(50)]
        public string company { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(30)]
        public string job { get; set; }
        [Required]
        public int note { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(350)]
        public string testimonial { get; set; }
        [Required]
        public DateTime date { get; set; }
        [Required]
        public string token { get; set; }
        public vmTypeConnaissance typeConnaissance { get; set; }
        public string typeConnaissanceId { get; set; }
    }
}