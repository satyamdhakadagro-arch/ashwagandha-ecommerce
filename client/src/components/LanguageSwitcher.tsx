import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  if (!language) return null;

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('en')}
        className="text-xs"
      >
        EN
      </Button>
      <Button
        variant={language === 'hi' ? 'default' : 'outline'}
        size="sm"
        onClick={() => setLanguage('hi')}
        className="text-xs"
      >
        HI
      </Button>
    </div>
  );
}
