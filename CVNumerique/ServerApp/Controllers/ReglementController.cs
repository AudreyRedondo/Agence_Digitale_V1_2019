using CVNumerique.ServerApp.Helpers;
using CVNumerique.ServerApp.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Stripe;
using System;
using System.Collections.Generic;

namespace CVNumerique.ServerApp.Controllers
{
    [Route("api/payment"), Produces("application/json"), EnableCors("AppPolicy")]
    public class ReglementController : ControllerBase
    {
        private CVNumeriqueContext _context = null;

        public ReglementController(CVNumeriqueContext context)
        {
            _context = context;
        }

        public object ViewData { get; private set; }

        // GET api/payment/getClientSecret 
        [HttpGet("getClientSecret")]
        public object GetClientSecret(long amount)
        {
            object result = null; string message = "";

            try
            {
                var service = new PaymentIntentService();
                var options = new PaymentIntentCreateOptions
                {
                    Amount = amount,
                    Currency = "eur",
                };
                var crypto = new Crypto("cvnumeriqueencrypt");
                message = crypto.Encrypt(service.Create(options).ClientSecret);
            }
            catch (Exception e)
            {
                message = e.ToString();
            }

            result = new
            {
                message
            };
            return result;
        }

        public bool HasSucceed(string intentId, string amount, int orderId, string email)
        {
            var message = string.Empty;
            try
            {
                var paymentIntentsService = new PaymentIntentService();
                var paymentIntentsOptions = new PaymentIntentUpdateOptions();
                var metaData = new Dictionary<string, string>();
                paymentIntentsOptions.Metadata = new Dictionary<string, string> {
                    { "CommandeID", orderId.ToString() }
                };
                paymentIntentsOptions.ReceiptEmail = email;

                string key = intentId.Substring(0, intentId.IndexOf("_secret"));
                paymentIntentsService.Update(key, paymentIntentsOptions);

                var service = new ChargeService();
                var options = new ChargeListOptions()
                {
                    PaymentIntent = intentId
                };

                service.List(options);

                return true;
            }
            catch (StripeException e)
            {
                switch (e.StripeError.ErrorType)
                {
                    case "card_error":
                        break;
                    case "api_connection_error":
                        break;
                    case "api_error":
                        break;
                    case "authentication_error":
                        break;
                    case "invalid_request_error":
                        break;
                    case "rate_limit_error":
                        break;
                    case "validation_error":
                        break;
                    default:
                        // Unknown Error Type
                        break;
                }

                throw new Exception(e.StripeError.Message);
            }
        }
    }
}

