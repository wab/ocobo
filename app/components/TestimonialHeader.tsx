import { FiMic, FiClock, FiTag, FiTool } from 'react-icons/fi';
import { AiFillFunnelPlot } from 'react-icons/ai';
import { Tag } from '~/components/Tag';
import type { Testimonial } from '~/utils/parsers';

export const TestimonialHeader: React.FunctionComponent<Testimonial> = (props) => {
  return (
    <header className="pt-6">
      <img src={props.logo} alt="" className="float-right mt-0 w-24 rounded-lg shadow-md" />
      <h1 className="font-blog desktop:text-5xl">{props.title}</h1>
      <strong className="text-md mb-3 flex flex-wrap items-center gap-2 font-bold">
        <FiMic className="text-coral" />
        {props.guest} • {props.position}
      </strong>
      <div className="mb-3 flex items-center gap-2">
        <FiClock className="text-coral" />
        {props.duration}
      </div>
      <div className="mb-3 flex items-center gap-2">
        <AiFillFunnelPlot className="text-coral" />
        <ul className="not-prose m-0 flex list-none gap-1 p-0">
          {props.scope.map((scope, i) => (
            <li key={scope}>
              {scope}
              {i !== props.scope.length - 1 && (
                <span className="ml-1 inline-block text-coral">•</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-3 flex items-center gap-2">
        <FiTool className="text-coral" />
        <ul className="not-prose m-0 flex list-none gap-1 p-0">
          {props.tools.map((tool, i) => (
            <li key={tool}>
              {tool}
              {i !== props.tools.length - 1 && (
                <span className="ml-1 inline-block text-coral">•</span>
              )}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-3 flex items-center gap-2">
        <FiTag className="text-coral" />
        <ul className="not-prose m-0 flex list-none gap-1 p-0">
          {props.tags.map((tag: string) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
      </div>
      <img src={props.coverImage} alt="" className="rounded-lg shadow-md" />
      <hr />
    </header>
  );
};
