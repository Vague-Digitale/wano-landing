import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité | Wano",
  description: "Politique de confidentialité et protection des données personnelles de Wano.",
};

export default function PrivacyPage() {
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
            Politique de Confidentialité
          </h1>
          <p className="text-[#6b7271] text-sm mb-8">
            Dernière mise à jour : {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
            <p className="text-gray-600 mb-4">
              Wano est un produit édité par <strong>Vague Digitale SARL</strong> (&quot;nous&quot;, &quot;notre&quot;
              ou &quot;la Société&quot;), société de droit ivoirien. Cette politique de confidentialité décrit
              comment nous collectons, utilisons, stockons et protégeons vos informations personnelles
              lorsque vous utilisez notre plateforme de gestion commerciale.
            </p>
            <p className="text-gray-600">
              En utilisant Wano, vous acceptez les pratiques décrites dans cette politique.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">2. Données collectées</h2>
            <p className="text-gray-600 mb-4">Nous collectons les types de données suivants :</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <strong>Données d&apos;identification :</strong> nom, prénom, adresse email, numéro de téléphone
              </li>
              <li>
                <strong>Données professionnelles :</strong> nom de l&apos;entreprise, secteur d&apos;activité,
                adresse commerciale
              </li>
              <li>
                <strong>Données de transaction :</strong> informations sur les ventes, factures, commandes
                et paiements traités via la plateforme
              </li>
              <li>
                <strong>Données techniques :</strong> adresse IP, type de navigateur, données de connexion
              </li>
              <li>
                <strong>Données de vos clients :</strong> informations que vous saisissez concernant vos
                propres clients dans le cadre de votre activité
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">3. Utilisation des données</h2>
            <p className="text-gray-600 mb-4">Vos données sont utilisées pour :</p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Fournir et améliorer nos services de gestion commerciale</li>
              <li>Traiter vos transactions et paiements</li>
              <li>Vous envoyer des notifications importantes concernant votre compte</li>
              <li>Assurer la sécurité de votre compte et prévenir la fraude</li>
              <li>Respecter nos obligations légales et réglementaires</li>
              <li>Vous fournir un support client</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">4. Protection des données</h2>
            <p className="text-gray-600 mb-4">
              Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées
              pour protéger vos données contre tout accès non autorisé, modification, divulgation ou
              destruction, notamment :
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Chiffrement des données en transit (HTTPS/TLS)</li>
              <li>Chiffrement des données sensibles au repos</li>
              <li>Accès restreint aux données personnelles</li>
              <li>Surveillance continue de nos systèmes</li>
              <li>Sauvegardes régulières et sécurisées</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">5. Partage des données</h2>
            <p className="text-gray-600 mb-4">
              Nous ne vendons jamais vos données personnelles. Nous pouvons partager vos données
              uniquement dans les cas suivants :
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>
                <strong>Prestataires de services :</strong> hébergement, paiement, analytics
                (sous contrat de confidentialité)
              </li>
              <li>
                <strong>Obligations légales :</strong> réponse aux demandes des autorités compétentes
              </li>
              <li>
                <strong>Votre consentement :</strong> tout autre partage avec votre accord explicite
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">6. Conservation des données</h2>
            <p className="text-gray-600">
              Nous conservons vos données personnelles aussi longtemps que nécessaire pour fournir
              nos services et respecter nos obligations légales. Les données de facturation sont
              conservées conformément aux exigences comptables et fiscales applicables (généralement
              10 ans). Après la suppression de votre compte, vos données sont supprimées ou anonymisées
              dans un délai de 30 jours, sauf obligation légale de conservation.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">7. Vos droits</h2>
            <p className="text-gray-600 mb-4">
              Conformément à la réglementation applicable, vous disposez des droits suivants :
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li><strong>Droit d&apos;accès :</strong> obtenir une copie de vos données personnelles</li>
              <li><strong>Droit de rectification :</strong> corriger vos données inexactes</li>
              <li><strong>Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
              <li><strong>Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
              <li><strong>Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
              <li><strong>Droit de limitation :</strong> limiter le traitement de vos données</li>
            </ul>
            <p className="text-gray-600 mt-4">
              Pour exercer ces droits, contactez-nous à{" "}
              <a href="mailto:privacy@wanoapp.com" className="text-[#028175] hover:underline">
                privacy@wanoapp.com
              </a>
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">8. Cookies</h2>
            <p className="text-gray-600">
              Nous utilisons des cookies essentiels pour le fonctionnement de la plateforme
              (authentification, préférences). Des cookies analytiques peuvent être utilisés
              pour améliorer nos services. Vous pouvez gérer vos préférences de cookies dans
              les paramètres de votre navigateur.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">9. Modifications</h2>
            <p className="text-gray-600">
              Nous pouvons mettre à jour cette politique de confidentialité. En cas de modifications
              importantes, nous vous en informerons par email ou via une notification sur la plateforme.
              La date de dernière mise à jour est indiquée en haut de ce document.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">10. Contact</h2>
            <p className="text-gray-600">
              Pour toute question concernant cette politique de confidentialité ou vos données
              personnelles, contactez-nous :
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
