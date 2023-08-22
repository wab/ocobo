import { FiMic, FiClock, FiTag, FiTool } from 'react-icons/fi';
import { AiFillFunnelPlot } from 'react-icons/ai';
import { Tag } from '~/components/Tag';
import type { Testimonial } from '~/utils/parsers';

export const TestimonialHeader: React.FunctionComponent<Testimonial> = (props) => {
  return (
    <header className="pt-6">
      <img src={props.logo} alt="" className="float-right mt-0 w-24 rounded-lg shadow-md" />
      <h1 className="font-blog leading-none desktop:text-5xl">{props.title}</h1>
      <div className="mb-4 flex flex-wrap items-start gap-2 leading-none">
        <span>
          <FiMic className="text-coral" />
        </span>
        {props.guest} • {props.position}
      </div>
      <div className="mb-4 flex items-start gap-2 leading-none">
        <span>
          <FiClock className="text-coral" />
        </span>
        {props.duration}
      </div>
      <div className="mb-4 flex items-start gap-2">
        <span>
          <AiFillFunnelPlot className="text-coral" />
        </span>
        <ul className="not-prose m-0 flex list-none flex-wrap gap-1 p-0 leading-none">
          {props.scope.map((scope, i) => (
            <li key={scope} className="flex gap-1">
              {scope}
              {i !== props.scope.length - 1 && <span className="text-coral">•</span>}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4 flex items-start gap-2">
        <span>
          <FiTool className="text-coral" />
        </span>
        <ul className="not-prose m-0 flex list-none flex-wrap gap-1 p-0 leading-none">
          {props.tools.map((tool, i) => (
            <li key={tool} className="flex gap-1">
              {tool}
              {i !== props.tools.length - 1 && <span className="text-coral">•</span>}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4 flex items-start gap-2">
        <span>
          <FiTag className="text-coral" />
        </span>
        <ul className="not-prose m-0 flex list-none flex-wrap gap-1 p-0 leading-none">
          {props.tags.map((tag: string) => (
            <li key={tag} className="flex gap-1">
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
