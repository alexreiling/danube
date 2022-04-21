export type Quiz = {
  question: string;
  options: string[];
  valid: number[];
}[];
export const POINTS_PER_QUESTION = 4;
export const QUIZ: Quiz = [
  {
    question: "Wo ist die Belastung durch Plastik am größten?",
    options: ["Meer", "Böden", "Binnengewässern"],
    valid: [1, 2],
  },
  {
    question: "Wofür wird das meiste Plastik gebraucht?",
    options: ["Bausektor/ Baustellen", "Verpackungen", "Textilien/Kleidung"],
    valid: [1],
  },
  {
    question: "Wie viel Plastik wird pro Jahr produziert?",
    options: ["900.000.000 Tonnen", "200.000.000 Tonnen", "400.000.000 Tonnen"],
    valid: [0, 1],
  },
  {
    question: "Wie viel Plastik wird wirklich recycelt?",
    options: ["9%", "12%", "21%"],
    valid: [1],
  },
  {
    question: "Wie gelangt Mikroplastik in Gewässer?",
    options: [
      "Plastikflaschen werden im Flussbett zerrieben und dadurch zu Mikroplastik",
      "Durch den Abrieb von Bootslacken und Fischernetzen",
      "Durch Abwasser aus Kläranlagen, dass in Flüsse abgeleitet wird",
    ],
    valid: [0, 1, 2],
  },
  {
    question: "Wie viel Prozent macht Mikroplastik vom Plastikmüll aus?",
    options: ["45%", "60%", "75%"],
    valid: [2],
  },
  {
    question: "Wie kommt das meiste Mikroplastik in die Flüsse und Meere?",
    options: [
      "Durch Plastikmüll, der in die Flüsse oder Meere fliegt",
      "Durch den Abrieb von Reifen auf der Straße",
      "Durch das Wäschewaschen",
    ],
    valid: [1],
  },
  {
    question: "Wie kommt Mikroplastik in unseren Körper?",
    options: [
      "Durch Lebensmittel/ Nahrung/ Essen",
      "Durch Kosmetikprodukte",
      "Durch die Luft",
    ],
    valid: [0, 2],
  },
  {
    question:
      "Was bedingt die Freigabe von Treibhausgasen von Mikroplastik im Meer? Was führt dazu, dass Mikroplastik Treibhausgase produziert? ",
    options: ["Wellen / Strömung", "Sonnenstrahlen/ UV-Licht", "Salzwasser"],
    valid: [1, 2],
  },
];
