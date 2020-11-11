using CVNumerique.ServerApp.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace CVNumerique.ServerApp.Controllers
{
    [Route("api/attachment"), Produces("application/json"), EnableCors("AppPolicy")]
    public class AttachementController : ControllerBase
    {
        private readonly string[] _ACCEPTED_FILE_TYPES = new[] { ".jpg", ".jpeg", ".png", ".pdf", ".docx" };
        private readonly IHostingEnvironment _host;
        private readonly string folder = "uploads";
        
        public AttachementController(IHostingEnvironment host)
        {
            _host = host;
        }

        [HttpPost("uploadFile")]
        public async ValueTask<object> Upload(IFormFile uploadedFile)
        {
            object result = null;

            if (uploadedFile == null)
            {
                return BadRequest("L'enregistrement du fichier n'a pu être réalisé.");
            }

            try
            {
                if (uploadedFile.Length == 0)
                {
                    throw new Exception("Le fichier joint est vide, impossible de l'enregistrer.");
                }
                if (uploadedFile.Length > 10 * 1024 * 1024)
                {
                    throw new Exception("la taille du fichier est trop grande.");
                }

                if (!_ACCEPTED_FILE_TYPES.Any(s => s == Path.GetExtension(uploadedFile.FileName).ToLower()))
                {
                    throw new Exception("le type de fichier joint n'est pas dans l'un des format acceptés : jpg, jpeg, png, pdf ou docx.");
                }

                var uploadFilesPath = Path.Combine(_host.WebRootPath, folder);
                if (!Directory.Exists(uploadFilesPath))
                    Directory.CreateDirectory(uploadFilesPath);
                var fileName = Guid.NewGuid().ToString() + Path.GetExtension(uploadedFile.FileName);
                var filePath = Path.Combine(uploadFilesPath, fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await (uploadedFile.CopyToAsync(stream));
                }

                result = new vmUploadedFile
                {
                    fileName = fileName
                };
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }

            return result;
        }


        [HttpPost("deleteFile")]
        public object Delete(string fileName)
        {
            if (string.IsNullOrWhiteSpace(fileName) || string.IsNullOrEmpty(fileName))
            {
                return BadRequest("La suppression du fichier n'a pu être effectuée.");
            }

            try
            {
                var uploadFilesPath = Path.Combine(_host.WebRootPath, folder);
                if (System.IO.File.Exists(Path.Combine(uploadFilesPath, fileName)))
                {
                    // If file found, delete it    
                    System.IO.File.Delete(Path.Combine(uploadFilesPath, fileName));
                    return Ok();
                }
                else throw new Exception("Le fichier à supprimé n'a pas été trouvé.");
            }
            catch (Exception e)
            {
                return BadRequest(e.ToString());
            }
        }
    }
}

