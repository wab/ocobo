import { FiMic, FiClock, FiTag, FiTool } from 'react-icons/fi';
import { AiFillFunnelPlot } from 'react-icons/ai';
import { Tag } from '~/components/Tag';
import type { Testimonial } from '~/utils/parsers';

export const TestimonialHeader: React.FunctionComponent<React.PropsWithChildren<Testimonial>> = ({
  children,
  ...props
}) => {
  return (
    <>
      <header className="mb-6 flex items-center gap-6"></header>

      <header className="grid-cols-12 gap-8 pb-12 desktop:grid">
        <div className="relative col-span-4">
          <div className="relative w-[340px]">
            <div className="h-[340px] w-full overflow-hidden rounded-full border-4 border-mint">
              <img src={props.coverImage} alt={props.guest} className="h-[340px] object-cover" />
            </div>
            <img
              src={props.logo}
              alt={props.title}
              className="absolute bottom-[-32px] left-0 h-24 translate-x-[50%] rounded-md bg-white shadow-md"
            />
          </div>
        </div>

        <div className="col-span-8">
          <h1 className="mb-4 font-blog leading-none desktop:text-5xl">{props.title}</h1>
          <p className="mb-4 font-title text-lg">{props.description}</p>

          <div className="prose mb-6 rounded-md border-2 border-dashed border-blue bg-blue bg-opacity-10 p-4">
            <div className="mb-4 flex flex-wrap items-start gap-2 font-bold leading-none">
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
            <div className="flex items-start gap-2">
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
          </div>
          <div className="flex items-start gap-2">
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
        </div>
      </header>
    </>
  );
};
