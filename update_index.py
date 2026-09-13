import re

def update_html():
    with open('/Users/abuzar/Downloads/CodeLoop/index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Navbar
    content = re.sub(
        r'<a href="#services" class="nav-link" data-i18n="nav.services">Services</a>',
        r'<a href="#services" class="nav-link lang-rtl-text" data-i18n="nav.services">Services</a>',
        content
    )
    content = re.sub(r'<a href="#portfolio" class="nav-link" data-i18n="nav.portfolio">Portfolio</a>', r'<a href="#portfolio" class="nav-link lang-rtl-text" data-i18n="nav.portfolio">Portfolio</a>', content)
    content = re.sub(r'<a href="#process" class="nav-link" data-i18n="nav.process">Process</a>', r'<a href="#process" class="nav-link lang-rtl-text" data-i18n="nav.process">Process</a>', content)
    content = re.sub(r'<a href="#about" class="nav-link" data-i18n="nav.about">About</a>', r'<a href="#about" class="nav-link lang-rtl-text" data-i18n="nav.about">About</a>', content)
    content = re.sub(r'<a href="#contact" class="nav-link" data-i18n="nav.contact">Contact</a>', r'<a href="#contact" class="nav-link lang-rtl-text" data-i18n="nav.contact">Contact</a>', content)

    content = re.sub(
        r'<a href="#contact" class="btn btn-primary navbar__cta" id="nav-cta-btn">\s*<span data-i18n="nav.letsTalk">Let\'s Talk</span>\s*</a>',
        r'<a href="#contact" class="btn btn-primary navbar__cta lang-rtl-text" id="nav-cta-btn">\n            <span data-i18n="nav.letsTalk">Let\'s Talk</span>\n          </a>',
        content
    )

    # 2. Mobile Navbar
    content = re.sub(r'<a href="#services" class="mobile-nav-link" data-i18n="nav.services">Services</a>', r'<a href="#services" class="mobile-nav-link lang-rtl-text" data-i18n="nav.services">Services</a>', content)
    content = re.sub(r'<a href="#portfolio" class="mobile-nav-link" data-i18n="nav.portfolio">Portfolio</a>', r'<a href="#portfolio" class="mobile-nav-link lang-rtl-text" data-i18n="nav.portfolio">Portfolio</a>', content)
    content = re.sub(r'<a href="#process" class="mobile-nav-link" data-i18n="nav.process">Process</a>', r'<a href="#process" class="mobile-nav-link lang-rtl-text" data-i18n="nav.process">Process</a>', content)
    content = re.sub(r'<a href="#about" class="mobile-nav-link" data-i18n="nav.about">About</a>', r'<a href="#about" class="mobile-nav-link lang-rtl-text" data-i18n="nav.about">About</a>', content)
    content = re.sub(r'<a href="#contact" class="mobile-nav-link" data-i18n="nav.contact">Contact</a>', r'<a href="#contact" class="mobile-nav-link lang-rtl-text" data-i18n="nav.contact">Contact</a>', content)
    
    content = re.sub(
        r'<a href="#contact" class="btn btn-primary" style="width:100%; justify-content:center;">\s*<span data-i18n="nav.letsTalk">Let\'s Talk</span>\s*</a>',
        r'<a href="#contact" class="btn btn-primary lang-rtl-text" style="width:100%; justify-content:center;">\n          <span data-i18n="nav.letsTalk">Let\'s Talk</span>\n        </a>',
        content
    )

    # 3. Hero section
    content = content.replace(
        '<span data-i18n="hero.badge">Available for new projects</span>',
        '<span data-i18n="hero.badge" class="lang-rtl-text">Available for new projects</span>'
    )
    content = content.replace(
        '<span class="hero__badge-pill">Remote Worldwide</span>',
        '<span class="hero__badge-pill lang-rtl-text" data-i18n="hero.badgePill">Remote Worldwide</span>'
    )
    content = content.replace(
        '<h1 class="hero__title" id="hero-heading">',
        '<h1 class="hero__title lang-rtl-text" id="hero-heading" data-i18n="hero.headline">'
    )
    content = content.replace(
        '<p class="hero__subtitle" data-i18n="hero.subtitle">',
        '<p class="hero__subtitle lang-rtl-text" data-i18n="hero.subtitle">'
    )
    content = content.replace(
        '<a href="#portfolio" class="btn btn-primary" id="hero-portfolio-btn">',
        '<a href="#portfolio" class="btn btn-primary lang-rtl-text" id="hero-portfolio-btn">'
    )
    content = content.replace(
        '<a href="#contact" class="btn btn-ghost" id="hero-quote-btn">\n              <span>Get a Quote</span>',
        '<a href="#contact" class="btn btn-ghost lang-rtl-text" id="hero-quote-btn">\n              <span data-i18n="hero.ctaSecondary">Get a Quote</span>'
    )
    # The primary cta says View Portfolio, let's add data-i18n
    content = content.replace(
        '<span data-i18n="hero.ctaSecondary">View Portfolio</span>',
        '<span data-i18n="hero.ctaPrimary">View Portfolio</span>'
    )
    
    content = content.replace(
        '<span class="hero__scroll-text">Scroll</span>',
        '<span class="hero__scroll-text lang-rtl-text" data-i18n="hero.scroll">Scroll</span>'
    )

    # 4. Trust Stats
    content = content.replace(
        '<span class="stats-section__number gradient-text" data-count="50" data-suffix="+">50+</span>',
        '<span class="stats-section__number gradient-text lang-rtl-text" data-count="50" data-suffix="+" data-i18n="trust.stat1Value">50+</span>'
    )
    content = content.replace(
        '<span class="stats-section__label">Projects Delivered</span>',
        '<span class="stats-section__label lang-rtl-text" data-i18n="trust.stat1Label">Projects Delivered</span>'
    )
    content = content.replace(
        '<span class="stats-section__number gradient-text" data-count="10" data-suffix="+">10+</span>',
        '<span class="stats-section__number gradient-text lang-rtl-text" data-count="10" data-suffix="+" data-i18n="trust.stat2Value">10+</span>'
    )
    content = content.replace(
        '<span class="stats-section__label">Countries Served</span>',
        '<span class="stats-section__label lang-rtl-text" data-i18n="trust.stat2Label">Countries Served</span>'
    )
    content = content.replace(
        '<span class="stats-section__number gradient-text" data-count="98" data-suffix="%">98%</span>',
        '<span class="stats-section__number gradient-text lang-rtl-text" data-count="98" data-suffix="%" data-i18n="trust.stat3Value">98%</span>'
    )
    content = content.replace(
        '<span class="stats-section__label">Client Satisfaction</span>',
        '<span class="stats-section__label lang-rtl-text" data-i18n="trust.stat3Label">Client Satisfaction</span>'
    )
    content = content.replace(
        '<span class="stats-section__number gradient-text">5&#9733;</span>',
        '<span class="stats-section__number gradient-text lang-rtl-text" data-i18n="trust.stat4Value">5&#9733;</span>'
    )
    content = content.replace(
        '<span class="stats-section__label">Average Rating</span>',
        '<span class="stats-section__label lang-rtl-text" data-i18n="trust.stat4Label">Average Rating</span>'
    )

    # 5. Services
    content = content.replace(
        '<span class="section-label gsap-fade-in">What We Build</span>',
        '<span class="section-label gsap-fade-in lang-rtl-text" data-i18n="services.label">What We Build</span>'
    )
    content = content.replace(
        '<h2 class="section-heading gsap-fade-up" id="services-heading">',
        '<h2 class="section-heading gsap-fade-up lang-rtl-text" id="services-heading" data-i18n="services.heading">'
    )
    content = content.replace(
        '<p class="section-subtext gsap-fade-up">\n          From elegant landing pages to complex enterprise software — we cover every stage of your digital journey with precision and craft.\n        </p>',
        '<p class="section-subtext gsap-fade-up lang-rtl-text" data-i18n="services.subheading">\n          From elegant landing pages to complex enterprise software — we cover every stage of your digital journey with precision and craft.\n        </p>'
    )

    # Service titles and descriptions
    services_map = [
        ("Custom Web Development", "services.customWebTitle", "Bespoke, high-performance websites built from the ground up. Pixel-perfect design, blazing speed, and SEO-optimized for maximum growth.", "services.customWebDesc"),
        ("Shopify Development", "services.shopifyTitle", "Custom Shopify themes, app integrations, and conversion-optimized storefronts that turn browsers into buyers and scale effortlessly.", "services.shopifyDesc"),
        ("WordPress Development", "services.wordpressTitle", "Custom WordPress themes and plugins built for performance. Easy content management with a powerful, SEO-friendly foundation your team can use.", "services.wordpressDesc"),
        ("Custom CRM & Software", "services.crmTitle", "Tailored CRM systems and business software that automate workflows, manage leads, and give you full control over your operations from day one.", "services.crmDesc"),
        ("Custom Online Stores", "services.storeTitle", "Headless or traditional e-commerce solutions built for speed and conversions. Fully branded, integrated with payment gateways and inventory systems.", "services.storeDesc"),
        ("WooCommerce Development", "services.wooTitle", "Feature-rich WooCommerce stores with custom plugins, theme development, and full optimization for traffic, performance, and sales growth.", "services.wooDesc"),
    ]
    
    for title, t_key, desc, d_key in services_map:
        content = content.replace(
            f'<h3 class="service-card__title">{title}</h3>',
            f'<h3 class="service-card__title lang-rtl-text" data-i18n="{t_key}">{title}</h3>'
        )
        content = content.replace(
            f'<p class="service-card__desc">{desc}</p>',
            f'<p class="service-card__desc lang-rtl-text" data-i18n="{d_key}">{desc}</p>'
        )

    # Service Learn More
    content = re.sub(
        r'<span class="service-card__link">\s*Learn more\s*<svg',
        r'<span class="service-card__link lang-rtl-text">\n                <span data-i18n="services.learnMore">Learn more</span>\n                <svg',
        content
    )

    # 6. Portfolio
    content = content.replace(
        '<span class="section-label gsap-fade-in">Our Work</span>',
        '<span class="section-label gsap-fade-in lang-rtl-text" data-i18n="portfolio.label">Our Work</span>'
    )
    content = content.replace(
        '<h2 class="section-heading gsap-fade-up" id="portfolio-heading">',
        '<h2 class="section-heading gsap-fade-up lang-rtl-text" id="portfolio-heading" data-i18n="portfolio.heading">'
    )
    content = content.replace(
        '<p class="section-subtext gsap-fade-up" style="margin-bottom:0;">\n              A curated selection of our finest work across industries and platforms.\n            </p>',
        '<p class="section-subtext gsap-fade-up lang-rtl-text" style="margin-bottom:0;" data-i18n="portfolio.subheading">\n              A curated selection of our finest work across industries and platforms.\n            </p>'
    )
    content = content.replace(
        '<a href="#contact" class="btn btn-ghost gsap-fade-up" id="portfolio-cta-btn" style="flex-shrink:0;">\n            <span>Start Your Project</span>',
        '<a href="#contact" class="btn btn-ghost gsap-fade-up lang-rtl-text" id="portfolio-cta-btn" style="flex-shrink:0;">\n            <span data-i18n="portfolio.startProjectBtn">Start Your Project</span>'
    )

    # Portfolio filters
    filters = [
        ("all", "All Projects", "filterAll"),
        ("wordpress", "WordPress", "filterWordpress"),
        ("shopify", "Shopify", "filterShopify"),
        ("seo", "SEO", "filterSEO"),
    ]
    for val, text, key in filters:
        content = re.sub(
            f'<button class="filter-btn(.*?)" data-filter="{val}" aria-pressed="(.*?)">{text}</button>',
            f'<button class="filter-btn\\1 lang-rtl-text" data-filter="{val}" aria-pressed="\\2" data-i18n="portfolio.{key}">{text}</button>',
            content
        )

    # Portfolio tags and links
    content = re.sub(
        r'<span class="portfolio-card__tag">WordPress</span>',
        r'<span class="portfolio-card__tag lang-rtl-text" data-i18n="portfolio.tagWordpress">WordPress</span>',
        content
    )
    content = re.sub(
        r'<span class="portfolio-card__tag">Shopify</span>',
        r'<span class="portfolio-card__tag lang-rtl-text" data-i18n="portfolio.tagShopify">Shopify</span>',
        content
    )
    content = re.sub(
        r'<span class="portfolio-card__tag">SEO</span>',
        r'<span class="portfolio-card__tag lang-rtl-text" data-i18n="portfolio.tagSEO">SEO</span>',
        content
    )

    content = re.sub(
        r'VIEW PROJECT <svg',
        r'<span data-i18n="portfolio.viewProject">VIEW PROJECT</span> <svg',
        content
    )
    content = content.replace(
        '<span class="portfolio-card__link" style="color: var(--clr-text-muted); pointer-events: none;">PRIVATE CLIENT</span>',
        '<span class="portfolio-card__link lang-rtl-text" style="color: var(--clr-text-muted); pointer-events: none;" data-i18n="portfolio.privateClient">PRIVATE CLIENT</span>'
    )

    # Portfolio titles
    portfolio_titles = [
        "Master Tiger General Transport", "Capel Estates", "BillGreen", "Stylfox", "MyChildsRoom", "Mida Living",
        "Vapzone.ae", "VPDAZZLE.AE", "VapDubai.ae", "VapeDubaiKing", "Vaps.ae", "Vaporweb.ae", "VapeShopDubai.ae",
        "Drywall Takeoff Services", "Lumber Estimating Services", "Bids Analytics LLC", "Pure Whole Melt Home",
        "Sprayed Tech Solutions", "Vape SEO", "CortexZ", "CloudNine Clothing"
    ]
    for i, title in enumerate(portfolio_titles):
        # some characters might be tricky, but these are simple strings
        content = content.replace(
            f'<h3 class="portfolio-card__title">{title}</h3>',
            f'<h3 class="portfolio-card__title lang-rtl-text" data-i18n="portfolio.p{i+1}">{title}</h3>'
        )

    with open('/Users/abuzar/Downloads/CodeLoop/index.html', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    update_html()
    print("Done")
