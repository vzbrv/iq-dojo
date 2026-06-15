export type Difficulty = "medium" | "hard" | "degen";

export interface Question {
  id: string;
  title: string;
  scenario: string;
  answers: { id: string; text: string }[];
  correctAnswerId: string;
  explanation: string;
  iqWikiLinks: { label: string; url: string }[];
  difficulty: Difficulty;
  xpReward: number;
}

const wiki = [{ label: "Read more on IQ.wiki", url: "https://iq.wiki/" }];

export const onchainSurvivalQuestions: Question[] = [
  {
    id: "fake-claim", title: "Free mint, expensive lesson",
    scenario: "A verified-looking account replies to a Base protocol post with an “early claimant” link. The domain was registered yesterday.",
    answers: [
      { id: "a", text: "Connect a burner and sign. Worst case, the burner is empty." },
      { id: "b", text: "Find the claim link through the protocol’s official site and compare domains." },
      { id: "c", text: "Wait for someone in the replies to confirm it worked." },
    ],
    correctAnswerId: "b", explanation: "Lookalike accounts and fresh domains are classic drainer distribution. Navigate from a known official source, not replies.", iqWikiLinks: wiki, difficulty: "medium", xpReward: 80,
  },
  {
    id: "infinite-approval", title: "Unlimited means unlimited",
    scenario: "A new swap UI asks for unlimited USDC approval even though you are swapping $120.",
    answers: [
      { id: "a", text: "Approve exactly what the transaction needs." },
      { id: "b", text: "Approve unlimited. It saves gas next time." },
      { id: "c", text: "Approve unlimited, then bookmark the app." },
    ],
    correctAnswerId: "a", explanation: "Unlimited approvals expand the blast radius of a compromised or malicious contract. Scope permissions to the job.", iqWikiLinks: wiki, difficulty: "medium", xpReward: 80,
  },
  {
    id: "suspicious-apy", title: "Four digits, zero questions?",
    scenario: "A new Base farm offers 900% APY. TVL is $180k, emissions are unclear, and most liquidity sits in one wallet.",
    answers: [
      { id: "a", text: "Farm it before APY compresses." },
      { id: "b", text: "Check token emissions, liquidity concentration, audits, and exit depth." },
      { id: "c", text: "APY is high because the team is generous." },
    ],
    correctAnswerId: "b", explanation: "APY is not yield quality. Thin exit liquidity and concentrated ownership can turn rewards into unsellable inventory.", iqWikiLinks: wiki, difficulty: "hard", xpReward: 100,
  },
  {
    id: "stablecoin-depeg", title: "Stable-ish coin",
    scenario: "A yield-bearing stablecoin claims it cannot depeg because every unit is “fully backed,” but redemption takes seven days.",
    answers: [
      { id: "a", text: "Treat liquidity, collateral, redemption, and counterparty risk separately." },
      { id: "b", text: "Fully backed means the peg is guaranteed." },
      { id: "c", text: "Only algorithmic stablecoins can depeg." },
    ],
    correctAnswerId: "a", explanation: "Backing does not guarantee instant liquidity or a market peg. Redemption friction and collateral quality still matter.", iqWikiLinks: wiki, difficulty: "hard", xpReward: 100,
  },
  {
    id: "bridge-risk", title: "The scenic bridge route",
    scenario: "A route saves $4 but sends funds through an unknown intermediary bridge with a brand-new contract.",
    answers: [
      { id: "a", text: "Use it. Routing algorithms know best." },
      { id: "b", text: "Choose the established route and verify the destination contract." },
      { id: "c", text: "Split the transfer across ten transactions." },
    ],
    correctAnswerId: "b", explanation: "A tiny fee saving is poor compensation for adding unreviewed bridge and contract risk.", iqWikiLinks: wiki, difficulty: "medium", xpReward: 80,
  },
  {
    id: "points-trap", title: "Points, vibes, no terms",
    scenario: "A points campaign asks users to loop leveraged deposits. There are no published criteria, caps, or reward commitment.",
    answers: [
      { id: "a", text: "Loop until the leaderboard notices." },
      { id: "b", text: "Price the points at zero and only take risk justified without them." },
      { id: "c", text: "Borrow more because early users always win." },
    ],
    correctAnswerId: "b", explanation: "Uncommitted points are not collateral. If the position only works with imagined rewards, it does not work.", iqWikiLinks: wiki, difficulty: "degen", xpReward: 120,
  },
  {
    id: "liquidation-risk", title: "Health factor: emotionally stable",
    scenario: "Your lending position has a 1.08 health factor after collateral drops 12%. Volatility is rising.",
    answers: [
      { id: "a", text: "Wait for the bounce. Selling now locks in the loss." },
      { id: "b", text: "Reduce debt or add collateral before liquidation gets closer." },
      { id: "c", text: "Borrow more to buy the dip." },
    ],
    correctAnswerId: "b", explanation: "Liquidation does not care about conviction. Restore margin before volatility makes the decision for you.", iqWikiLinks: wiki, difficulty: "hard", xpReward: 100,
  },
  {
    id: "admin-keys", title: "Decentralized, except the admin",
    scenario: "An audited protocol uses upgradeable contracts controlled by a 2-of-3 multisig. Two signers work for the same company.",
    answers: [
      { id: "a", text: "The audit removes admin-key risk." },
      { id: "b", text: "Treat signer concentration and upgrade power as material risk." },
      { id: "c", text: "Upgradeable means bugs cannot survive." },
    ],
    correctAnswerId: "b", explanation: "Audits do not remove governance or key compromise risk. Effective control matters more than signer count.", iqWikiLinks: wiki, difficulty: "degen", xpReward: 120,
  },
  {
    id: "fake-announcement", title: "Breaking: your wallet",
    scenario: "A lookalike handle announces an emergency migration and says withdrawals close in 20 minutes.",
    answers: [
      { id: "a", text: "Act fast. Emergencies require speed." },
      { id: "b", text: "Verify across the official site, known accounts, and community channels." },
      { id: "c", text: "Ask the announcing account for confirmation." },
    ],
    correctAnswerId: "b", explanation: "Urgency is the payload. Verify through independent official channels before signing anything.", iqWikiLinks: wiki, difficulty: "medium", xpReward: 80,
  },
  {
    id: "rug-signs", title: "The founder is the roadmap",
    scenario: "A token has unlocked team allocation, anonymous founders, removable liquidity, and a contract owner who can change fees.",
    answers: [
      { id: "a", text: "Buy small. Four red flags might cancel each other out." },
      { id: "b", text: "Avoid it; ownership and exit controls make the downside asymmetric." },
      { id: "c", text: "Wait for a larger influencer to post it." },
    ],
    correctAnswerId: "b", explanation: "Concentrated control, removable liquidity, and mutable fees create several direct paths to extraction.", iqWikiLinks: wiki, difficulty: "degen", xpReward: 120,
  },
];
