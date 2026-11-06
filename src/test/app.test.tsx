import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import App from '../App';
import { STORE_LINKS } from '../config/links';

describe('Tidoco Landing Pages and Static App Mockups', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
    document.documentElement.dir = 'ltr';
    document.documentElement.lang = 'en';
  });

  it('renders Business landing page by default with exact copy, metrics, and static dashboard mockup', () => {
    render(<App />);

    // Main website headline and eyebrow
    expect(screen.getByText('Your time, beautifully organized')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Bookings made simple\./i);

    // Business dashboard preview exists as a decorative image mockup
    const boardPreview = screen.getByRole('img', { name: /Tidoco business dashboard preview/i });
    expect(boardPreview).toBeInTheDocument();

    // Verify static metrics & items inside the mockup
    expect(within(boardPreview).getByText('$50')).toBeInTheDocument();
    expect(within(boardPreview).getAllByText("Today's Appointments")[0]).toBeInTheDocument();
    expect(within(boardPreview).getByText("Today's Revenue")).toBeInTheDocument();
    expect(within(boardPreview).getByText('Pending Requests')).toBeInTheDocument();
    expect(within(boardPreview).getByText('Daniel Alon')).toBeInTheDocument();
    expect(within(boardPreview).getByText('Sarah Goldstein')).toBeInTheDocument();

    // Verify floating callouts
    expect(within(boardPreview).getByText('More time for you')).toBeInTheDocument();
    expect(within(boardPreview).getByText(/Booking confirmed/i)).toBeInTheDocument();

    // Mockup has NO interactive button controls inside it (strictly static decorative)
    expect(within(boardPreview).queryByRole('button')).toBeNull();
    expect(within(boardPreview).queryByRole('textbox')).toBeNull();
  });

  it('renders Client landing page with static phone mockup', () => {
    window.history.pushState({}, '', '/clients');
    render(<App />);

    // Main website headline
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Good service\.\s*Right around you\./i);

    // Client phone preview exists as a decorative image mockup
    const phonePreview = screen.getByRole('img', { name: /Tidoco client app preview/i });
    expect(phonePreview).toBeInTheDocument();

    // Verify static mockup content
    expect(within(phonePreview).getByText(/Tel Aviv/i)).toBeInTheDocument();
    expect(within(phonePreview).getByText('Ink & Craft Tattoo Atelier')).toBeInTheDocument();
    expect(within(phonePreview).getByText('Haircut')).toBeInTheDocument();
    expect(within(phonePreview).getByText('Nails')).toBeInTheDocument();

    // Floating callouts
    expect(within(phonePreview).getByText(/Booking confirmed/i)).toBeInTheDocument();
    expect(within(phonePreview).getByText(/Great spots nearby/i)).toBeInTheDocument();
    expect(within(phonePreview).getByText(/Save your favorites/i)).toBeInTheDocument();

    // Mockup has NO interactive button controls inside it (strictly static decorative)
    expect(within(phonePreview).queryByRole('button')).toBeNull();
    expect(within(phonePreview).queryByRole('textbox')).toBeNull();
  });

  it('allows switching between Business and Client pages via website header navigation', () => {
    render(<App />);

    // Click "For clients" button in the website header
    const clientSwitchBtn = screen.getByRole('button', { name: /switch to client landing page/i });
    fireEvent.click(clientSwitchBtn);

    // Should now be on Client page
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Good service\.\s*Right around you\./i);

    // Click "For businesses" button in the website header
    const businessSwitchBtn = screen.getByRole('button', { name: /switch to business landing page/i });
    fireEvent.click(businessSwitchBtn);

    // Should now be back on Business page
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Bookings made simple\./i);
  });

  it('keeps website navigation, anchor links, and CTA controls active', () => {
    render(<App />);

    // Check website header links
    const featuresLinks = screen.getAllByRole('link', { name: /Features/i });
    expect(featuresLinks[0]).toHaveAttribute('href', '#features');

    const bizLink = screen.getByRole('link', { name: /For business/i });
    expect(bizLink).toHaveAttribute('href', '#for-business');

    const getAppNavCta = screen.getAllByRole('link', { name: /Get the app/i })[0];
    expect(getAppNavCta).toHaveAttribute('href', '#download');

    // Hero CTA links
    const getStartedHeroBtn = screen.getByRole('link', { name: /Get started with Tidoco/i });
    expect(getStartedHeroBtn).toHaveAttribute('href', '#download');

    const exploreFeaturesBtn = screen.getByRole('link', { name: /Explore features/i });
    expect(exploreFeaturesBtn).toHaveAttribute('href', '#features');
  });

  it('uses configurable store download links from the config module', () => {
    render(<App />);

    const appStoreLinks = screen.getAllByLabelText(/App Store/i);
    expect(appStoreLinks[0]).toHaveAttribute('href', STORE_LINKS.appStoreUrl);

    const playStoreLinks = screen.getAllByLabelText(/Google Play/i);
    expect(playStoreLinks[0]).toHaveAttribute('href', STORE_LINKS.googlePlayUrl);
  });

  it('supports switching to Hebrew with RTL layout, translated content, and keeps "Tidoco" in English', () => {
    render(<App />);

    // Open language selector in header
    const langBtn = screen.getAllByRole('button', { name: /Select language/i })[0];
    fireEvent.click(langBtn);

    // Select Hebrew (עברית)
    const hebrewOption = screen.getByRole('option', { name: /עברית/i });
    fireEvent.click(hebrewOption);

    // Verify RTL attributes
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('he');

    // Verify translated Hebrew content
    expect(screen.getByText('ניהול תורים,')).toBeInTheDocument();
    expect(screen.getByText('הזמן שלך, מסודר להפליא')).toBeInTheDocument();
    expect(screen.getByText('בוקר טוב!')).toBeInTheDocument();
    expect(screen.getAllByText('תורים להיום')[0]).toBeInTheDocument();

    // Verify Tidoco remains in English script
    const brandElements = screen.getAllByText('Tidoco');
    expect(brandElements.length).toBeGreaterThan(0);
    brandElements.forEach(el => {
      expect(el.textContent).toBe('Tidoco');
    });
  });

  it('supports switching to Arabic with RTL layout, translated content, and keeps "Tidoco" in English', () => {
    render(<App />);

    // Open language selector in header
    const langBtn = screen.getAllByRole('button', { name: /Select language/i })[0];
    fireEvent.click(langBtn);

    // Select Arabic (العربية)
    const arabicOption = screen.getByRole('option', { name: /العربية/i });
    fireEvent.click(arabicOption);

    // Verify RTL attributes
    expect(document.documentElement.dir).toBe('rtl');
    expect(document.documentElement.lang).toBe('ar');

    // Verify translated Arabic content
    expect(screen.getByText('إدارة الحجوزات')).toBeInTheDocument();
    expect(screen.getByText('وقتك، مرتّب بأجمل شكل')).toBeInTheDocument();
    expect(screen.getByText('صباح الخير!')).toBeInTheDocument();
    expect(screen.getAllByText('مواعيد اليوم')[0]).toBeInTheDocument();

    // Verify Tidoco remains in English script
    const brandElements = screen.getAllByText('Tidoco');
    expect(brandElements.length).toBeGreaterThan(0);
    brandElements.forEach(el => {
      expect(el.textContent).toBe('Tidoco');
    });
  });
});
