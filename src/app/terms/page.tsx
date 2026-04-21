import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions d'Utilisation | Wano",
  description: "Conditions générales d'utilisation de la plateforme Wano.",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#fbfbfc]">
      {/* Header */}
      <header className="py-6 px-[5%] border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="flex items-center gap-2 w-fit">
            <div className="relative w-8 h-8">
              <Image src="/logo.svg" alt="Wano" fill sizes="32px" className="object-contain" />
            </div>
            <span className="text-xl font-bold text-[#028175]">Wano</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="py-12 md:py-16 px-[5%]">
        <div className="max-w-4xl mx-auto prose prose-gray prose-headings:text-gray-900 prose-a:text-[#028175]">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Conditions Générales d&apos;Utilisation
          </h1>
          <p className="text-[#6b7271] text-sm mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Objet</h2>
            <p className="text-gray-600 mb-4">
              Les présentes Conditions Générales d&apos;Utilisation (CGU) régissent l&apos;accès et
              l&apos;utilisation de la plateforme Wano, éditée par <strong>Vague Digitale SARL</strong>,
              société de droit ivoirien.
            </p>
            <p className="text-gray-600">
              En accédant à Wano, vous acceptez sans réserve les présentes CGU. Si vous n&apos;acceptez
              pas ces conditions, vous devez cesser immédiatement d&apos;utiliser la plateforme.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Description du service</h2>
            <p className="text-gray-600 mb-4">
              Wano est une plateforme SaaS (Software as a Service) de gestion commerciale permettant aux
              entreprises de :
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Gérer leur stock et inventaire</li>
              <li>Créer et gérer leur boutique en ligne</li>
              <li>Émettre des factures et devis</li>
              <li>Suivre leurs ventes et clients</li>
              <li>Encaisser des paiements et effectuer des retraits</li>
              <li>Accéder à des rapports et analyses</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Inscription et compte</h2>
            <p className="text-gray-600 mb-4">
              Pour utiliser Wano, vous devez créer un compte en fournissant des informations exactes
              et complètes. Vous êtes responsable de :
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>La confidentialité de vos identifiants de connexion</li>
              <li>Toutes les activités effectuées sous votre compte</li>
              <li>La mise à jour de vos informations</li>
              <li>La notification immédiate en cas d&apos;utilisation non autorisée</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Nous nous réservons le droit de suspendre ou supprimer tout compte en cas de violation
              des présentes CGU.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Obligations de l&apos;utilisateur</h2>
            <p className="text-gray-600 mb-4">En utilisant Wano, vous vous engagez à :</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Respecter la législation en vigueur</li>
              <li>Ne pas utiliser le service à des fins illicites ou frauduleuses</li>
              <li>Ne pas porter atteinte aux droits de tiers</li>
              <li>Ne pas tenter de contourner les mesures de sécurité</li>
              <li>Ne pas transmettre de virus ou code malveillant</li>
              <li>Ne pas revendre ou redistribuer le service sans autorisation</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Propriété intellectuelle</h2>
            <p className="text-gray-600 mb-4">
              Tous les éléments de Wano (logos, textes, graphiques, logiciels, bases de données)
              sont la propriété exclusive de Vague Digitale SARL ou de ses partenaires et sont
              protégés par les lois relatives à la propriété intellectuelle.
            </p>
            <p className="text-gray-600">
              Toute reproduction, représentation, modification ou exploitation non autorisée est
              strictement interdite et constitue une contrefaçon.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Données utilisateur</h2>
            <p className="text-gray-600 mb-4">
              Vous conservez tous les droits sur les données que vous saisissez dans Wano
              (informations produits, clients, transactions). Vous nous accordez une licence
              limitée pour héberger, traiter et afficher ces données dans le cadre de la
              fourniture du service.
            </p>
            <p className="text-gray-600">
              Vous êtes responsable de la légalité des données que vous importez et de
              l&apos;obtention des consentements nécessaires concernant les données de vos clients.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Tarification et paiement</h2>
            <p className="text-gray-600 mb-4">
              L&apos;utilisation de Wano est soumise à la tarification en vigueur, disponible sur
              notre site. Les frais sont facturés selon le modèle d&apos;abonnement choisi ou
              selon l&apos;usage (pay-per-use).
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Les paiements sont dus selon les termes de votre abonnement</li>
              <li>Les prix peuvent être modifiés avec un préavis de 30 jours</li>
              <li>En cas de non-paiement, l&apos;accès au service peut être suspendu</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Disponibilité du service</h2>
            <p className="text-gray-600 mb-4">
              Nous nous efforçons d&apos;assurer une disponibilité maximale de Wano. Cependant,
              nous ne garantissons pas un accès ininterrompu. Le service peut être temporairement
              indisponible pour :
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Maintenance programmée (avec notification préalable si possible)</li>
              <li>Mises à jour et améliorations</li>
              <li>Cas de force majeure</li>
              <li>Problèmes techniques indépendants de notre volonté</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Limitation de responsabilité</h2>
            <p className="text-gray-600 mb-4">
              Dans les limites autorisées par la loi, Vague Digitale SARL ne saurait être tenue
              responsable :
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Des dommages indirects (perte de profits, de données, de clientèle)</li>
              <li>Des interruptions de service</li>
              <li>Des erreurs ou inexactitudes dans les données</li>
              <li>Des actions de tiers utilisant votre compte</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Notre responsabilité totale est limitée au montant des frais payés par vous au cours
              des 12 derniers mois.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Résiliation</h2>
            <p className="text-gray-600 mb-4">
              Vous pouvez résilier votre compte à tout moment depuis les paramètres de votre compte.
              Nous pouvons résilier ou suspendre votre accès immédiatement, sans préavis, en cas de :
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Violation des présentes CGU</li>
              <li>Non-paiement des frais dus</li>
              <li>Comportement frauduleux ou illicite</li>
              <li>Demande d&apos;une autorité compétente</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">11. Modifications des CGU</h2>
            <p className="text-gray-600">
              Nous nous réservons le droit de modifier ces CGU à tout moment. Les modifications
              entrent en vigueur dès leur publication. En cas de modifications substantielles,
              nous vous en informerons par email ou notification dans l&apos;application.
              La poursuite de l&apos;utilisation du service après modification vaut acceptation
              des nouvelles conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">12. Droit applicable et litiges</h2>
            <p className="text-gray-600 mb-4">
              Les présentes CGU sont régies par le droit ivoirien. En cas de litige, les parties
              s&apos;engagent à rechercher une solution amiable avant toute action judiciaire.
            </p>
            <p className="text-gray-600">
              À défaut d&apos;accord amiable, les tribunaux d&apos;Abidjan seront seuls compétents.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">13. Contact</h2>
            <p className="text-gray-600">
              Pour toute question concernant ces conditions d&apos;utilisation :
            </p>
            <ul className="list-none pl-0 text-gray-600 mt-4 space-y-1">
              <li><strong>Éditeur :</strong> Vague Digitale SARL</li>
              <li><strong>Email :</strong> contact@vaguedigitale.com</li>
              <li><strong>Adresse :</strong> Abidjan, Côte d&apos;Ivoire</li>
            </ul>
          </section>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[#028175] hover:underline font-medium"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
