interface CardProps {
  id: string
  content: string
  color: string
}

export default function Card(props: CardProps){
  const { content } = props
  return <div>
    <p>{content}</p>
  </div>
}
