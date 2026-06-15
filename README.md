# IQ Dojo

A polished, mobile-first crypto-native learning game powered by IQ.wiki. It includes a fully clickable, local-state Base App simulator that demonstrates the future account, holder unlock, badge claim, Builder Code, and sponsor experience.

**Path:** Onchain Survival  
**Tagline:** Train your onchain instincts. Don’t get drained, rugged, liquidated, or farmed.

## Run locally

Requires Node.js 20+.

```bash
npm install
npm run dev
```

Production check:

```bash
npm run build
npm run preview
```

## GitHub Pages deployment

This project is configured for `https://vzbrv.github.io/iq-dojo/`.

1. Create a public GitHub repository named `iq-dojo`.
2. Upload this project and commit it to `main`.
3. In GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to **GitHub Actions**.
5. The workflow at `.github/workflows/deploy.yml` builds and deploys on every push to `main`.
6. Open `https://vzbrv.github.io/iq-dojo/` after the workflow completes.

If the repository name changes, update `base` in `vite.config.ts` to `"/new-repo-name/"`.

## What is real

- Complete 10-question lesson, instant feedback, XP, streak, score tiers, mistake review, and replay
- Functional mobile-first interface with no dead CTAs
- Static Vite/React/TypeScript/Tailwind app and GitHub Pages workflow
- Local analytics event logging

## What is simulated

- No account, backend, database, or persistent progress
- **Connect Base Account** simulates address `0xIQ...Dojo`, network Base, and a `2,500 IQ` balance
- The simulated balance unlocks IQ-holder features above the `1,000 IQ` threshold
- Badge claim runs visible preparing, Builder Code attribution, minting, and completion stages
- Builder Code `iqdojo_demo` and Base.dev attribution are simulated locally
- Reset account, reset claim, practice again, and mistake review work without refreshing
- Analytics logs events to the browser console
- IQ.wiki links currently use the IQ.wiki homepage

## What this proves

- A Base-native distribution flow can make IQ.wiki knowledge interactive
- IQ holdings can gate richer learning features
- A completed lesson can lead into an attributed badge transaction
- Sponsored protocol paths can remain educational and measurable

## What this does not prove yet

- Real Base Account connection or wallet compatibility
- Real IQ balance reads, contracts, badge minting, or Builder Code attribution
- Base App registration, analytics attribution, persistence, or production security

## Next technical phase

- Add wagmi, viem, TanStack Query, and Base Account
- Connect wallets only for badge claim and IQ holder unlocks
- Implement IQ balance lookup
- Deploy and test the badge contract on Base Sepolia, then Base mainnet
- Register the app on Base.dev and add Builder Code attribution
- Test inside Base App and verify attributed transactions
- Replace console analytics with production analytics

See `src/lib/baseIntegration.todo.ts`, `src/lib/iqUnlocks.ts`, and `src/lib/badge.ts`.

## Manual GitHub Upload Instructions

1. Create a new public GitHub repo named `iq-dojo`.
2. Upload all generated files to the repo.
3. Go to **Settings → Pages**.
4. Set **Source** to **GitHub Actions**.
5. Push or commit to `main`.
6. Wait for the deploy workflow.
7. Open `https://vzbrv.github.io/iq-dojo/`.
