import es from './es.json'
import en from './en.json'
import { useRouter } from 'next/dist/client/router';
export const useTranslation = () => {
    let { t, locale } = {t:es,locale:'es'};

    const router = useRouter()
    if(router.locale==="en"){
        t=en
        locale='en'
    }

    return { t, locale };
};
