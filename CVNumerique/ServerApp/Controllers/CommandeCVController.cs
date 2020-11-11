using CVNumerique.ServerApp.Models;
using CVNumerique.ServerApp.ViewModels;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace CVNumerique.ServerApp.Controllers
{
    [Route("api/order"), Produces("application/json"), EnableCors("AppPolicy")]
    public class CommandeCVController : ControllerBase
    {
        private CVNumeriqueContext _context = null;
        private readonly IHostingEnvironment _host;
        private readonly string folder = "uploads";
        private AttachementController _attachement;
        private ReglementController _reglement;


        public CommandeCVController(IHostingEnvironment host, CVNumeriqueContext context, AttachementController attachement, ReglementController reglement)
        {
            _context = context;
            _host = host;
            _attachement = attachement;
            _reglement = reglement;
        }

        // GET: api/order/orders
        [HttpGet("orders")]
        public async Task<ActionResult<IEnumerable<vmCommande>>> GetOrders()
        {
            List<Commande> input = null;
            List<vmAttachement> attachements = new List<vmAttachement>();
            var output = new List<vmCommande>();
            object objectInput = null;
            object result = null;

            try
            {
                using (_context)
                {
                    input = await _context.Commandes
                        .Include(p => p.Attachements).ThenInclude(a => a.TypeAttachement)
                        .Include(p => p.Prestations).ThenInclude(a => a.Prestation).ThenInclude(a => a.Reglements).ThenInclude(b => b.Reglement)
                        .Include(p => p.Service)
                        .Include(p => p.Contact)
                        .ToListAsync();

                    result = new
                    {
                        objectInput
                    };

                    foreach (Commande o in input)
                    {
                        var vm = new vmCommande();
                        vm.id = o.CommandeID;
                        vm.serviceId = o.ServiceID;
                        vm.date = o.Date;
                        vm.firstName = o.Contact.FirstName;
                        vm.lastName = o.Contact.LastName;
                        vm.job = o.Contact.Job;
                        vm.company = o.Contact.Company;
                        foreach (Attachement attachement in o.Attachements)
                        {
                            var vmAttachement = new vmAttachement
                            {
                                id = attachement.AttachementID,
                                path = attachement.Path,
                                typeAttachement = attachement.TypeAttachement
                            };

                            attachements.Add(vmAttachement);
                        }
                        vm.attachements = attachements;
                        vm.prestations = o.Prestations;
                        vm.details = o.Details;

                        output.Add(vm);
                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return output;
        }

        // GET: api/order/ordersResume
        [HttpGet("ordersResume")]
        public async Task<ActionResult<IEnumerable<vmCommande>>> GetOrdersResume()
        {
            List<Commande> input = null;
            List<vmAttachement> attachements = new List<vmAttachement>();
            var output = new List<vmCommande>();
            object objectInput = null;
            object result = null;

            try
            {
                using (_context)
                {
                    input = await _context.Commandes
                        .Include(p => p.Attachements).ThenInclude(a => a.TypeAttachement)
                        .Include(p => p.Prestations).ThenInclude(a => a.Prestation).ThenInclude(a => a.Reglements).ThenInclude(b => b.Reglement)
                        .Include(p => p.Service)
                        .Include(p => p.Contact)
                        .Where(p => p.ServiceID == 4)
                        .ToListAsync();

                    result = new
                    {
                        objectInput
                    };

                    foreach (Commande o in input)
                    {
                        var vm = new vmCommande();
                        vm.id = o.CommandeID;
                        vm.serviceId = o.ServiceID;
                        vm.date = o.Date;
                        vm.firstName = o.Contact.FirstName;
                        vm.lastName = o.Contact.LastName;
                        vm.job = o.Contact.Job;
                        vm.company = o.Contact.Company;
                        foreach (Attachement attachement in o.Attachements)
                        {
                            var vmAttachement = new vmAttachement
                            {
                                id = attachement.AttachementID,
                                title = attachement.Title,
                                path = attachement.Path,
                                typeAttachement = attachement.TypeAttachement
                            };

                            attachements.Add(vmAttachement);
                        }
                        vm.attachements = attachements;
                        vm.prestations = o.Prestations;
                        vm.details = o.Details;

                        output.Add(vm);
                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return output;
        }


        // GET: api/order/paymentsChoice
        [HttpGet("paymentschoice")]
        public async Task<ActionResult<IEnumerable<vmModeReglement>>> GetPaymentsChoice()
        {
            List<ModeReglement> input = null;
            var output = new List<vmModeReglement>();
            object objectInput = null;
            object result = null;

            try
            {
                using (_context)
                {
                    input = await _context.ModesReglement.ToListAsync();
                    result = new
                    {
                        objectInput
                    };

                    foreach (ModeReglement o in input)
                    {
                        var vm = new vmModeReglement();
                        vm.id = o.ModeReglementID.ToString();
                        vm.text = o.Title;

                        output.Add(vm);
                    }
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return output;
        }

        // GET api/order/getOrderByID/5  
        [HttpGet, Route("getOrderByID/{id}")]
        public async Task<vmCommande> GetOrderByID(int id)
        {
            Commande o = null;
            List<vmAttachement> attachements = new List<vmAttachement>();
            var vm = new vmCommande();
            try
            {
                using (_context)
                {
                    o = await _context.Commandes
                        .Include(p => p.Attachements).ThenInclude(a => a.TypeAttachement)
                        .Include(p => p.Prestations).ThenInclude(a => a.Prestation).ThenInclude(a => a.Reglements).ThenInclude(b => b.Reglement)
                        .Include(p => p.Service)
                        .Include(p => p.Contact)
                        .FirstOrDefaultAsync(x => x.CommandeID == id);

                    vm.id = o.CommandeID;
                    vm.serviceId = o.ServiceID;
                    vm.date = o.Date;
                    vm.firstName = o.Contact.FirstName;
                    vm.lastName = o.Contact.LastName;
                    vm.job = o.Contact.Job;
                    vm.company = o.Contact.Company;
                    foreach (Attachement attachement in o.Attachements)
                    {
                        var vmAttachement = new vmAttachement
                        {
                            id = attachement.AttachementID,
                            title = attachement.Title,
                            path = attachement.Path,
                            typeAttachement = attachement.TypeAttachement
                        };

                        attachements.Add(vmAttachement);
                    }
                    vm.attachements = attachements;
                    vm.prestations = o.Prestations;
                    vm.details = o.Details;
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return vm;
        }

        // GET api/order/getLastOrderID  
        [HttpGet("getLastOrderID")]
        public int GetLastOrderID()
        {
            int id = 0;

            try
            {
                using (_context)
                {
                    id = _context.Commandes.Last().CommandeID;
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return id;
        }

        // POST api/order/SaveOrderResume  
        [HttpPost("saveOrderResume")]
        public async Task<object> Save([FromForm]vmCommande model)
        {
            object result = null; string message = ""; vmUploadedFile resume =null;
            var uploadFilesPath = Path.Combine(_host.WebRootPath, folder);

            if (model == null || !ModelState.IsValid)
            {
                return BadRequest();
            }
            using (_context)
            {
                using (var _ctxTransaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        if (ReCaptchaPassed(model.token))
                        {
                            //Add resume uploaded to uploads folder
                            resume = (vmUploadedFile)await _attachement.Upload(model.resume);


                            var contact = await _context.Contacts.FirstOrDefaultAsync(p => p.Email == model.email && p.Phone == model.phone);
                            if (contact == null)
                            {
                                var ContactModel = new Contact();
                                ContactModel.FirstName = model.firstName;
                                ContactModel.LastName = model.lastName;
                                ContactModel.Job = model.job;
                                ContactModel.Company = model.company;
                                ContactModel.Phone = model.phone;
                                ContactModel.Email = model.email;
                                ContactModel.Date = DateTime.Now;

                                _context.Contacts.Add(ContactModel);
                                await _context.SaveChangesAsync();
                            }

                            var CommandeModel = new Commande();

                            //foreach (vmPrestation prestation in model.prestations)
                            //{
                            //    var Prestation = new Prestation
                            //    {
                            //        PrestationID = prestation.id,
                            //        Title = prestation.title,
                            //        Details = prestation.details,
                            //        B = prestation.typeAttachement
                            //    };

                            //    attachements.Add(Attachement);
                            //}
                            CommandeModel.Date = DateTime.Now;
                            CommandeModel.Details = model.details;
                            CommandeModel.Prestations = model.prestations;
                            CommandeModel.Contact = contact != null ? contact : _context.Contacts.Last();
                            CommandeModel.Service = _context.Services.FirstOrDefault(s=> s.ServiceID == model.serviceId);

                            _context.Commandes.Add(CommandeModel);
                            await _context.SaveChangesAsync();

                            
                            //Attach file uploaded to order
                            var attachmentResume = new Attachement { Title = resume.fileName, Path = Path.Combine(uploadFilesPath, resume.fileName), CommandeID = CommandeModel.CommandeID, TypeAttachementID = 1 };
                            _context.Attachements.Add(attachmentResume);
                            await _context.SaveChangesAsync();

                            // Verify payment 
                            var paymentHasSucceed = _reglement.HasSucceed(model.intentId, model.amount, CommandeModel.CommandeID, model.email);
                            if (paymentHasSucceed)
                            {
                                _ctxTransaction.Commit();
                                message = "Votre pré-commande a bien été enregistrée et je vous en remercie. D'ici 48 à 72h, vous recevrez un mail. Pour visualiser votre CV pertinent et original et le télécharger, il vous faudra cliquer sur le lien contenu dans ce mail.";
                            }
                            else
                            {
                                throw new Exception("Une erreur est survenue durant le paiement. La pré-commande n'a pu être enregistrée.");
                            }
                        }
                        else
                        {
                            throw new Exception("Une erreur est survenue avec le CAPTCHA. La pré-commande n'a pu être enregistrée.");
                        }
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback();

                        //Delete resume added into uploads folder
                        if(resume.fileName != null)
                        {
                            _attachement.Delete(resume.fileName);
                        }
                        
                        message = e.ToString() == "Une erreur est survenue avec le CAPTCHA. La pré-commande n'a pu être enregistrée." || e.ToString() == "Une erreur est survenue durant le paiement.La pré-commande n'a pu être enregistrée."
                                 ? e.ToString() 
                                  : "Une erreur est survenue pendant l'enregistrement de la pré-commande. Merci de recommencer.";
                    }

                    result = new
                    {
                        message
                    };
                }
            }
            return message;
        }

        public static bool ReCaptchaPassed(string gRecaptchaResponse)
        {
            HttpClient httpClient = new HttpClient();
            var res = httpClient.GetAsync($"https://www.google.com/recaptcha/api/siteverify?secret=secretKeyIsHiddenInThisDemoSourceCode&response={gRecaptchaResponse}").Result;
            if (res.StatusCode != HttpStatusCode.OK)
                return false;

            string JSONres = res.Content.ReadAsStringAsync().Result;
            dynamic JSONdata = JObject.Parse(JSONres);
            if (JSONdata.success != "true")
                return false;

            return true;
        }
    }
}
