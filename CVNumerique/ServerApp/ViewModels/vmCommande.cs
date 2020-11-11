using CVNumerique.ServerApp.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace CVNumerique.ServerApp.ViewModels
{
    public class vmCommande
    {
        [Required]
        public int id { get; set; }
        [Required]
        public DateTime date { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string firstName { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(50)]
        public string lastName { get; set; }
        [Required]
        [MinLength(3)]
        [MaxLength(30)]
        public string job { get; set; }
        public string company { get; set; }
        [Required]
        [EmailAddress]
        public string email { get; set; }
        [Required]
        [Phone]
        public string phone { get; set; }
        public string details { get; set; }
        [Required]
        public int serviceId { get; set; }
        [Required]
        public string token { get; set; }
        public string intentId { get; set; }
        public string amount { get; set; }
        public IFormFile resume { get; set; }
        public List<PrestationCommande> prestations { get; set; }
        public List<vmAttachement> attachements { get; set; }
    }
}
