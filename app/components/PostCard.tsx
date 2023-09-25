import { FiPenTool, FiCalendar } from 'react-icons/fi';
import { clsx } from 'clsx';
import { Tag } from '~/components/Tag';

interface PostCardProps {
  title: string;
  date: string;
  description: string;
  author: string;
  coverImage: string;
  read: string;
  tags: string[];
  isHightlighted?: boolean;
}

export const PostCard: React.FunctionComponent<PostCardProps> = (props) => {
  return (
    <div>
      <div
        className={clsx(
          'overflow-hidden',
          props.isHightlighted ? 'desktop:h-[420px]' : 'h-[200px]',
        )}
      >
        <img
          src={props.coverImage}
          alt=""
          className="object-cover transition-transform duration-150 group-hover:rotate-1 group-hover:scale-110"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-2 p-4 ">
        <p className="mb-2 font-blog text-3xl font-bold transition-colors duration-150 group-hover:text-coral">
          {props.title}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <FiPenTool />
          {props.author}
        </p>
        <p className="flex items-center gap-2 text-sm">
          <FiCalendar />
          Publié le {new Date(props.date).toLocaleDateString('fr')}
        </p>
        <ul className="flex gap-1">
          {props.tags.map((tag: string) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>

        {props.description ? (
          <p className="text-sm italic leading-relaxed">{props.description}</p>
        ) : null}
      </div>
    </div>
  );
};
