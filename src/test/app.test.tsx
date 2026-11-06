import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';
import { STORE_LINKS } from '../config/links';
import { COOKIE_NAME, getCookie } from '../i18n/LanguageContext';

describe('Tidoco Coming Soon Home Page & Preserved Landing Pages', () => {
  const originalLanguage = navigator.language;
  const originalLanguages = navigator.languages;

  const setBrowserLanguages = (languages: string[]) => {
    Object.defineProperty(navigator, 'languages', {
      value: languages,
      configurable: true,
    });
    Object.defineProperty(navigator, 'language', {
      value: languages[0] || 'en-US',
      configurable: true,
    });
  };

  const clearCookies = () => {
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  };

  beforeEach(() => {
    localStorage.clear();
    clearCookies();
    setBrowserLanguages(['en-US', 'en']);
    window.history.pushState({}, '', '/');
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  });

  afterEach(() => {
    Object.defineProperty(navigator, 'languages', {
      value: originalLanguages,
      configurable: true,
    });
    Object.defineProperty(navigator, 'language', {
      value: originalLanguage,
      configurable: true,
    });
  });

  it('renders Coming Soon page by default on "/" with exact copy and no download links', () => {
    render(<App />);

    // Eyebrow and Headline
    expect(screen.getByText(/Tidoco is almost here/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Coming\s*soon\./i);

    // Lead and Note
    expect(
      screen.getByText(/A simpler way to discover local services and keep your appointments together/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/We’re putting the finishing touches on Tidoco\. Stay tuned\./i)
    ).toBeInTheDocument();

    // Footer
    expect(screen.getByText(/© 2026 Tidoco · Coming soon/i)).toBeInTheDocument();

    // Verify static visual mockup exists
    const previewImg = screen.getByRole('img', { name: /Preview of the Tidoco booking app/i });
    expect(previewImg).toBeInTheDocument();

    // Elements inside preview
    expect(within(previewImg).getByText('Bookings, made simple')).toBeInTheDocument();
    expect(within(previewImg).getByText('Good Morning!')).toBeInTheDocument();
    expect(within(previewImg).getByText('₪350')).toBeInTheDocument();
    expect(within(previewImg).getByText('Quick Actions')).toBeInTheDocument();
    expect(within(previewImg).getByText('Find a service')).toBeInTheDocument();
    expect(within(previewImg).getByText('Coming up today')).toBeInTheDocument();
    expect(within(previewImg).getByText('Your next appointment')).toBeInTheDocument();
    expect(within(previewImg).getByText('Booking confirmed')).toBeInTheDocument();

    // Confirms it is a teaser with NO app store download links
    expect(screen.queryByLabelText(/App Store/i)).toBeNull();
    expect(screen.queryByLabelText(/Google Play/i)).toBeNull();
    expect(screen.queryByRole('link', { name: /Download/i })).toBeNull();
    expect(screen.queryByRole('link', { name: /Get the app/i })).toBeNull();

    // Cookie is set for default resolved language
    expect(getCookie(COOKIE_NAME)).toBe('en');
  });

  it('defaults to browser language when browser language is Hebrew and saves cookie', () => {
    setBrowserLanguages(['he-IL', 'he']);
    render(<App />);

    // Verify document was initialized in Hebrew
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('he');

    // Verify Hebrew content
    expect(screen.getByText(/Tidoco כמעט כאן/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/בקרוב\s*אצלכם\./i);

    // Cookie is saved
    expect(getCookie(COOKIE_NAME)).toBe('he');
  });

  it('defaults to browser language when browser language is Arabic and saves cookie', () => {
    setBrowserLanguages(['ar-EG', 'ar']);
    render(<App />);

    // Verify document was initialized in Arabic
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');

    // Verify Arabic content
    expect(screen.getByText(/Tidoco قريباً جداً/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/قريباً\s*جداً\./i);

    // Cookie is saved
    expect(getCookie(COOKIE_NAME)).toBe('ar');
  });

  it('prioritizes saved cookie over browser language', () => {
    // Browser is English, but cookie has Arabic
    setBrowserLanguages(['en-US', 'en']);
    document.cookie = `${COOKIE_NAME}=ar; path=/`;

    render(<App />);

    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');
    expect(screen.getByText(/Tidoco قريباً جداً/i)).toBeInTheDocument();
  });

  it('supports switching to Hebrew on Coming Soon page with RTL layout and updates cookie', () => {
    render(<App />);

    // Open language dropdown
    const langBtn = screen.getByRole('button', { name: /Select language/i });
    fireEvent.click(langBtn);

    // Select Hebrew (עברית)
    const hebrewOption = screen.getByRole('option', { name: /עברית/i });
    fireEvent.click(hebrewOption);

    // Verify RTL attributes
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('he');

    // Translated Hebrew content
    expect(screen.getByText(/Tidoco כמעט כאן/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/בקרוב\s*אצלכם\./i);
    expect(screen.getByText(/אנחנו שמים את הליטושים האחרונים על Tidoco\. שווה לחכות\./i)).toBeInTheDocument();
    expect(screen.getByText(/© 2026 Tidoco · בקרוב/i)).toBeInTheDocument();

    // Verify revenue shows ₪350 in Hebrew
    const previewImg = screen.getByRole('img', { name: /Preview of the Tidoco booking app/i });
    expect(within(previewImg).getByText('₪350')).toBeInTheDocument();

    // Brand "Tidoco" preserved in English script
    const brandElements = screen.getAllByText('Tidoco');
    expect(brandElements.length).toBeGreaterThan(0);
    brandElements.forEach((el) => {
      expect(el.textContent).toBe('Tidoco');
    });

    // Verify cookie updated
    expect(getCookie(COOKIE_NAME)).toBe('he');
  });

  it('supports switching to Arabic on Coming Soon page with RTL layout and updates cookie', () => {
    render(<App />);

    // Open language dropdown
    const langBtn = screen.getByRole('button', { name: /Select language/i });
    fireEvent.click(langBtn);

    // Select Arabic (العربية)
    const arabicOption = screen.getByRole('option', { name: /العربية/i });
    fireEvent.click(arabicOption);

    // Verify RTL attributes
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');

    // Translated Arabic content
    expect(screen.getByText(/Tidoco قريباً جداً/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/قريباً\s*جداً\./i);
    expect(screen.getByText(/نضع اللمسات الأخيرة على Tidoco\. ترقبونا\./i)).toBeInTheDocument();
    expect(screen.getByText(/© 2026 Tidoco · قريباً/i)).toBeInTheDocument();

    // Verify revenue shows $50 in Arabic
    const previewImg = screen.getByRole('img', { name: /Preview of the Tidoco booking app/i });
    expect(within(previewImg).getByText('$50')).toBeInTheDocument();

    // Brand "Tidoco" preserved in English script
    const brandElements = screen.getAllByText('Tidoco');
    expect(brandElements.length).toBeGreaterThan(0);
    brandElements.forEach((el) => {
      expect(el.textContent).toBe('Tidoco');
    });

    // Verify cookie updated
    expect(getCookie(COOKIE_NAME)).toBe('ar');
  });

  it('preserves Business landing page code accessible via "/business"', () => {
    window.history.pushState({}, '', '/business');
    render(<App />);

    // Business page content renders
    expect(screen.getByText('Your time, beautifully organized')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Bookings made simple\./i);

    // Business dashboard preview exists as a decorative image mockup
    const boardPreview = screen.getByRole('img', { name: /Tidoco business dashboard preview/i });
    expect(boardPreview).toBeInTheDocument();
    expect(within(boardPreview).getByText('$50')).toBeInTheDocument();
    expect(within(boardPreview).getByText('Daniel Alon')).toBeInTheDocument();

    // Configurable store links remain configured
    const appStoreLinks = screen.getAllByLabelText(/App Store/i);
    expect(appStoreLinks[0]).toHaveAttribute('href', STORE_LINKS.appStoreUrl);
  });

  it('preserves Client landing page code accessible via "/clients"', () => {
    window.history.pushState({}, '', '/clients');
    render(<App />);

    // Client page headline renders
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Good service\.\s*Right around you\./i);

    // Client phone preview exists as a decorative image mockup
    const phonePreview = screen.getByRole('img', { name: /Tidoco client app preview/i });
    expect(phonePreview).toBeInTheDocument();
    expect(within(phonePreview).getByText(/Tel Aviv/i)).toBeInTheDocument();
    expect(within(phonePreview).getByText('Ink & Craft Tattoo Atelier')).toBeInTheDocument();

    // Configurable store links remain configured
    const appStoreLinks = screen.getAllByLabelText(/App Store/i);
    expect(appStoreLinks[0]).toHaveAttribute('href', STORE_LINKS.appStoreUrl);
  });
});
