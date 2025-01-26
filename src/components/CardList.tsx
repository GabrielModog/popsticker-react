import Card from "./Card";

interface CardListProps {
  list: any[];
}

export default function CardList(props: CardListProps) {
  const { list } = props;
  return (
    <article className="cards-section">
     {list &&
        list.map((item: any) => (
          <Card
            key={item.id}
            content={item.text}
            color={item.color}
            id={item.id}
            selected={item.selected}
          />
        ))}
    </article>
  );
}
