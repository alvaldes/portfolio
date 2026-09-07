import { Locale } from "@/i18n.config";
import { getDictionary } from "@/lib/dictionary";
import CardItem from "../components/CardItem";
import { Divider } from "@heroui/react";
import SectionTransition from "../components/SectionTransition";

interface Project {
    id: string;
    title: string;
    year: string;
    tag: string;
    stack: string;
    shortDescription: string;
    longDescription: string;
    website: string;
    sourceCode: string;
    platform: string;
    active: number;
    thumbCard: string;
    thumbFirst: string;
    thumbMockup: string;
}

export default async function Works({
    params
    }: Readonly<{
        params: Promise<{ lang: string }>
    }>) {
    const { lang } = await params
    const { works } = await getDictionary(lang as Locale)
    return (
        <SectionTransition delay={0.2} id='works' className="w-full">
            <h1 className="text-2xl font-bold mb-2">{works.title}</h1>
            <Divider></Divider>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 my-6">
                {works.projects.map((item: Project) => (
                    <CardItem
                        key={item.id}
                        data={item}
                        lang={lang}
                        buttonText={works.more}
                    />
                ))}
            </div>
        </SectionTransition>
    );
}
