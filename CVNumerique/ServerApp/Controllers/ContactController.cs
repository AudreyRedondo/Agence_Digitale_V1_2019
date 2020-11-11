using CVNumerique.ServerApp.Models;
using CVNumerique.ServerApp.ViewModels;
using MailKit.Net.Smtp;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MimeKit;
using MimeKit.Text;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;

namespace CVNumerique.ServerApp.Controllers
{
    [Route("api/contact"), Produces("application/json"), EnableCors("AppPolicy")]
    public class ContactController : ControllerBase
    {
        private readonly CVNumeriqueContext _context = null;
        public ContactController(CVNumeriqueContext context)
        {
            _context = context;
        }

        // GET: api/contact/contacts
        [HttpGet, Route("contacts")]
        public async Task<ActionResult<IEnumerable<vmContact>>> GetContacts()
        {
            List<Contact> input = null;
            var output = new List<vmContact>();
            object objectInput = null;
            object result = null;

            try
            {
                using (_context)
                {
                    input = await _context.Contacts.ToListAsync().ConfigureAwait(false);
                    result = new
                    {
                        objectInput
                    };

                    foreach(Contact o in input)
                    {
                        var vm = new vmContact();
                        vm.id = o.ContactID;
                        vm.firstName = o.FirstName;
                        vm.lastName = o.LastName;
                        vm.phone = o.Phone;
                        vm.company = o.Company;
                        vm.email = o.Email;

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

        // GET api/contact/getByID/5  
        [HttpGet, Route("getByID/{id}")]
        public async Task<Contact> getByID(int id)
        {
            Contact contact = null;
            try
            {
                using (_context)
                {
                    contact = await _context.Contacts.FirstOrDefaultAsync(x => x.ContactID == id).ConfigureAwait(false);
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
            }
            return contact;
        }


        // POST api/contact/Save  
        [HttpPost("save")]
        public async Task<object> Save([FromBody]vmContact model)
        {
            object result = null; string message = "";
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
                            var contact = await _context.Contacts.FirstOrDefaultAsync(p => p.Email == model.email && p.Phone == model.phone).ConfigureAwait(false);
                            if (contact == null)
                            {
                                var ContactModel = new Contact();
                                ContactModel.FirstName = model.firstName;
                                ContactModel.LastName = model.lastName;
                                ContactModel.Company = model.company;
                                ContactModel.Phone = model.phone;
                                ContactModel.Email = model.email;
                                ContactModel.Date = DateTime.Now;

                                _context.Contacts.Add(ContactModel);
                                await _context.SaveChangesAsync().ConfigureAwait(false);
                            }

                            var DemandeModel = new Demande
                            {
                                Subject = "Contact",
                                Message = model.message,
                                Date = model.date,
                                Contact = contact != null ? contact : _context.Contacts.Last()
                            };
                            _context.Demandes.Add(DemandeModel);
                            await _context.SaveChangesAsync().ConfigureAwait(false);

                            _ctxTransaction.Commit();
                            message = "Le mail a bien été envoyé. Je vous répondrai dans les meilleurs délais.";

                            try
                            {
                                //instantiate a new MimeMessage
                                var email = new MimeMessage();
                                //Setting the To e-mail address
                                email.To.Add(new MailboxAddress("PERFORMANCE PRÉCISION", "contact@performanceprecision.fr"));
                                //Setting the From e-mail address
                                email.From.Add(new MailboxAddress(DemandeModel.Contact.FirstName + " " + DemandeModel.Contact.LastName, DemandeModel.Contact.Email));
                                //E-mail subject 
                                email.Subject = DemandeModel.Subject;
                                //E-mail message body
                                email.Body = new TextPart(TextFormat.Html)
                                {
                                    Text = DemandeModel.Message
                                };

                                //Configure the e-mail
                                using (var emailClient = new SmtpClient())
                                {
                                    emailClient.Connect("serverMailIsHiddenBecauseThisIsADemoSourceCode", 587, false);
                                    emailClient.Authenticate("addressMailIsHiddenBecauseThisIsADemoSourceCode", "passwordIsHiddenBecauseThisIsADemoSourceCode");
                                    await emailClient.SendAsync(email).ConfigureAwait(false);
                                    await emailClient.DisconnectAsync(true).ConfigureAwait(false);
                                }
                            }
                            catch (Exception ex)
                            {
                                ModelState.Clear();
                                throw new Exception("Une erreur est survenue pendant l'envoi du mail. Veuillez réessayer.");
                            }
                        }
                        else
                        {
                            throw new Exception("Une erreur est survenue avec le CAPTCHA. Le mail n'a pu être envoyé.");
                        }
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback();
                        message = e.ToString() == "Une erreur est survenue avec le CAPTCHA. Le mail n'a pu être envoyé." ? e.ToString() : "Une erreur est survenue pendant l'envoi du mail. Merci de recommencer.";
                    }


                    result = new
                    {
                        message
                    };
                }
            }
            return result;
        }

        // DELETE api/contact/deleteByID/5  
        [HttpDelete, Route("deleteByID/{id}")]
        public async Task<object> deleteByID(int id)
        {
            object result = null; string message = "";
            using (_context)
            {
                using (var _ctxTransaction = _context.Database.BeginTransaction())
                {
                    try
                    {
                        var idToRemove = _context.Contacts.SingleOrDefault(x => x.ContactID == id);
                        if (idToRemove != null)
                        {
                            _context.Contacts.Remove(idToRemove);
                            await _context.SaveChangesAsync().ConfigureAwait(false);
                        }
                        _ctxTransaction.Commit();
                        message = "Deleted Successfully";
                    }
                    catch (Exception e)
                    {
                        _ctxTransaction.Rollback(); e.ToString();
                        message = "Error on Deleting!!";
                    }

                    result = new
                    {
                        message
                    };
                }
            }
            return result;
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

