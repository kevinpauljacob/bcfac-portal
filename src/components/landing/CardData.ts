// CardData.ts

export type CardData = {
    id: number;
    title: string;
    description: string;
    link: string;
  };
  
  export const cardData: CardData[] = [
    {
      id: 1,
      title: 'This Course',
      description: 'Demonstrate a solid understanding of the foundational concepts and principles underlying blockchain technology. Compare and contrast the characteristics of different architectures, assess their suitability for specific use cases.',
      link: 'https://example.com/card1.jpg',
    },
    {
      id: 2,
      title: 'Card 2',
      description: 'This is the description for Card 2.',
      link: 'https://example.com/card2.jpg',
    },
    // Add more card objects as needed
  ];
  