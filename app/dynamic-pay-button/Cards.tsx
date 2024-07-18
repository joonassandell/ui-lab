import { Card } from './Card';
import { CARDS, type CardsProps } from './';
import { cn, move } from '@/lib/utils';
import { useEffect, useState } from 'react';

export const Cards = ({
  ccv,
  setCcv,
  setSwitchCard,
  switchCard,
}: CardsProps) => {
  const [cards, setCards] = useState(CARDS);
  const resetCards = () => {
    setCards(move(cards, 0, cards.length));
    setCcv('');
  };

  useEffect(() => {
    if (!switchCard) return;
    resetCards();
    setSwitchCard(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [switchCard, setSwitchCard]);

  return (
    <div className={cn('relative h-52')}>
      {cards.map(({ id, variant }, index) => {
        return (
          <Card
            ccv={ccv}
            index={index}
            key={id}
            onDragEnd={() => resetCards()}
            setCcv={setCcv}
            variant={variant}
          />
        );
      })}
    </div>
  );
};
