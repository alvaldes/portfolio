import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import { CommandLineIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { Divider, Image, Link } from "@heroui/react";
import { marked } from "marked";
import { FaGithub } from "react-icons/fa";
import Stacks from "../../components/Stacks";
import SectionTransition from "../../components/SectionTransition";

interface Project {
    id: string;
    title: string;
    year: string;
    tag: string;
    stack: string;
    shortDescription: string;
    longDescription: string;
    website?: string;
    sourceCode: string;
    platform: string;
    active: number;
    thumbCard: string;
    thumbFirst: string;
    thumbMockup: string;
}

export default async function Work({
    params
    }: Readonly<{
        params: Promise<{ lang: string, id: string }>
    }>) {
    const { lang, id } = await params
    const { works } = await getDictionary(lang as Locale)
    const project = works.projects.find((p: Project) => p.id === id)
    const stackList = project?.stack === undefined ? [] : project.stack.split(',')
    return (
        <SectionTransition delay={0.2} id={id} className="container">
            <div className="h-20 sm:h-32 lg:h-40 flex items-center justify-center md:rounded-xl overflow-hidden w-full">
                <Image 
                isZoomed
                radius="sm"
                alt={`${id}-thumbFirst`} 
                src={project?.thumbFirst} 
                className="w-full h-auto object-cover"/>
            </div>
            <h1 className="text-2xl font-bold mt-4">{project?.title}</h1>
            <Divider></Divider>
            <div className="my-3 text-pretty" dangerouslySetInnerHTML={{ __html:
                project?.longDescription !== undefined
                ? marked.parse(project.longDescription)
                : ""
            }}/>
            <div className="flex flex-col gap-2">
                {project?.website && (
                    <p className="flex">
                        <span className="flex font-bold mr-2">
                            <GlobeAltIcon width={18} className="mr-1"/>
                            {works.website}:
                        </span>
                        <Link href={project.website} isExternal showAnchorIcon color="secondary" isDisabled={!project.website.startsWith('http')}>
                            {project.website.startsWith('http') ? project.website.substring(8) : project.website}
                        </Link>
                    </p>
                )}
                <p className="flex flex-wrap">
                    <span className="flex font-bold mr-2 items-center">
                        <FaGithub className="mr-1"/>
                        {works.sourceCode}:
                    </span>
                    <Link href={project?.sourceCode} isExternal showAnchorIcon color="secondary">{project?.sourceCode.substring(18)}</Link>
                </p>
                <div className="grid grid-flow-col sm:flex items-start">
                    <span className="flex font-bold mr-1 items-center">
                        <CommandLineIcon width={18} className="mr-1"/>
                        {works.stack}:
                    </span>
                    <Stacks data={stackList}/>
                </div>
            </div>
            <div className="h-full py-8 flex items-center justify-center rounded-none md:rounded-xl overflow-hidden w-full">
                <Image 
                isZoomed
                radius="sm"
                alt={`${id}-thumbFirst`} 
                src={project?.thumbMockup} 
                className="w-full h-auto object-cover"/>
            </div>
        </SectionTransition>
    );
}