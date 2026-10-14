'use client'
import Logo from "../Logo";
import ThemeSwitcher from "./ThemeSwitcher";
import LangSwitcher from "./LangSwitcher";
import { FaGithub } from "react-icons/fa";
import { Locale } from "@/i18n.config";
import LinkItem from "./LinkItem";
import ExternalLinkItem from "./ExternalLinkItem";
import ContactLink from "./ContactLink";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { pathWithoutLocale } from "@/lib/utils"

export default function Navbar({ lang, dictionary }: { lang: Locale, dictionary:any }) {
    const usePath = usePathname()
    const pathname = pathWithoutLocale(usePath)

    return (
      <nav className="bg-transparent fixed w-full z-20 top-0 start-0 backdrop-blur-md">
        <div className="flex flex-wrap items-center justify-between p-4  w-full lg:max-w-[75%] mx-auto">
          <div>
            <Logo />
          </div>
          <div className="flex gap-2 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <div className="flex gap-2">
                <ThemeSwitcher/>
                <LangSwitcher/>
              </div>
              <Dropdown backdrop="blur">
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="bordered" 
                    size="sm"
                    className="md:hidden p-1"
                  >
                    <Bars3Icon width="640" height="480"/>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu variant="faded" aria-label="Static Actions">
                  <DropdownItem key={dictionary.home} href='/' as={Link} className={pathname ==='/' ? 'text-primary' : 'text-foreground'}>
                    <span className="text-base">{dictionary.home}</span>
                  </DropdownItem>
                  <DropdownItem key={dictionary.works} href='/works' as={Link} className={pathname ==='/works' ? 'text-primary' : 'text-foreground'}>
                    <span className="text-base">{dictionary.works}</span>
                  </DropdownItem>
                  <DropdownItem key={dictionary.contact}>
                    <ContactLink label={dictionary.contact}/>
                  </DropdownItem>
                  <DropdownItem key={dictionary.source} className="text-danger" color="danger" href='https://github.com/alvaldes/portfolio'>
                    <ExternalLinkItem label="Source Code" href='https://github.com/alvaldes/portfolio'>
                      <FaGithub /><span className="ml-1" >{dictionary.source}</span>
                    </ExternalLinkItem>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
          </div>
          <div className={`items-center justify-between hidden w-full md:flex md:w-auto md:order-1`}>
            <div className="flex p-4 md:p-0 gap-8">
              <LinkItem label={dictionary.home} href='/' lang={lang} key={`${dictionary.home}-0`}/>
              <LinkItem label={dictionary.works} href='/works' lang={lang} key={`${dictionary.works}-1`}/>
              <ContactLink label={dictionary.contact} key={`${dictionary.contact}-2`}/>
              <ExternalLinkItem label="Source Code" href='https://github.com/alvaldes/portfolio' key={`${dictionary.source}-3`}>
                <FaGithub /><span className="ml-1" >{dictionary.source}</span>
              </ExternalLinkItem>
            </div>
          </div>
        </div>
      </nav>
      );
}
