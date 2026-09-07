import { Link, Tooltip } from "@heroui/react";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import { IoDocumentText } from "react-icons/io5";

export default function Socials({withEmail, cv_url}:any){
    return (
        <span className={`flex ${withEmail? 'gap-2 ' :'gap-4 pl-4 sm:pl-0'} pt-3 flex-wrap justify-center sm:justify-start`}>
            <Tooltip content="@alvaldes">
                <Link color='foreground' href='https://github.com/alvaldes' isExternal>
                <FaGithubSquare className='text-2xl text-gray-600 dark:text-zinc-200'/>
                </Link>
            </Tooltip>
            <Tooltip content="@alvaldes">
                <Link color='foreground' href='https://www.linkedin.com/in/alvaldes/' isExternal>
                <FaLinkedin className='text-2xl text-blue-600'/>
                </Link>
            </Tooltip>
            <Tooltip content="CV">
                <Link color='foreground' href={cv_url} isExternal>
                <IoDocumentText className='text-2xl text-pink-600'/>
                </Link>
            </Tooltip>
            { withEmail && (
                <Link color='foreground' href={`mailto:alvaldes.dev@gmail.com`} 
                isExternal showAnchorIcon underline='always' className='text-base'>
                    alvaldes.dev@gmail.com
                </Link>
            )}
        </span>
    )
}
