import { FiCoffee, FiPenTool, FiCalendar } from 'react-icons/fi';
import { Tag } from '~/components/Tag';

interface PostHeaderProps {
  title: string;
  date: Date;
  description: string;
  author: string;
  coverImage: string;
  read: string;
  tags: string[];
}

export const PostHeader: React.FunctionComponent<PostHeaderProps> = (props) => {
  return (
    <header>
      <h1 className="font-blog desktop:text-5xl">{props.title}</h1>
      <p className="text-md flex flex-wrap items-center gap-2 leading-none ">
        <span className="flex items-center gap-1">
          <FiPenTool className="text-coral" />
          {props.author}
        </span>
        •
        <span className="flex items-center gap-1">
          <FiCalendar className="text-coral" />
          Publié le {props.date.toLocaleDateString('fr')}
        </span>
        •
        <span className="flex items-center gap-1">
          <FiCoffee className="text-coral" /> {props.read}
        </span>
      </p>
      <ul className="not-prose flex list-none gap-1 p-0">
        {props.tags.map((tag: string) => (
          <li key={tag}>
            <Tag>{tag}</Tag>
          </li>
        ))}
      </ul>
      <img src={props.coverImage} alt="" className="rounded-lg shadow-md" />
      <hr />
    </header>
  );
};
