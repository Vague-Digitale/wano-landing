"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/v2/SiteHeader";
import { SiteFooter } from "@/components/v2/SiteFooter";
import { Container } from "@/components/v2/Container";
import { H2 } from "@/components/v2/Typography";

// ============================================================================
// TYPES
// ============================================================================

type PlanId = "starter" | "basic" | "pro";
type TabId = "abonnements" | "quotas" | "modules";

interface EstimationItem {
  label: string;
  amount: number;
  included?: boolean;
}

interface Estimation {
  items: EstimationItem[];
  total: number;
}

// ============================================================================
// PRICING DATA
// ============================================================================

const PLANS = {
  starter: {
    id: "starter" as PlanId,
    name: "Starter",
    target: "Pour démarrer",
    price: 2000,
    includedProducts: 3,
    includedUsers: 1,
    includedInvoices: 10,
    features: [
      "1 utilisateur",
      "3 produits",
      "1 point de vente",
      "Module principal selon activité",
      "Support email",
    ],
  },
  basic: {
    id: "basic" as PlanId,
    name: "Basic",
    target: "Commerces en croissance",
    price: 5000,
    includedProducts: 50,
    includedUsers: 2,
    includedInvoices: 10,
    features: [
      "2 utilisateurs",
      "50 produits",
      "2 points de vente",
      "Site en ligne basique",
      "Asso IA inclus",
      "Support email",
    ],
  },
  pro: {
    id: "pro" as PlanId,
    name: "Pro",
    target: "Entreprises",
    price: 9000,
    includedProducts: Infinity,
    includedUsers: 3,
    includedInvoices: 10,
    features: [
      "3 utilisateurs",
      "Produits illimités",
      "Points POS illimités",
      "Site personnalisable",
      "Rapports avancés",
      "Support prioritaire",
    ],
  },
};

const PRODUCT_TIERS = [
  { limit: 0, price: 0, label: "Inclus dans le plan" },
  { limit: 50, price: 1500, label: "50 produits" },
  { limit: 200, price: 5000, label: "200 produits" },
  { limit: 500, price: 10000, label: "500 produits" },
  { limit: Infinity, price: 15000, label: "Illimité" },
];

const USER_TIERS = [
  { count: 0, price: 0, label: "Inclus dans le plan" },
  { count: 1, price: 1000, label: "+1 utilisateur" },
  { count: 3, price: 2500, label: "+3 utilisateurs" },
  { count: 5, price: 4000, label: "+5 utilisateurs" },
  { count: 10, price: 7000, label: "+10 utilisateurs" },
];

const INVOICE_TIERS = [
  { limit: 0, price: 0, label: "10 incluses" },
  { limit: 50, price: 1500, label: "50 factures" },
  { limit: 200, price: 5000, label: "200 factures" },
  { limit: Infinity, price: 8000, label: "Illimité" },
];

const ORDER_TIERS = [
  { limit: 0, price: 0, label: "Désactivé" },
  { limit: 100, price: 5000, label: "100 / mois" },
  { limit: 500, price: 20000, label: "500 / mois" },
  { limit: Infinity, price: 35000, label: "Illimité" },
];

const MODULES = [
  { id: "pos", name: "Point de Vente (POS avancé)", description: "Caisse tactile, tickets, modes de paiement multiples.", price: 2000 },
  { id: "reports", name: "Rapports Avancés", description: "Analyses détaillées, exports, tableaux de bord.", price: 2000 },
  { id: "domain", name: "Domaine Personnalisé", description: "Votre propre nom de domaine pour votre boutique.", price: 3000 },
  { id: "multistore", name: "Multi-boutiques", description: "Gérez plusieurs boutiques depuis un seul compte.", price: 10000 },
];

// ============================================================================
// ICONS
// ============================================================================

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ============================================================================
// CALCULATOR LOGIC
// ============================================================================

function pickProductTier(needed: number): { price: number; label: string } | null {
  if (needed <= 0) return null;
  for (const tier of PRODUCT_TIERS) {
    if (tier.limit >= needed && tier.price > 0) {
      return { price: tier.price, label: tier.label };
    }
  }
  return { price: 15000, label: "Illimité" };
}

function pickUserTier(needed: number): { price: number; label: string } | null {
  if (needed <= 0) return null;
  for (const tier of USER_TIERS) {
    if (tier.count >= needed && tier.price > 0) {
      return { price: tier.price, label: tier.label };
    }
  }
  return { price: 7000, label: "+10 utilisateurs" };
}

function pickInvoiceTier(needed: number): { price: number; label: string } | null {
  if (needed <= 0) return null;
  for (const tier of INVOICE_TIERS) {
    if (tier.limit >= needed && tier.price > 0) {
      return { price: tier.price, label: tier.label };
    }
  }
  return { price: 8000, label: "Illimité" };
}

function pickOrderTier(orders: number): { price: number; label: string } | null {
  if (orders === 0) return null;
  for (const tier of ORDER_TIERS) {
    if (tier.limit >= orders && tier.price > 0) {
      return { price: tier.price, label: tier.label };
    }
  }
  return { price: 35000, label: "Illimité" };
}

function calculateEstimation(
  planId: PlanId,
  products: number,
  users: number,
  invoices: number,
  orders: number,
  enabledModules: string[]
): Estimation {
  const plan = PLANS[planId];
  const items: EstimationItem[] = [];

  // Plan de base
  items.push({ label: `Plan ${plan.name}`, amount: plan.price });

  // Produits
  const extraProducts = products - plan.includedProducts;
  const productTier = pickProductTier(extraProducts);
  if (productTier) {
    items.push({ label: productTier.label, amount: productTier.price });
  }

  // Utilisateurs
  const extraUsers = users - plan.includedUsers;
  const userTier = pickUserTier(extraUsers);
  if (userTier) {
    items.push({ label: userTier.label, amount: userTier.price });
  }

  // Factures
  const extraInvoices = invoices - plan.includedInvoices;
  const invoiceTier = pickInvoiceTier(extraInvoices);
  if (invoiceTier) {
    items.push({ label: invoiceTier.label, amount: invoiceTier.price });
  }

  // Commandes
  const orderTier = pickOrderTier(orders);
  if (orderTier) {
    items.push({ label: `${orderTier.label} commandes`, amount: orderTier.price });
  }

  // Modules
  for (const moduleId of enabledModules) {
    const mod = MODULES.find((m) => m.id === moduleId);
    if (mod) {
      items.push({ label: mod.name, amount: mod.price });
    }
  }

  const total = items.reduce((sum, item) => sum + item.amount, 0);

  return { items, total };
}

// ============================================================================
// COMPONENTS
// ============================================================================

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "bg-[var(--wn-text)] text-white"
          : "text-[var(--wn-text)] hover:bg-[var(--wn-n-100)]"
      }`}
      style={{ fontFamily: "var(--wn-font-display)" }}
    >
      {children}
    </button>
  );
}

function PlanCard({
  plan,
  selected,
  onSelect,
}: {
  plan: (typeof PLANS)[PlanId];
  selected: boolean;
  onSelect: () => void;
}) {
  const isBasic = plan.id === "basic";

  return (
    <div
      onClick={onSelect}
      className={`relative p-6 cursor-pointer transition-all ${
        selected
          ? "border-2 border-[var(--wn-green-600)] bg-[var(--wn-green-50)]"
          : "border border-[var(--wn-n-200)] bg-[var(--wn-surface)] hover:border-[var(--wn-green-400)]"
      } ${isBasic && !selected ? "border-t-4 border-t-[var(--wn-green-600)]" : ""}`}
    >
      {isBasic && (
        <span
          className="absolute -top-3 left-4 px-2 py-0.5 bg-[var(--wn-green-600)] text-white text-[10px] font-semibold uppercase"
          style={{ fontFamily: "var(--wn-font-display)" }}
        >
          Recommandé
        </span>
      )}

      <h3
        className="text-lg font-semibold text-[var(--wn-text)] mb-1"
        style={{ fontFamily: "var(--wn-font-display)" }}
      >
        {plan.name}
      </h3>
      <p
        className="text-xs text-[var(--wn-n-500)] mb-3"
        style={{ fontFamily: "var(--wn-font-display)" }}
      >
        {plan.target}
      </p>
      <div className="mb-4">
        <span
          className="text-3xl font-bold text-[var(--wn-text)] tabular-nums"
          style={{ fontFamily: "var(--wn-font-display)" }}
        >
          {plan.price.toLocaleString("fr-FR")}
        </span>
        <span
          className="text-xs text-[var(--wn-n-500)] ml-1"
          style={{ fontFamily: "var(--wn-font-display)" }}
        >
          F / mois
        </span>
      </div>

      <ul className="space-y-2">
        {plan.features.slice(0, 4).map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-xs text-[var(--wn-n-500)]"
            style={{ fontFamily: "var(--wn-font-display)" }}
          >
            <span className="text-[var(--wn-green-600)]">
              <CheckIcon />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      {selected && (
        <div className="absolute top-4 right-4 w-5 h-5 bg-[var(--wn-green-600)] flex items-center justify-center">
          <CheckIcon />
        </div>
      )}
    </div>
  );
}

function QuotaSelector({
  label,
  description,
  tiers,
  value,
  onChange,
  valueKey = "limit",
}: {
  label: string;
  description: string;
  tiers: { limit?: number; count?: number; price: number; label: string }[];
  value: number;
  onChange: (value: number) => void;
  valueKey?: "limit" | "count";
}) {
  return (
    <div className="mb-8">
      <h4
        className="text-base font-semibold text-[var(--wn-text)] mb-1"
        style={{ fontFamily: "var(--wn-font-display)" }}
      >
        {label}
      </h4>
      <p
        className="text-xs text-[var(--wn-n-500)] mb-4"
        style={{ fontFamily: "var(--wn-font-display)" }}
      >
        {description}
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {tiers.map((tier, index) => {
          const tierValue = valueKey === "limit" ? tier.limit : tier.count;
          const isSelected = value === tierValue;

          return (
            <button
              key={index}
              onClick={() => onChange(tierValue ?? 0)}
              className={`p-3 text-left transition-all ${
                isSelected
                  ? "border-2 border-[var(--wn-green-600)] bg-[var(--wn-green-50)]"
                  : "border border-[var(--wn-n-200)] bg-[var(--wn-surface)] hover:border-[var(--wn-green-400)]"
              }`}
            >
              <div
                className="text-sm font-semibold text-[var(--wn-text)] mb-1"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {tier.label}
              </div>
              <div
                className="text-xs text-[var(--wn-n-500)] tabular-nums"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {tier.price === 0 ? "Gratuit" : `${tier.price.toLocaleString("fr-FR")} F`}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ModuleToggle({
  module,
  enabled,
  onToggle,
}: {
  module: (typeof MODULES)[number];
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={`p-5 border transition-all cursor-pointer ${
        enabled
          ? "border-[var(--wn-green-600)] bg-[var(--wn-green-50)]"
          : "border-[var(--wn-n-200)] bg-[var(--wn-surface)] hover:border-[var(--wn-green-400)]"
      }`}
      onClick={onToggle}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <h4
            className="text-base font-semibold text-[var(--wn-text)] mb-1"
            style={{ fontFamily: "var(--wn-font-display)" }}
          >
            {module.name}
          </h4>
          <p
            className="text-xs text-[var(--wn-n-500)] mb-2"
            style={{ fontFamily: "var(--wn-font-display)" }}
          >
            {module.description}
          </p>
          <p
            className="text-lg font-bold text-[var(--wn-text)] tabular-nums"
            style={{ fontFamily: "var(--wn-font-display)" }}
          >
            {module.price.toLocaleString("fr-FR")} F
            <span className="text-xs font-normal text-[var(--wn-n-500)]"> / mois</span>
          </p>
        </div>

        {/* Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={`w-12 h-7 rounded-full transition-colors flex-shrink-0 ${
            enabled ? "bg-[var(--wn-green-600)]" : "bg-[var(--wn-n-300)]"
          }`}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${
              enabled ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}

function EstimationCard({
  estimation,
  className = "",
}: {
  estimation: Estimation;
  className?: string;
}) {
  return (
    <div
      className={`bg-[var(--wn-surface)] border border-[var(--wn-n-200)] p-5 ${className}`}
    >
      <h4
        className="text-sm font-semibold text-[var(--wn-n-500)] uppercase tracking-wide mb-4"
        style={{ fontFamily: "var(--wn-font-display)" }}
      >
        Estimation
      </h4>

      <div className="space-y-2 mb-4">
        <AnimatePresence mode="popLayout">
          {estimation.items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-between text-sm"
              style={{ fontFamily: "var(--wn-font-display)" }}
            >
              <span className="text-[var(--wn-n-500)]">{item.label}</span>
              <span className="text-[var(--wn-text)] tabular-nums font-medium">
                {item.amount.toLocaleString("fr-FR")} F
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t border-[var(--wn-n-200)] pt-4 mb-4">
        <div className="flex items-center justify-between mb-1">
          <span
            className="text-sm text-[var(--wn-n-500)]"
            style={{ fontFamily: "var(--wn-font-display)" }}
          >
            Total mensuel
          </span>
        </div>
        <motion.div
          key={estimation.total}
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="text-3xl font-bold text-[var(--wn-text)] tabular-nums"
          style={{ fontFamily: "var(--wn-font-display)" }}
        >
          {estimation.total.toLocaleString("fr-FR")} F CFA
        </motion.div>
      </div>

      <Link
        href={`https://console.wanoapp.com/signup`}
        className="flex items-center justify-center w-full h-11 bg-[var(--wn-green-600)] text-white font-semibold text-sm hover:bg-[var(--wn-green-700)] transition-colors mb-3"
        style={{ fontFamily: "var(--wn-font-display)" }}
      >
        Démarrer mon essai gratuit
      </Link>

      <p
        className="text-[10px] text-[var(--wn-n-400)] text-center"
        style={{ fontFamily: "var(--wn-font-display)" }}
      >
        Aucun débit avant activation. 14 jours gratuits.
      </p>
    </div>
  );
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function TarifsPage() {
  const [activeTab, setActiveTab] = useState<TabId>("abonnements");
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("basic");
  const [products, setProducts] = useState(50);
  const [users, setUsers] = useState(1);
  const [invoices, setInvoices] = useState(10);
  const [orders, setOrders] = useState(0);
  const [enabledModules, setEnabledModules] = useState<string[]>([]);

  const toggleModule = useCallback((moduleId: string) => {
    setEnabledModules((prev) =>
      prev.includes(moduleId) ? prev.filter((m) => m !== moduleId) : [...prev, moduleId]
    );
  }, []);

  const estimation = calculateEstimation(
    selectedPlan,
    products,
    users,
    invoices,
    orders,
    enabledModules
  );

  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem("wano_pricing_estimate_v1");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.selectedPlan) setSelectedPlan(data.selectedPlan);
        if (data.products) setProducts(data.products);
        if (data.users) setUsers(data.users);
        if (data.invoices) setInvoices(data.invoices);
        if (data.orders !== undefined) setOrders(data.orders);
        if (data.enabledModules) setEnabledModules(data.enabledModules);
      } catch (e) {
        // ignore
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "wano_pricing_estimate_v1",
      JSON.stringify({ selectedPlan, products, users, invoices, orders, enabledModules })
    );
  }, [selectedPlan, products, users, invoices, orders, enabledModules]);

  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[var(--wn-bg-warm)] pt-24 pb-16">
        <Container>
          {/* Header */}
          <div className="mb-8">
            <H2 className="mb-2">Tarifs Wano</H2>
            <p
              className="text-base text-[var(--wn-n-500)]"
              style={{ fontFamily: "var(--wn-font-display)" }}
            >
              Payez uniquement pour ce que vous utilisez. Sans engagement.
            </p>
          </div>

          {/* Trial Banner */}
          <div className="flex items-center gap-3 p-4 bg-[var(--wn-green-100)] border border-[var(--wn-green-300)] mb-8">
            <ClockIcon />
            <span
              className="text-sm font-medium text-[var(--wn-green-700)]"
              style={{ fontFamily: "var(--wn-font-display)" }}
            >
              14 jours d&apos;essai gratuit · sans paiement requis
            </span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="flex-1">
              {/* Tabs */}
              <div className="inline-flex border border-[var(--wn-n-200)] mb-8">
                <TabButton
                  active={activeTab === "abonnements"}
                  onClick={() => setActiveTab("abonnements")}
                >
                  Abonnements
                </TabButton>
                <TabButton
                  active={activeTab === "quotas"}
                  onClick={() => setActiveTab("quotas")}
                >
                  Quotas
                </TabButton>
                <TabButton
                  active={activeTab === "modules"}
                  onClick={() => setActiveTab("modules")}
                >
                  Modules
                </TabButton>
              </div>

              {/* Tab Content */}
              <AnimatePresence mode="wait">
                {activeTab === "abonnements" && (
                  <motion.div
                    key="abonnements"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {Object.values(PLANS).map((plan) => (
                        <PlanCard
                          key={plan.id}
                          plan={plan}
                          selected={selectedPlan === plan.id}
                          onSelect={() => setSelectedPlan(plan.id)}
                        />
                      ))}
                    </div>

                    <p
                      className="text-xs text-[var(--wn-n-400)] mt-4"
                      style={{ fontFamily: "var(--wn-font-display)" }}
                    >
                      Plans sur devis disponibles pour besoins multi-organisations ou API.{" "}
                      <a
                        href="https://wa.me/2250545476305"
                        className="text-[var(--wn-green-600)] hover:underline"
                      >
                        Contactez-nous
                      </a>
                    </p>
                  </motion.div>
                )}

                {activeTab === "quotas" && (
                  <motion.div
                    key="quotas"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Info Banner */}
                    <div
                      className="p-4 bg-[var(--wn-bg-warm)] border border-[var(--wn-n-200)] mb-8 text-sm text-[var(--wn-n-600)]"
                      style={{ fontFamily: "var(--wn-font-display)" }}
                    >
                      Facturation à l&apos;usage. Payez uniquement pour ce que vous utilisez.
                      Choisissez le niveau adapté à chaque type de quota.
                    </div>

                    <QuotaSelector
                      label="Produits"
                      description="Nombre de produits dans votre catalogue"
                      tiers={PRODUCT_TIERS}
                      value={products}
                      onChange={setProducts}
                      valueKey="limit"
                    />

                    <QuotaSelector
                      label="Utilisateurs"
                      description="Membres de votre équipe"
                      tiers={USER_TIERS}
                      value={users}
                      onChange={setUsers}
                      valueKey="count"
                    />

                    <QuotaSelector
                      label="Factures"
                      description="Factures générées par mois"
                      tiers={INVOICE_TIERS}
                      value={invoices}
                      onChange={setInvoices}
                      valueKey="limit"
                    />

                    <QuotaSelector
                      label="Commandes e-commerce"
                      description="Commandes en ligne par mois"
                      tiers={ORDER_TIERS}
                      value={orders}
                      onChange={setOrders}
                      valueKey="limit"
                    />
                  </motion.div>
                )}

                {activeTab === "modules" && (
                  <motion.div
                    key="modules"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {MODULES.map((module) => (
                        <ModuleToggle
                          key={module.id}
                          module={module}
                          enabled={enabledModules.includes(module.id)}
                          onToggle={() => toggleModule(module.id)}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sticky Estimation Card - Desktop */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-24">
                <EstimationCard estimation={estimation} />
              </div>
            </div>
          </div>
        </Container>

        {/* Mobile Bottom Sheet */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--wn-surface)] border-t border-[var(--wn-n-200)] p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div
                className="text-xs text-[var(--wn-n-500)]"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                Total mensuel
              </div>
              <div
                className="text-2xl font-bold text-[var(--wn-text)] tabular-nums"
                style={{ fontFamily: "var(--wn-font-display)" }}
              >
                {estimation.total.toLocaleString("fr-FR")} F
              </div>
            </div>
            <Link
              href="https://console.wanoapp.com/signup"
              className="flex items-center justify-center h-11 px-6 bg-[var(--wn-green-600)] text-white font-semibold text-sm hover:bg-[var(--wn-green-700)] transition-colors"
              style={{ fontFamily: "var(--wn-font-display)" }}
            >
              Démarrer l&apos;essai
            </Link>
          </div>
          <p
            className="text-[10px] text-[var(--wn-n-400)] text-center"
            style={{ fontFamily: "var(--wn-font-display)" }}
          >
            14 jours gratuits · sans paiement requis
          </p>
        </div>

        {/* Spacer for mobile bottom sheet */}
        <div className="lg:hidden h-28" />
      </main>

      <SiteFooter />
    </>
  );
}
