# CestoAgenda — Inventário UI/UX para Design System

**Destinatário:** IA que vai criar lib DS separada (estilo shadcn: CSS vars + install por componente ou pacote completo).  
**Fonte:** codebase em `2026-07-18`.  
**Stack UI atual:** Next 16 App Router · React 19 · Tailwind 4 · shadcn `base-nova` · Lucide · `cssVariables: true` · tema em `src/app/globals.css`.

---

## 0. Contrato esperado da lib DS

1. **Tokens CSS** (arquivo único, ex. `theme.css` / `globals.css`) definem `:root` + `.dark`.
2. Componentes **só consomem** tokens semânticos (`bg-primary`, `text-muted-foreground`, `--accent-success`, etc.) — nunca hex hardcoded.
3. Consumidor pode: (a) instalar lib completa; (b) copiar/registrar componentes à la shadcn; (c) sobrescrever tokens = rebrand total.
4. **Multi-brand runtime:** lavanderia injeta `--primary` / `--brand` via inline style ou data-attribute (já ocorre no portal cliente / landings).
5. App = **3 superfícies:** SaaS institucional · Admin dono · Cliente (whitelabel por lavanderia).

---

## 1. Arquivos de tema (estado atual)

| Arquivo                             | Papel                                                                                                         |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| `src/app/globals.css`               | Tokens shadcn (`--background`…`--sidebar-*`, `--chart-*`, `--radius`) light/dark indigo                       |
| `src/styles/design-tokens.css`      | Extensão: spacing, type fluid, surface-0..3, accent-success/warning/danger/info, duration, ease, shadow, blur |
| `src/styles/utilities.css`          | Classes: slide-up, interactive-lift, glass, card-modern, text-gradient                                        |
| `src/styles/backgrounds-modern.css` | hero-background, blobs, admin-bg, client-dashboard-bg, header-glass                                           |
| `src/lib/laundry-themes.ts`         | Presets landing: `vitrine` \| `folha` (primary hex, gradient, fonts Google)                                   |
| `components.json`                   | shadcn: style `base-nova`, css `src/app/globals.css`, icons lucide                                            |

**Problema p/ DS:** cores de status/calendário usam Tailwind fixo (`yellow-100`, `#f59e0b`) e brand hex — migrar para tokens semânticos.

### Tokens shadcn obrigatórios (mapear 1:1)

`--background` `--foreground` `--card` `--card-foreground` `--popover` `--popover-foreground` `--primary` `--primary-foreground` `--secondary` `--secondary-foreground` `--muted` `--muted-foreground` `--accent` `--accent-foreground` `--destructive` `--border` `--input` `--ring` `--radius` `--chart-1..5` `--sidebar` `--sidebar-foreground` `--sidebar-primary` `--sidebar-primary-foreground` `--sidebar-accent` `--sidebar-accent-foreground` `--sidebar-border` `--sidebar-ring`

### Tokens extra a padronizar no DS

| Token sugerido                                                                                                                                                     | Uso atual                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ |
| `--success` / `--warning` / `--info` / `--danger`                                                                                                                  | `design-tokens` + badges |
| `--status-pending` `--status-accepted` `--status-rejected` `--status-rescheduled` `--status-confirmed` `--status-pickup` `--status-completed` `--status-cancelled` | agenda/badges            |
| `--workflow-scheduled` `--workflow-washing` `--workflow-delivered`                                                                                                 | workflow coleta          |
| `--brand` (alias primary)                                                                                                                                          | lavanderia `brandColor`  |
| `--surface-0..3`                                                                                                                                                   | elevação                 |
| spacing / text / shadow / duration / ease / blur                                                                                                                   | já em design-tokens      |

---

## 2. Superfícies & shells

| Superfície     | Layout                     | Shell                                                       | Nav                  |
| -------------- | -------------------------- | ----------------------------------------------------------- | -------------------- |
| SaaS public    | `app/layout.tsx`           | Toaster only                                                | inline na page       |
| Auth           | `(auth)/layout.tsx`        | centrado                                                    | `NavBackHome` (dono) |
| Admin          | `(admin)/admin/layout.tsx` | Sidebar + mobile nav + banners + PushProvider + ThemeToggle | `ADMIN_NAV_ITEMS`    |
| Cliente        | `(client)/layout.tsx`      | `ClientAppShell` (rail desktop + bottom mobile + AppBanner) | 4 tabs               |
| Landing tenant | `app/[slug]/page.tsx`      | temas Folha/Vitrine                                         | tema-específico      |

**Admin nav:** `/admin` `/admin/planos` `/admin/clientes` `/admin/agenda` `/admin/pagamentos` `/admin/configuracoes` `/admin/notificacoes`  
**Cliente tabs:** `/coleta` `/planos` `/perfil` `/ajuda`  
**Admin page themes:** accent gradients por rota (`ADMIN_PAGE_THEMES` em `src/lib/admin-nav.ts`).

---

## 3. Rotas — inventário completo

Legenda: **UI** = componentes relevantes. **R** = redirect. **API** = sem UI.

### 3.1 Público / SaaS

| Rota               | Página                     | Propósito                                    | UI principal                                      |
| ------------------ | -------------------------- | -------------------------------------------- | ------------------------------------------------- |
| `/`                | `app/page.tsx`             | Landing CestoAgenda (planos SaaS UpBusiness) | hero + cards features + pricing + `LandingFAQ`    |
| `/[slug]`          | `app/[slug]/page.tsx`      | Landing lavanderia (ou “não publicada”)      | `LandingPage` → tema Folha/Vitrine; `NavBackHome` |
| `/comecar`         | `app/comecar/page.tsx`     | Onboarding dono (wizard)                     | `OwnerWizard`                                     |
| `/comecar/sucesso` | `…/sucesso/page.tsx`       | Pós-checkout Stripe plataforma               | CTA + `NavBackHome`                               |
| `/demo-modern`     | `app/demo-modern/page.tsx` | Playground tokens/modern UI                  | button/card/input modern                          |

### 3.2 Auth `(auth)`

| Rota               | Propósito             | UI                                                                    |
| ------------------ | --------------------- | --------------------------------------------------------------------- |
| `/entrar`          | Login cliente         | `entrar-form` · Input · Label · Button · FormErrorAlert · LaundryAuth |
| `/entrar/cadastro` | Cadastro cliente      | `cadastro-form` · LaundryPicker                                       |
| `/dono/entrar`     | Login dono            | form auth + NavBackHome                                               |
| `/cadastro`        | Cadastro (legado/alt) | forms shadcn                                                          |
| `/login`           | **R** → `/entrar`     | —                                                                     |
| `/esqueci-senha`   | Reset request         | Card · Input · Button                                                 |
| `/redefinir-senha` | Reset confirm         | Card · Input · Button                                                 |

### 3.3 Admin `(admin)/admin/*`

| Rota                            | Propósito                     | UI                                                                                                                            |
| ------------------------------- | ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `/admin`                        | Dashboard widgets             | `DashboardClient` `DashboardGrid` `DashboardWidget` `SortableWidget` (dnd-kit)                                                |
| `/admin/planos`                 | Lista planos                  | Table/cards mobile · Badge · TogglePlan · PlanDiscount · buttons                                                              |
| `/admin/planos/novo`            | Criar plano                   | `PlanForm`                                                                                                                    |
| `/admin/planos/[id]/editar`     | Editar plano                  | `PlanForm`                                                                                                                    |
| `/admin/planos/[id]/assinantes` | Assinantes do plano           | Table · Badge · CancelSubscription                                                                                            |
| `/admin/clientes`               | Hub clientes + coletas        | Toolbar · Search · Filters · Stats · Assinantes · Próximas coletas · Skeletons · Export                                       |
| `/admin/agenda`                 | Calendário operacional        | `AdminCalendarClient` + grid/sidebar/day panel/modals                                                                         |
| `/admin/pagamentos`             | Recebimentos + receita        | `PagamentosShell` · Filters · Chart · Export · ScheduleAdminActions                                                           |
| `/admin/configuracoes`          | Hub config                    | ShareCard · Appearance · Logo · Address · ServiceArea · FAQ editor · PaymentRecipient · AddonPackages · TestData · UpBusiness |
| `/admin/notificacoes`           | Push / alertas admin          | PushProvider UI                                                                                                               |
| `/admin/perfil`                 | Conta dono                    | AdminNameForm · AdminPasswordForm · LaundryAddressForm                                                                        |
| `/admin/assinatura`             | Assinatura SaaS               | BillingActionButton · status cards                                                                                            |
| `/admin/upgrade`                | Upgrade UpBusiness            | BillingActionButton · pricing                                                                                                 |
| `/admin/bem-vindo`              | Onboarding pós-signup         | steps / CTAs                                                                                                                  |
| `/admin/taxas`                  | Taxas plataforma              | listagem fees                                                                                                                 |
| `/admin/preview`                | Preview landing               | iframe/theme preview                                                                                                          |
| `/admin/pacotes*`               | **R** → planos / solicitacoes | legado                                                                                                                        |
| `/admin/solicitacoes`           | **R** → `/admin/clientes`     | —                                                                                                                             |
| `/admin/assinantes`             | **R** → `/admin/clientes`     | —                                                                                                                             |
| `/admin/aparencia`              | **R** → config                | —                                                                                                                             |

### 3.4 Cliente `(client)/*`

| Rota                     | Propósito                  | UI                                                                                                        |
| ------------------------ | -------------------------- | --------------------------------------------------------------------------------------------------------- |
| `/coleta`                | Agenda + solicitar coleta  | `ClientScheduleCalendar` · CalendarGrid · ScheduleActions · badges                                        |
| `/agenda`                | **R** → `/coleta`          | —                                                                                                         |
| `/planos`                | Planos disponíveis / troca | PlanPriceDisplay · FreightNote · PlanPromoBalloon · ChangePlan · Cancel                                   |
| `/planos/[id]/pagamento` | Checkout cartão            | `CheckoutFlow` · CardPaymentForm · SavedCards                                                             |
| `/meu-plano`             | Plano atual + cestos/addon | cards · UpdateCard · Cancel · PurchaseExtraCycles                                                         |
| `/meus-pacotes`          | Pacotes prepaid            | list cards                                                                                                |
| `/meus-pacotes/[id]`     | Detalhe pacote             | card + ações                                                                                              |
| `/perfil`                | Dados + endereço + push    | ProfileForm · AddressForm · FreightBanner · AppBanner área                                                |
| `/ajuda`                 | FAQ cliente                | FaqAnswerPreview · accordion                                                                              |
| `/pagamentos`            | Histórico pagamentos       | Card list                                                                                                 |
| `/solicitacoes`          | Histórico solicitações     | BookingStatusBadge · list                                                                                 |
| `/dashboard`             | Dashboard widgets cliente  | DashboardGrid + cards (plan, baskets, finance, schedules, activity, pending, quick-actions, laundry-info) |
| `/bem-vindo`             | Onboarding 1º login        | Button CTAs                                                                                               |

### 3.5 API (sem UI — ignorar no DS visual)

`/api/auth/*` · `/api/webhooks/*` · `/api/cron/*`

---

## 4. Primitivos UI (`src/components/ui/`) — base shadcn

| Componente               | Variantes / notas                                                |
| ------------------------ | ---------------------------------------------------------------- |
| `button`                 | CVA; `buttonVariants` exportado                                  |
| `button-modern`          | primary/secondary/outline/ghost/destructive · sm/md/lg · loading |
| `card`                   | Header/Title/Description/Content/Footer                          |
| `card-modern`            | default/elevated/glass/outline · interactive                     |
| `input`                  | padrão                                                           |
| `input-modern`           | focus indicator · error msg                                      |
| `label`                  | —                                                                |
| `textarea`               | —                                                                |
| `select`                 | —                                                                |
| `checkbox`               | **AUSENTE** (candidato DS)                                       |
| `switch`                 | —                                                                |
| `radio-group`            | —                                                                |
| `dialog`                 | + DialogTrigger/Content/Header/Title                             |
| `dropdown-menu`          | —                                                                |
| `popover`                | —                                                                |
| `command`                | cmdk (search calendar)                                           |
| `table`                  | TableHeader/Body/Row/Cell                                        |
| `badge`                  | —                                                                |
| `avatar`                 | AvatarFallback                                                   |
| `separator`              | —                                                                |
| `sonner`                 | Toaster                                                          |
| `tabs`                   | **AUSENTE** (nav custom)                                         |
| `accordion`              | **AUSENTE** (FAQ custom)                                         |
| `sheet` / `drawer`       | **AUSENTE** (mobile menus custom)                                |
| `skeleton`               | **AUSENTE** (clientes-skeletons custom)                          |
| `alert`                  | **AUSENTE** (`FormErrorAlert` custom)                            |
| `tooltip`                | **AUSENTE**                                                      |
| `calendar` (date picker) | **AUSENTE** (grid próprio)                                       |
| `form` (rhf Form)        | **AUSENTE** (forms manuais)                                      |
| `progress`               | **AUSENTE**                                                      |
| `slider`                 | **AUSENTE**                                                      |

**Deps UI:** `@base-ui/react`, CVA, `clsx`+`tailwind-merge` (`cn`), `cmdk`, `sonner`, `lucide-react`, `framer-motion` (landing/modern), `recharts` (admin chart), `@dnd-kit/*` (dashboard widgets).

---

## 5. Componentes por domínio

### 5.1 Shells / nav / chrome

| Path                                                                                                                              | Papel DS                        |
| --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------- |
| `admin/admin-sidebar` `admin-side-nav` `admin-page-shell` `admin-main-content` `admin-shell-context` `admin-page-actions-context` | App shell admin                 |
| `shared/admin-mobile-nav` `admin-user-menu` `theme-toggle`                                                                        | chrome admin                    |
| `client/client-app-shell` `client-tab-nav` `client-tab-nav-modern`                                                                | App shell cliente + brand color |
| `shared/client-bottom-nav` `client-side-nav`                                                                                      | legado / alt                    |
| `shared/app-banner`                                                                                                               | PWA install + push CTA          |
| `shared/nav-back-home` `logout-button` `session-timer` `session-revalidator`                                                      | util chrome                     |
| `admin/admin-banners` `shared/free-tier-banner*` `demo-data-banner-client` `demo-badge`                                           | banners sistema                 |

### 5.2 Auth

| Path                                          | Papel                             |
| --------------------------------------------- | --------------------------------- |
| `auth/laundry-auth-provider` `laundry-picker` | contexto multi-tenant no cadastro |
| `app/(auth)/entrar/*-form.tsx`                | forms colocalizados               |

### 5.3 Landing

| Path                                 | Papel                           |
| ------------------------------------ | ------------------------------- |
| `landing/landing-page` `faq` `types` | router de tema + FAQ SaaS       |
| `landing/themes/vitrine/*`           | header hero plans sections      |
| `landing/themes/folha/*`             | nav lateral hero plans sections |

**Blocos tipados:** hero, how-it-works, plans grid/list, FAQ, CTA WhatsApp, footer. Props: `LandingProps` (`types.ts`).

### 5.4 Calendário / agenda (composite crítico)

| Path                                                                              | Papel                              |
| --------------------------------------------------------------------------------- | ---------------------------------- |
| `calendar/CalendarGrid`                                                           | mês · pills por status · cores hex |
| `calendar/CalendarClient` `AdminCalendarClient`                                   | orquestração                       |
| `calendar/CalendarSidebar` `CalendarDayPanel` `CalendarDayModern` `AdminDayPanel` | painel do dia                      |
| `calendar/CalendarSearchBar`                                                      | Command+Popover search             |
| `calendar/StatusBadges` `PendingBadge`                                            | contadores status                  |
| `calendar/RejectScheduleModal` `RecurringSetupModal` `InsufficientBasketsModal`   | dialogs                            |
| `client/client-schedule-calendar`                                                 | wrapper cliente                    |

**Estados agenda (schedule):** `pending` `accepted` `rejected` `rescheduled` `confirmed` `pickup_quantified` `completed` `cancelled`  
**Pills grid:** `pending` `confirmed` `in_progress` `completed` `cancelled` `rejected` `ghost`  
**Workflow lavagem:** `scheduled` `in_washing` `delivered`

### 5.5 Admin features

| Path                                                                       | Papel                                  |
| -------------------------------------------------------------------------- | -------------------------------------- |
| `dashboard-*` `sortable-widget`                                            | home admin                             |
| `clientes-*`                                                               | search/filter/stats/sections/skeletons |
| `pagamentos-shell` `pagamentos-filters` `monthly-revenue-chart`            | finanças                               |
| `export-button`                                                            | CSV                                    |
| `client-faq-editor` `faq-answer-editor`                                    | FAQ CRUD                               |
| `addon-packages-manager`                                                   | CRUD addons                            |
| `payment-recipient-section`                                                | KYC bancário                           |
| `up-business-plan-section` `laundry-client-share-card` `test-data-section` | SaaS / ops                             |

### 5.6 Cliente dashboard cards

`dashboard-card` `dashboard-grid` + `plan-card` `baskets-card` `finance-card` `schedules-card` `activity-card` `pending-card` `quick-actions-card` `laundry-info-card` · `plan-promo-balloon` · `purchase-extra-cycles`

### 5.7 Shared forms / payments / schedule actions

| Path                                                                                                                               | Papel                 |
| ---------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| `plan-form` `profile-form` `address-form` `laundry-address-form` `service-area-form` `appearance-form`                             | forms config          |
| `laundry-logo-upload`                                                                                                              | upload                |
| `checkout-flow` `card-payment-form` `saved-cards-list` `update-card-dialog`                                                        | Stripe UI             |
| `billing-action-button`                                                                                                            | SaaS checkout/portal  |
| `cancel-subscription-button` `change-plan-button` `toggle-plan-button` `plan-discount-button` `confirm-prepaid-form`               | planos                |
| `plan-price-display` `freight-estimate-banner` `freight-policy-note`                                                               | pricing/frete         |
| `schedule-actions` `schedule-admin-actions` `schedule-workflow-actions` `add-schedule-form` `edit-baskets-dialog` `booking-dialog` | agenda actions        |
| `booking-status-badge`                                                                                                             | status booking legado |
| `form-error-alert` `faq-answer-preview` `push-provider`                                                                            | misc                  |

### 5.8 Onboarding

`onboarding/owner-wizard` — multi-step signup dono.

---

## 6. Padrões de layout & densidade

| Contexto        | Padrão                                                                             |
| --------------- | ---------------------------------------------------------------------------------- |
| Admin desktop   | Sidebar fixa + main com page shell (title/subtitle/accent gradient) + actions slot |
| Admin mobile    | Bottom/top mobile nav; planos viram **cards empilhados** (não table)               |
| Cliente desktop | Rail esquerda tintada por `primary` (brand lavanderia)                             |
| Cliente mobile  | Bottom nav 4 ícones + safe-area                                                    |
| Auth            | Card centralizado, fundo muted                                                     |
| Landing Vitrine | Nav top · hero visual · grid planos                                                |
| Landing Folha   | Nav lateral · tipografia display · lista planos                                    |
| Forms           | Label+Input stack; Switch/Radio; Dialog confirm destrutivo                         |
| Feedback        | `sonner` toasts; FormErrorAlert; Badge status                                      |
| Empty/loading   | skeletons custom (clientes); poucas empties padronizadas                           |

**Breakpoints usados:** `md:` (shell cliente/admin), safe-area iOS.

---

## 7. Matriz: página → composição (resumo)

```
Landing SaaS `/`
  Hero + FeatureCards + PricingCards + FAQ(accordion-like) + CTA

Landing tenant `/[slug]`
  Theme(Vitrine|Folha){ Nav, Hero, HowItWorks, Plans, FAQ, WhatsAppCTA }

Auth
  Card{ Logo?, Title, Form{Field*}, Submit, Links }

Admin shell
  Sidebar | MobileNav + Banners + PageShell{ Header, Actions, Children }

Admin dashboard
  WidgetGrid(dnd){ StatWidget | ListWidget | ChartWidget }

Admin planos
  Toolbar + (Table | MobileCards) + PlanForm(Dialog/Page)

Admin clientes
  Toolbar(Search+Filters) + StatsRow + Sections(Assinantes, Coletas)

Admin agenda
  CalendarLayout{ Grid, Sidebar/DayPanel, Modals(Reject|Recurring|Insufficient) }

Admin pagamentos
  Filters + Chart + PaymentList + Export

Admin config
  SectionStack{ Share, Branding, Address, ServiceArea, FAQ, Recipient, Addons, Billing }

Cliente shell
  Rail|BottomNav + AppBanner + Main

Cliente coleta
  Calendar + DayList + ScheduleActions + StatusBadge

Cliente planos/checkout
  PlanCards + CheckoutFlow{ ProfileGate?, CardForm | SavedCards }

Cliente perfil/ajuda/meu-plano
  FormSections | FAQList | PlanSummaryCards
```

---

## 8. Gaps & dívida visual (prioridade p/ DS)

1. **Duplicação:** `button`/`button-modern`, `card`/`card-modern`, `input`/`input-modern` — unificar ou versionar (`variant="modern"`).
2. **Cores hardcoded** em CalendarGrid, StatusBadges, BookingStatusBadge, WORKFLOW_COLORS — tokenizar.
3. **Primitivos faltando** (ver §4): Tabs, Accordion, Sheet, Skeleton, Alert, Tooltip, Checkbox, CalendarPicker.
4. **Nav custom** em vez de Tabs/Sheet — extrair `AppSidebar`, `BottomTabBar`, `PageHeader` como padrões DS.
5. **Themes landing** com hex/font fora do sistema shadcn — DS precisa de **ThemeProvider** + CSS vars por preset.
6. **Charts** (recharts) e **dnd widgets** — opcionais na lib (`@ds/charts`, `@ds/dashboard`).
7. **Stripe Elements** — fora do DS (wrapper visual só).
8. README/manifest ainda “Leva e Lava” / `cesto-temp` — irrelevante p/ lib, mas brand tokens devem ser neutros.

---

## 9. Pacotes sugeridos da lib (para a IA implementadora)

```
@org/ds
  /tokens          theme.css (shadcn + status + surface)
  /primitives      button, input, card, badge, dialog, … (+ faltantes)
  /patterns        PageHeader, AppSidebar, BottomTabBar, EmptyState, FormField, StatusBadge, Banner
  /composites      CalendarMonth, DayPanel, PlanCard, PricingTable, CheckoutLayout, FAQ, WizardSteps
  /themes          presets: indigo (SaaS), vitrine, folha + runtime brand override
```

**API theming (alvo):**

```css
/* consumer globals.css */
@import "@org/ds/tokens";
:root {
  --primary: oklch(...);
  --brand: var(--primary);
}
[data-brand] {
  --primary: var(--brand);
}
```

**Install:** CLI tipo shadcn (`npx @org/ds add calendar-month`) **ou** `import { Button } from '@org/ds'`.

---

## 10. Contagem rápida

| Camada                           | Qtd aprox.            |
| -------------------------------- | --------------------- |
| Rotas page.tsx                   | ~45 (incl. redirects) |
| Layouts                          | 6+                    |
| `components/ui`                  | 20 arquivos           |
| `components/admin`               | ~32                   |
| `components/shared`              | ~45                   |
| `components/calendar`            | 13                    |
| `components/client` (+dashboard) | ~15                   |
| `components/landing`             | ~12                   |
| Auth/onboarding                  | ~4                    |

---

## 11. Arquivos de referência obrigatória

Ler nesta ordem ao implementar a lib:

1. `components.json`
2. `src/app/globals.css` + `src/styles/*.css`
3. `src/lib/admin-nav.ts` · `src/lib/laundry-themes.ts` · `src/lib/schedule-workflow.ts`
4. Shells: `admin/layout.tsx` · `client/client-app-shell.tsx`
5. Calendário: `CalendarGrid.tsx` · `StatusBadges.tsx`
6. Landing: `landing/types.ts` + um tema completo (`vitrine` ou `folha`)
7. Forms canônicos: `plan-form.tsx` · `profile-form.tsx` · `checkout-flow.tsx`

---

_Documento gerado para bootstrap do Design System. Não inclui API/backend. Atualizar se rotas/componentes mudarem._
