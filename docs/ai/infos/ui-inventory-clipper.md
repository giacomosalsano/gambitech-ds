# Clipper — Inventário UI/UX para Design System

> **Audiência:** IA que vai criar uma lib de Design System (DS) baseada em shadcn, instalável por componente ou pacote completo, themable via arquivo de tokens/CSS (padrão shadcn: CSS variables).
>
> **Data do inventário:** 2026-07-18  
> **App:** Clipper (Next.js 16 App Router, React 19, Tailwind v4)  
> **Estado atual da UI:** placeholder HTML cru. **Zero** componentes shadcn. `globals.css` = só `@import "tailwindcss"`. 1 client component (`PushPermissionPrompt`, renderiza `null`).

---

## 0. Contrato para a lib DS

### Requisitos da lib

- Base: **shadcn/ui** (Radix + Tailwind + CVA).
- Instalação: CLI estilo shadcn **ou** pacote npm completo.
- Temas: lê tokens CSS (`--background`, `--foreground`, `--primary`, …) do projeto consumidor; troca de marca = editar tokens, não componentes.
- Exportar: primitivos + compostos de domínio **genéricos** (não amarrar a “barbearia”; ver ADR-0002). Nomes neutros: `Establishment`, `Collaborator`, `Service`, `Appointment`.
- Locale default dos exemplos: **pt-BR** (moeda BRL, datas `pt-BR`).
- Mobile-first / PWA (`standalone`). Densidade confortável em touch.

### O que a lib NÃO deve fazer

- Não embutir Server Actions, Drizzle, Better Auth, `payments-service`.
- Não hardcodar cores hex nos componentes (só tokens).
- Não usar termos `barber`/`barbershop` em APIs de componente.

### Tokens mínimos (alinhar shadcn)

`background`, `foreground`, `card`, `popover`, `primary`, `secondary`, `muted`, `accent`, `destructive`, `border`, `input`, `ring`, `radius`, chart (opcional).  
Plus Clipper: `success`, `warning`, `info` (status de assinatura/pedido).

---

## 1. Audiências e shells

| Audience              | Route group              | Auth                                      | Shell UI necessária                                                    |
| --------------------- | ------------------------ | ----------------------------------------- | ---------------------------------------------------------------------- |
| Público / vitrine     | `(public)`               | Não                                       | Header mínimo (logo estabelecimento ou “Clipper”), sem nav autenticada |
| Auth                  | `(auth)` **inexistente** | Guest                                     | Layout centrado, sem sidebar                                           |
| Cliente               | `(client)`               | Sessão + `clients`                        | Bottom nav ou header simples                                           |
| Colaborador           | `(collaborator)`         | `establishment_members.role=collaborator` | App shell + nav + `PushPermissionPrompt`                               |
| Admin estabelecimento | `(establishment)`        | `role=admin`                              | App shell + sidebar/nav densa + push                                   |
| Super-admin           | `(super-admin)`          | `platform_admins`                         | App shell plataforma + push                                            |

**Cross-cutting (spec MVP, não implementado):** seletor de contexto multi-vínculo (“vendo como: Estabelecimento X — admin”). Componente DS: `ContextSwitcher`.

---

## 2. Rotas implementadas (código real)

Legenda status UI: `stub` = quase vazio | `minimal` = HTML funcional | `gap` = backend existe, página não.

### 2.1 Públicas

| Rota                     | Arquivo                            | UI hoje               | Blocos / estados                                                                                          | DS needed                                                                          |
| ------------------------ | ---------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| `/`                      | `app/page.tsx`                     | stub: texto “Clipper” | Landing / redirect pós-login                                                                              | `Page`, `Button`, marketing hero opcional                                          |
| `/[slug]`                | `(public)/[slug]/page.tsx`         | minimal               | H1 nome; listas Serviços / Produtos / Planos; preço BRL; badge “esgotado”; link Assinar                   | `CatalogList`, `Price`, `Badge`, `EmptyState`, `Button`/`Link`                     |
| `/[slug]/plans/[planId]` | `.../plans/[planId]/page.tsx`      | minimal               | Resumo plano + itens; `?error=`; form `cardToken` + submit                                                | `Alert`, `FormField`, `Input`, `Button`, `PlanSummary`                             |
| `/review/[token]`        | `(public)/review/[token]/page.tsx` | minimal               | 4 estados: `not_found` \| `expired` \| `already_responded` \| `pending` (form rating 1–5 + comment ≤1000) | `EmptyState`/`StatusMessage`, `RatingInput` (stars), `Textarea`, `Alert`, `Button` |

### 2.2 Cliente

| Rota             | Arquivo                           | UI hoje | Blocos                                                                                                                   | DS needed                                                           |
| ---------------- | --------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| `/subscriptions` | `(client)/subscriptions/page.tsx` | minimal | Lista assinaturas; status label; créditos restantes; renovação; cancel (destructive confirm implícito); empty; `?error=` | `StatusBadge`, `CreditList`, `ConfirmDialog`, `Alert`, `EmptyState` |

### 2.3 Colaborador

| Rota         | Arquivo                             | UI hoje | Blocos                                                                                                                            | DS needed                             |
| ------------ | ----------------------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| `/dashboard` | `(collaborator)/dashboard/page.tsx` | minimal | Filtro mês (6 opções) + range datas (GET); 4 metric cards: faturamento, atendimentos, horas, nota média (null → “Sem avaliações”) | `PeriodFilter`, `MetricCard`, `Alert` |

Layout: `PushPermissionPrompt` (invisível). DS: opcional `PushOptInBanner` se quiser UI explícita.

### 2.4 Admin estabelecimento

| Rota              | Arquivo                                   | UI hoje | Blocos                                                                                           | DS needed                                                                        |
| ----------------- | ----------------------------------------- | ------- | ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------- |
| `/team-dashboard` | `(establishment)/team-dashboard/page.tsx` | minimal | Mesmos filtros; lista por colaborador × 4 métricas; empty equipe                                 | `PeriodFilter`, `MetricCard`, `PersonHeader`                                     |
| `/client-plans`   | `(establishment)/client-plans/page.tsx`   | minimal | Lista planos (+ inativo); desativar; form criar (nome, preço centavos, até 5 linhas serviço×qtd) | `DataList`, `CrudForm`, `Fieldset`, `Select`, `InputNumber`, `DestructiveAction` |

### 2.5 Super-admin

| Rota                  | Arquivo                                     | UI hoje | Blocos                                         | DS needed                               |
| --------------------- | ------------------------------------------- | ------- | ---------------------------------------------- | --------------------------------------- |
| `/platform-dashboard` | `(super-admin)/platform-dashboard/page.tsx` | stub H1 | Futuro: lista establishments, métricas globais | `DataTable`, `MetricCard`, `PageHeader` |

### 2.6 APIs (sem UI)

`/api/auth/[...all]`, `/api/cron/payout-reports`, `/api/webhooks/payments-service`, `manifest`, SW.

---

## 3. Rotas / páginas ausentes (backend pronto → UI gap)

Actions existem em `src/actions/*`; **nenhuma página** abaixo existe. Prioridade P0 = MVP usável.

| Prioridade | Página sugerida                                    | Audience                      | Actions / dados                           | UI principal                                    |
| ---------- | -------------------------------------------------- | ----------------------------- | ----------------------------------------- | ----------------------------------------------- |
| P0         | `/login`, `/signup` (ou `/auth/*`)                 | auth                          | Better Auth client                        | `AuthForm` (email/senha), links cruzados        |
| P0         | `/signup/establishment`                            | auth                          | `createEstablishment`                     | Form: nome, type enum, slug preview             |
| P0         | `/[slug]/book` ou wizard agendamento               | public/client                 | `createAppointment`                       | Stepper: serviço → colaborador → slot → confirm |
| P0         | Agenda colaborador `/agenda`                       | collaborator                  | appointments (list TBD; create existe)    | `Calendar`/`DayTimeline`, status chips          |
| P0         | Agenda admin `/appointments`                       | establishment                 | idem + complete                           | Timeline + actions                              |
| P0         | Concluir atendimento `/appointments/[id]/complete` | collab/admin                  | `completeAppointmentWithItems`            | Multi-item form, preço, walk-in, débito plano   |
| P0         | Serviços `/services`                               | establishment                 | CRUD `services`                           | `DataTable` + `Sheet`/`Dialog` form             |
| P0         | Colaboradores `/collaborators`                     | establishment                 | `inviteCollaborator`, `listCollaborators` | Invite form (email/nome/senha), lista           |
| P0         | Regras comissão `/commission-rules`                | establishment                 | CRUD + `replicate…`                       | Matrix serviço×collab; replicate CTA            |
| P0         | Repasses `/payout-reports`                         | establishment (+ collab read) | `listPayoutReports`, `mark…Paid`          | Table período/valor/status; mark paid confirm   |
| P0         | Produtos `/products`                               | establishment                 | CRUD `products`                           | Form c/ estoque + comissão produto              |
| P0         | Vitrine produto → carrinho → checkout              | client                        | `checkout`, `listProducts`                | `Cart`, `CheckoutForm` (doc, card), stock badge |
| P0         | Onboarding pagamento `/settings/payments`          | establishment                 | `startPaymentOnboarding`                  | Status recipient + CTA                          |
| P1         | Walk-in venda `/transactions/new`                  | collab/admin                  | `createTransactionWithItems`              | Mesmo form multi-item sem appointment           |
| P1         | Perfil cliente `/me`                               | client                        | clients.document                          | Form documento (pré-checkout)                   |
| P1         | Settings estabelecimento                           | establishment                 | slug, payoutCycleStartDay                 | Form settings                                   |
| P1         | Lista establishments                               | super-admin                   | —                                         | Table + filtros                                 |
| P2         | Lista espera horário                               | client/public                 | (fase futura)                             | Waitlist form + notify UI                       |
| P2         | Preferências notificação                           | all auth                      | push subscribe/unsub                      | Toggle push                                     |
| P2         | Fiscal / NF                                        | establishment                 | (fase 4c)                                 | Placeholder                                     |
| P2         | Landing marketing `/`                              | public                        | —                                         | Brand hero                                      |

---

## 4. Padrões de interação observados (replicar no DS)

| Padrão                | Como está                                           | Componente DS                                                             |
| --------------------- | --------------------------------------------------- | ------------------------------------------------------------------------- |
| Erro de Server Action | `?error=` em `searchParams` + texto vermelho        | `Alert variant=destructive` + helper `ActionResultBanner`                 |
| Sucesso leve          | redirect limpo ou `?subscribed=1` (quase não usado) | `Alert variant=success` / toast                                           |
| Forms                 | Server Actions inline + native inputs               | `Form` + RHF/Zod opcional nos docs; primitivo `Input`/`Select`/`Textarea` |
| Listas                | `<ul>` + `border-b`                                 | `List` / `Card` rows                                                      |
| Dinheiro              | `priceCents/100` → `pt-BR` BRL                      | `Money` (`cents: number`)                                                 |
| Duração               | `Nh Mmin`                                           | `Duration`                                                                |
| Empty                 | parágrafo cinza                                     | `EmptyState` (icon + title + CTA)                                         |
| Destructive           | link underline vermelho (cancel/desativar)          | `Button variant=destructive` + `AlertDialog`                              |
| Status enum           | map string→label PT                                 | `StatusBadge` com mapa tipado                                             |
| Period filter         | 2 forms GET (mês \| range)                          | `PeriodFilter` composto                                                   |
| Metrics               | grid 1→4 cards `border`                             | `MetricCard`                                                              |
| Push                  | silent permission                                   | `PushOptInBanner` (opcional UI)                                           |
| Rating                | `<select>1-5`                                       | `RatingInput` stars (spec pede rádio/estrelas)                            |
| Auth gate             | `redirect("/")`                                     | layouts DS + `Unauthorized` page                                          |

---

## 5. Catálogo de componentes DS (checklist)

### 5.1 Primitivos shadcn (instalar/adaptar)

`Button`, `Input`, `Textarea`, `Select`, `Checkbox`, `RadioGroup`, `Label`, `Form`, `Card`, `Badge`, `Alert`, `Dialog`, `AlertDialog`, `Sheet`, `DropdownMenu`, `Popover`, `Tooltip`, `Tabs`, `Table`, `Separator`, `Skeleton`, `Toast`/`Sonner`, `Avatar`, `Switch`, `Calendar`, `Command` (combobox), `ScrollArea`, `Progress`, `Sidebar`, `NavigationMenu`, `Breadcrumb`, `Pagination`.

### 5.2 Compostos de produto (priorizar)

1. `AppShell` — sidebar/topnav + content + mobile drawer
2. `PageHeader` — title + description + actions
3. `PeriodFilter` — month select + date range
4. `MetricCard` — label + value + empty
5. `Money` / `Duration`
6. `StatusBadge` — appointment | order | subscription | payout | recipient
7. `EmptyState`
8. `ConfirmDialog`
9. `DataList` / `EntityRow` — nome + meta + preço + actions
10. `CrudFormLayout`
11. `CatalogSection` — vitrine serviços/produtos/planos
12. `PlanSummary` + `CreditList`
13. `RatingInput`
14. `AuthCard` — login/signup wrapper
15. `Stepper` — booking wizard
16. `DayTimeline` / `AppointmentCard` — agenda
17. `CartSummary` + `CheckoutForm`
18. `CommissionMatrix` — grid regras
19. `PayoutTable`
20. `ContextSwitcher` — multi-membership
21. `PushOptInBanner`
22. `StockBadge` — disponível / esgotado

### 5.3 Mapas de status (labels pt-BR)

**Appointment:** `pending` Pendente | `confirmed` Confirmado | `completed` Concluído | `cancelled` Cancelado | `no_show` Não compareceu

**Subscription:** `pending` Pendente | `active` Ativa | `past_due` Pagamento atrasado | `cancelled` Cancelada

**Order:** `pending` | `paid` | `failed` (inferido do schema)

**Payout:** `pending` | `paid`

**Payment recipient:** `active` + demais do payments-service (validar `isValidRecipientStatus`)

---

## 6. Wireframes lógicos por fluxo crítico

### A. Booking (público/cliente)

`/[slug]` → escolher serviço → colaborador → data/hora → login se necessário → confirm → push collab/admin.

### B. Complete appointment (collab)

Agenda → item → form itens (serviço, preço cobrado, collab) → submit `completeAppointmentWithItems` → opcional push review ao cliente.

### C. E-commerce

`/[slug]` produtos → add cart → `/checkout` (auth + document) → charge → status pending/paid/failed.

### D. Assinatura

`/[slug]` plano → `/[slug]/plans/[id]` → card token → `/subscriptions`.

### E. Admin setup sequence

Signup establishment → services → collaborators → commission rules → payment onboarding → products/plans → go-live vitrine.

---

## 7. Constraints de domínio (DS deve respeitar)

- Multi-tenant: UI nunca mostra dados sem contexto de establishment (exceto super-admin / vitrine por slug).
- Papel por vínculo (ADR-0004): mesma conta, shells diferentes; `ContextSwitcher` obrigatório no desenho.
- Sessão única Better Auth (ADR-0007).
- Preços sempre **centavos** na API; display BRL na UI.
- Walk-in: `clientId` nullable em transactions; UI de conclusão deve permitir “sem cliente”.
- Checkout produto: cliente autenticado obrigatório (ADR-0011); estoque sem backorder (ADR-0010).
- PWA: safe-areas, touch targets ≥44px, theme_color tokenizável (`manifest` hoje `#000`/`#fff`).

---

## 8. Inventário de arquivos UI atuais

```
src/app/layout.tsx                          root + SerwistProvider
src/app/globals.css                         vazio (só Tailwind)
src/app/page.tsx                            stub home
src/app/manifest.ts                         PWA
src/app/(public)/[slug]/page.tsx            vitrine
src/app/(public)/[slug]/plans/[planId]/…    assinar plano
src/app/(public)/review/[token]/page.tsx    avaliação
src/app/(client)/subscriptions/page.tsx
src/app/(collaborator)/layout.tsx + dashboard/page.tsx
src/app/(establishment)/layout.tsx + team-dashboard + client-plans
src/app/(super-admin)/layout.tsx + platform-dashboard
src/components/push-permission-prompt.tsx   client, UI null
```

Não existe: `components/ui/*`, `(auth)/*`, páginas de CRUD listadas na §3.

---

## 9. Entregáveis esperados da lib (para a outra IA)

1. Repo/pacote DS com tokens CSS + tema default Clipper (neutro, não purple-default).
2. Storybook ou docs MDX por componente (§5).
3. CLI ou guia: `add button` / `add all` + hook que sincroniza tokens do `globals.css` do consumer.
4. Pacote “composites” Clipper-ready (§5.2) desacoplados de data fetching.
5. Checklist de cobertura: cada rota §2 e §3 mapeada a ≥1 story de página (page recipe), mesmo sem dados reais (mock props).

---

## 10. Prioridade de implementação UI no Clipper (após DS)

1. Tokens + AppShell + Auth
2. Vitrine + Booking + Review
3. CRUD establishment (services, collaborators, commission, products)
4. Agenda + complete appointment + payouts
5. Cart/checkout + payment onboarding
6. Polish dashboards + ContextSwitcher + Push banner
7. Super-admin + fases push restantes

Fim do inventário.
`)
