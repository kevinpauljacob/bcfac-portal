import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const units = [
  {
    unitNumber: 1,
    topics: [
      "Introduction to Hash functions",
      "Hashing pointers and immutability",
      "How to achieve immutability using hash pointers?",
      "Symmetric and Asymmetric encryption",
      "Digital Signatures, Public/Private keys",
      "Addresses Elliptic Curve Cryptography and Digital Signatures",
    ],
  },
  {
    unitNumber: 2,
    topics: [
      "History of Bitcoin: Cypherpunk to 2008 Financial crisis",
      "Chronology of key ideas in Bitcoin andCryptoeconomics",
      "A Simple Cryptocurrency",
      "Transactions and transaction-based ledger",
      "Immutable coins for Cryptocurrencies",
      "Blocks and block structure",
      "Storing and spending Bitcoins",
      "Online wallets and exchanges",
      "Securing Bitcoin by splitting and sharing keys",
    ],
  },
  {
    unitNumber: 3,
    topics: [
      "Bitcoin scripting fundamentals",
      "Advanced Bitcoin scripting",
      "Applications of Bitcoin scripts",
      "Bitcoin mining and proof-of-work",
      "Energy consumption: why is Bitcoin mining unsustainable?",
      "Mining pool strategies",
      "Anonymity basics",
      "Deanonymization in cryptocurrencies",
      "Anonymity through mixing altcoins",
    ],
  },
  {
    unitNumber: 4,
    topics: [
      "Trust and consensus in distributed systems",
      "Achieving distributed and decentralized consensus",
      "Voting and federated consensus",
      "Incentives and mining schemes",
      "proof-of-work",
      "proof-of-stake",
      "peer-to-peer networking and Gossip protocol",
      "Double spending attacks",
      "Block security, network attacks, and Goldfinger attack",
    ],
  },
  {
    unitNumber: 5,
    topics: [
      "Cryptocurrencies and their Regulatory and Legal Perspectives",
      "Decentralized Financial Reporting and Compliance, Derivative Markets",
      "Smart Contracts and Life evele of a smart contract",
      "NGOs and Socio-economic development use cases",
      "Blockchain for Social Business and NGO/NPO operations",
      "Identity and User Data Management Use cases",
      "Use cases in Indian Context",
      "Project Description based on Indian Context scenarios.",
    ],
  },
];

export default function AccordionComponent() {
  return (
    <div>
      <h1 className="mt-20 text-xl font-bold">Course Syllabus</h1>
      <Accordion type="single" collapsible className="border-0 p-3">
        {units.map((unit) => (
          <AccordionItem
            key={unit.unitNumber}
            value={`item-${unit.unitNumber}`}
          >
            <AccordionTrigger>{`Unit ${unit.unitNumber}`}</AccordionTrigger>
            <AccordionContent>
              <table className="table-auto w-full">
                <thead>
                  <tr>
                    <th className="border px-4 py-2">Topics</th>
                  </tr>
                </thead>
                <tbody>
                  {unit.topics.map((topic, index) => (
                    <tr key={index}>
                      <td className="border px-4 py-2">{topic}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
