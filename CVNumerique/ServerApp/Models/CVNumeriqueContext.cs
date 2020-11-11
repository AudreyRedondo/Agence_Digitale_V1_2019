using Microsoft.EntityFrameworkCore;

namespace CVNumerique.ServerApp.Models
{
    public partial class CVNumeriqueContext : DbContext
    {
        public CVNumeriqueContext() {}

        public CVNumeriqueContext(DbContextOptions<CVNumeriqueContext> options): base(options){}

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder){}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Rubrique>(entity =>
              {
                  entity.Property(e => e.FirstSubtitle).HasMaxLength(250);
                  entity.Property(e => e.Fragment).HasMaxLength(250);
                  entity.Property(e => e.Icon).HasMaxLength(50);
                  entity.Property(e => e.RouterLink)
                      .IsRequired()
                      .HasMaxLength(250);
                  entity.Property(e => e.SecondSubtitle).HasMaxLength(250);
                  entity.Property(e => e.Title)
                      .IsRequired()
                      .HasMaxLength(250);
                  entity.Property(e => e.Tooltip)
                      .IsRequired()
                      .HasMaxLength(50);
              });

            modelBuilder.Entity<Contact>(entity =>
            {
            entity.Property(e => e.FirstName)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.LastName)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.Job)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.Company)
                    .HasMaxLength(50);
                entity.Property(e => e.Phone)
                    .HasMaxLength(14);
                entity.Property(e => e.Email)
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<Demande>(entity =>
            {
                entity.Property(e => e.Date)
                        .IsRequired();
                entity.Property(e => e.Subject)
                    .HasMaxLength(300)
                    .IsRequired();
                entity.Property(e => e.Message)
                    .IsRequired();

                entity.HasOne(t => t.Contact)
                  .WithMany(tc => tc.Demandes)
                  .HasForeignKey(t => t.ContactID)
                  .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<TypeConnaissance>(entity =>
            {
                entity.Property(tc => tc.Title)
                    .IsRequired()
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<Avis>(entity =>
            {
                entity.Property(e => e.Note)
                    .IsRequired();
                entity.Property(e => e.Testimonial)
                    .IsRequired()
                    .HasMaxLength(350);
                entity.Property(e => e.Date)
                    .IsRequired();

                entity.HasOne(t => t.TypeConnaissance)
                .WithMany(tc => tc.Avis)
                .HasForeignKey(t => t.TypeConnaissanceID)
                .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(t => t.Contact)
               .WithMany(tc => tc.Avis)
               .HasForeignKey(t => t.ContactID)
               .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<TypeAttachement>(entity =>
            {
                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<Attachement>(entity =>
            {
                entity.Property(e => e.Title)
                    .IsRequired().HasMaxLength(250);
                entity.Property(e => e.Path)
                    .IsRequired();

                entity.HasOne(t => t.Commande)
                .WithMany(tc => tc.Attachements)
                .HasForeignKey(t => t.CommandeID)
                .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(t => t.TypeAttachement)
               .WithMany(tc => tc.Attachements)
               .HasForeignKey(t => t.TypeAttachementID)
               .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Service>(entity =>
            {
                entity.Property(e => e.Title).IsRequired().HasMaxLength(250);
                entity.Property(e => e.Picture).IsRequired().HasMaxLength(250);
                entity.Property(e => e.ShortDescription).IsRequired().HasMaxLength(4000);
                entity.Property(e => e.LongDescription).IsRequired();
            });

            modelBuilder.Entity<Prestation>(entity =>
            {
                entity.Property(e => e.Title).IsRequired().HasMaxLength(250);
                entity.Property(e => e.Icon).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Price);
                entity.Property(e => e.Details).IsRequired().HasMaxLength(50); ;
            });

            modelBuilder.Entity<Process>(entity =>
            {
                entity.Property(e => e.ShortTitle).IsRequired().HasMaxLength(20);
                entity.Property(e => e.Title).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Icon).IsRequired().HasMaxLength(50);
                entity.Property(e => e.Description).IsRequired();
            });

            modelBuilder.Entity<PrestationService>()
                .HasKey(ec => new { ec.PrestationID, ec.ServiceID });
            modelBuilder.Entity<PrestationService>()
                .HasOne(ec => ec.Prestation)
                .WithMany(b => b.Services)
                .HasForeignKey(ec => ec.PrestationID);
            modelBuilder.Entity<PrestationService>()
                .HasOne(ec => ec.Service)
                .WithMany(c => c.PriceList)
                .HasForeignKey(ec => ec.ServiceID);

            modelBuilder.Entity<ProcessService>()
                .HasKey(ec => new { ec.ProcessID, ec.ServiceID });
            modelBuilder.Entity<ProcessService>()
                .HasOne(ec => ec.Process)
                .WithMany(b => b.Services)
                .HasForeignKey(ec => ec.ProcessID);
            modelBuilder.Entity<ProcessService>()
                .HasOne(ec => ec.Service)
                .WithMany(c => c.ProcessList)
                .HasForeignKey(ec => ec.ServiceID);


            modelBuilder.Entity<Commande>(entity =>
            {
                entity.Property(e => e.Date)
                    .IsRequired();
                entity.Property(e => e.Details);

                entity.HasOne(t => t.Service)
                .WithMany(tc => tc.Commandes)
                .HasForeignKey(t => t.ServiceID)
                .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(t => t.Contact)
               .WithMany(tc => tc.Commandes)
               .HasForeignKey(t => t.ContactID)
               .OnDelete(DeleteBehavior.Cascade);

                entity.HasMany(t => t.Attachements)
                .WithOne(tc => tc.Commande)
                .OnDelete(DeleteBehavior.SetNull);
            });

            modelBuilder.Entity<PrestationCommande>()
               .HasKey(ec => new { ec.CommandeID, ec.PrestationID });
            modelBuilder.Entity<PrestationCommande>()
                .HasOne(ec => ec.Commande)
                .WithMany(b => b.Prestations)
                .HasForeignKey(ec => ec.CommandeID);
            modelBuilder.Entity<PrestationCommande>()
                .HasOne(ec => ec.Prestation)
                .WithMany(c => c.Commandes)
                .HasForeignKey(ec => ec.PrestationID);


            modelBuilder.Entity<ModeReglement>(entity =>
            {
                entity.Property(e => e.Title).IsRequired().HasMaxLength(50);
            });

            modelBuilder.Entity<TypeReglement>(entity =>
            {
                entity.Property(e => e.Title).IsRequired().HasMaxLength(50);
            });

            modelBuilder.Entity<Reglement>(entity =>
            {
                entity.Property(e => e.Date) .IsRequired();
                entity.Property(e => e.Amount).IsRequired();
                entity.Property(e => e.Transaction).IsRequired().HasMaxLength(250);

                entity.HasOne(t => t.Commande)
                .WithMany(tc => tc.Reglements)
                .HasForeignKey(t => t.CommandeID)
                .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(t => t.TypeReglement)
                .WithMany(tc => tc.Reglements)
                .HasForeignKey(t => t.TypeReglementID)
                .OnDelete(DeleteBehavior.Cascade);

                entity.HasOne(t => t.ModeReglement)
                .WithMany(tc => tc.Reglements)
                .HasForeignKey(t => t.ModeReglementID)
                .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ReglementPrestation>()
               .HasKey(ec => new { ec.ReglementID, ec.PrestationID });
            modelBuilder.Entity<ReglementPrestation>()
                .HasOne(ec => ec.Reglement)
                .WithMany(b => b.Prestations)
                .HasForeignKey(ec => ec.ReglementID);
            modelBuilder.Entity<ReglementPrestation>()
                .HasOne(ec => ec.Prestation)
                .WithMany(c => c.Reglements)
                .HasForeignKey(ec => ec.PrestationID);


            modelBuilder.Entity<LienExterne>(entity =>
            {
                entity.Property(e => e.Icon).HasMaxLength(50);
                entity.Property(e => e.Href)
                    .IsRequired()
                    .HasMaxLength(250);
                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(250);
            });

            modelBuilder.Entity<Experience>(entity =>
            {
                entity.Property(e => e.Job)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.Company).HasMaxLength(50);
                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.Sector)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.StartDate).IsRequired();
                entity.Property(e => e.EndDate);
                entity.Property(e => e.Context)
                    .IsRequired()
                    .HasMaxLength(250);
                entity.Property(e => e.Details)
                    .IsRequired()
                    .HasMaxLength(3000);
            });

            modelBuilder.Entity<Formation>(entity =>
            {
                entity.Property(e => e.Training)
                    .IsRequired()
                    .HasMaxLength(100);
                entity.Property(e => e.TrainingCenter).HasMaxLength(50);
                entity.Property(e => e.City)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.Sector)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.StartDate).IsRequired();
                entity.Property(e => e.EndDate);
                entity.Property(e => e.Context)
                    .IsRequired()
                    .HasMaxLength(250);
                entity.Property(e => e.Graduate)
                    .IsRequired();
                entity.Property(e => e.Details)
                    .IsRequired()
                    .HasMaxLength(3000);
                entity.Property(e => e.Certification)
                    .IsRequired();
            });

            modelBuilder.Entity<Competence>(entity =>
            {
                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(250);
                entity.Property(e => e.Icon)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.Level)
                    .IsRequired();
            });

            modelBuilder.Entity<DomaineCompetence>(entity =>
            {
                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(250);
                entity.Property(e => e.Picture)
                    .IsRequired()
                    .HasMaxLength(250);
                entity.Property(e => e.Description)
                    .IsRequired();
            });

            modelBuilder.Entity<CompetenceExperience>()
                .HasKey(ec => new { ec.CompetenceID, ec.ExperienceID });
            modelBuilder.Entity<CompetenceExperience>()
                .HasOne(ec => ec.Competence)
                .WithMany(b => b.Experiences)
                .HasForeignKey(ec => ec.CompetenceID);
            modelBuilder.Entity<CompetenceExperience>()
                .HasOne(ec => ec.Experience)
                .WithMany(c => c.Skills)
                .HasForeignKey(ec => ec.ExperienceID);

            modelBuilder.Entity<TypeRealisation>(entity =>
            {
                entity.Property(e => e.Title).IsRequired().HasMaxLength(250);
                entity.Property(e => e.Category).IsRequired().HasMaxLength(50);
            });

            modelBuilder.Entity<Realisation>(entity =>
            {
                entity.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.Resume).IsRequired().HasMaxLength(1000);
                entity.Property(e => e.Client)
                    .IsRequired()
                    .HasMaxLength(50);
                entity.Property(e => e.Delivered)
                    .IsRequired();
                entity.Property(e => e.Project).IsRequired();
                entity.Property(e => e.Link).IsRequired().HasMaxLength(250);
                entity.Property(e => e.Picture).IsRequired().HasMaxLength(250);

                entity.HasOne(t => t.TypeRealisation)
                .WithMany(tc => tc.Realisations)
                .HasForeignKey(t => t.TypeRealisationID)
                .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<RealisationCompetence>()
               .HasKey(ec => new { ec.RealisationID, ec.CompetenceID });
            modelBuilder.Entity<RealisationCompetence>()
                .HasOne(ec => ec.Competence)
                .WithMany(b => b.Realisations)
                .HasForeignKey(ec => ec.CompetenceID);
            modelBuilder.Entity<RealisationCompetence>()
                .HasOne(ec => ec.Realisation)
                .WithMany(c => c.Competences)
                .HasForeignKey(ec => ec.RealisationID);
        }

        public DbSet<File> Files { get; set; }
        public DbSet<Rubrique> Rubriques { get; set; }
        public DbSet<LienExterne> LiensExternes { get; set; }
        public DbSet<Experience> Experiences { get; set; }
        public DbSet<Formation> Formations { get; set; }
        public DbSet<DomaineCompetence> DomainesCompetence { get; set; }
        public DbSet<Competence> Competences { get; set; }
        public DbSet<TypeRealisation> TypesRealisation { get; set; }
        public DbSet<Realisation> Realisations { get; set; }
        public DbSet<Contact> Contacts { get; set; }
        public DbSet<Demande> Demandes { get; set; }
        public DbSet<TypeConnaissance> TypesConnaissance { get; set; }
        public DbSet<Avis> Avis { get; set; }
        public DbSet<Service> Services { get; set; }
        public DbSet<Prestation> Prestations { get; set; }
        public DbSet<Process> Process { get; set; }
        public DbSet<TypeAttachement> TypesAttachement { get; set; }
        public DbSet<Attachement> Attachements { get; set; }
        public DbSet<Commande> Commandes { get; set; }
        public DbSet<ModeReglement> ModesReglement { get; set; }
        public DbSet<TypeReglement> TypesReglement { get; set; }
        public DbSet<Reglement> Reglements { get; set; }
        public DbSet<ReglementPrestation> ReglementPrestation { get; set; }
    }
}
