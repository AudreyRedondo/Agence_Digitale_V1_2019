using Microsoft.AspNetCore.Mvc;
using System.IO;

namespace CVNumerique.ServerApp.Controllers
{
    [Route("telecharger")]
    public class TelechargerController : Controller
    {
        private FileStream Stream;

        // GET: /brochure
        [HttpGet("brochure")]
        public IActionResult GetBrochure()
        {
            Stream = new FileStream(@"ClientApp/dist/assets/pdf/Brochure.pdf", FileMode.Open, FileAccess.Read);
            return File(Stream, "application/pdf", "Brochure_Performance_Precision.pdf");
        }

        // GET: /cv
        [HttpGet("cv")]
        public IActionResult GetCV()
        {
            Stream = new FileStream(@"ClientApp/dist/assets/pdf/CV.pdf", FileMode.Open, FileAccess.Read);
            return File(Stream, "application/pdf", "CV_Audrey_Redondo_2019.pdf");
        }

        // GET: /certificat_Git-GitHub
        [HttpGet("certificat_Git-GitHub")]
        public IActionResult GetCertificatGitGitHub()
        {
            Stream = new FileStream(@"ClientApp/dist/assets/pdf/CertificatGit.pdf", FileMode.Open, FileAccess.Read);
            return File(Stream, "application/pdf", "certificat_Git-GitHub_Audrey_Redondo.pdf");
        }

        // GET: /certificat_Apprenez-a-developper-en-CSharp
        [HttpGet("certificat_Apprenez-a-developper-en-CSharp")]
        public IActionResult GetCertificatC1()
        {
            Stream = new FileStream(@"ClientApp/dist/assets/pdf/CertificatC1.pdf", FileMode.Open, FileAccess.Read);
            return File(Stream, "application/pdf", "certificat_Apprenez-a-developper-en-CSharp_Audrey_Redondo.pdf");
        }

        // GET: /certificat_Programmez-en-oriente-objet-avec-CSharp
        [HttpGet("certificat_Programmez-en-oriente-objet-avec-CSharp")]
        public IActionResult GetCertificatC2()
        {
            Stream = new FileStream(@"ClientApp/dist/assets/pdf/CertificatC2.pdf", FileMode.Open, FileAccess.Read);
            return File(Stream, "application/pdf", "certificat_Programmez-en-oriente-objet-avec-CSharp_Audrey_Redondo.pdf");
        }

        // GET: /certificat_Developpez-des-applications-Web-avec-Angular
        [HttpGet("certificat_Developpez-des-applications-Web-avec-Angular")]
        public IActionResult GetCertificatAngular()
        {
            Stream = new FileStream(@"ClientApp/dist/assets/pdf/CertificatAngular.pdf", FileMode.Open, FileAccess.Read);
            return File(Stream, "application/pdf", "certificat_Developpez-des-applications-Web-avec-Angular_Audrey_Redondo.pdf");
        }
    }
}
