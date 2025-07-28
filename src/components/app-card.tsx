import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { truncateText } from "@/lib/utilities"

interface contentProps {
  content: any
}

const CardApp: React.FC<contentProps> = ({ content }) => {
  const LIMIT_DESCRIPTIONS = 120;
  

  return (
    <Card className="w-[280px]">
      <CardHeader>
        <CardTitle className="pb-3">{content?.title}</CardTitle>
        <CardDescription>{truncateText(content?.content, LIMIT_DESCRIPTIONS)}</CardDescription>
      </CardHeader>
      <CardFooter>
        <a href={`/projects/${content.title}`}>
            <Button className="w-full">
              See More
            </Button>
        </a>
      </CardFooter>
    </Card>
  )
}
export default CardApp