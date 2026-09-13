import re

def update_html2():
    with open('/Users/abuzar/Downloads/CodeLoop/index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # 7. Process
    content = content.replace(
        '<span class="section-label gsap-fade-in">How We Work</span>',
        '<span class="section-label gsap-fade-in lang-rtl-text" data-i18n="process.label">How We Work</span>'
    )
    content = content.replace(
        '<h2 class="section-heading gsap-fade-up" id="process-heading" style="text-align:center;">',
        '<h2 class="section-heading gsap-fade-up lang-rtl-text" id="process-heading" style="text-align:center;" data-i18n="process.heading">'
    )
    content = content.replace(
        '<p class="section-subtext gsap-fade-up" style="text-align:center; margin-inline:auto;">\n          From your first message to post-launch support, we follow a clear, collaborative process designed to deliver on time, every time.\n        </p>',
        '<p class="section-subtext gsap-fade-up lang-rtl-text" style="text-align:center; margin-inline:auto;" data-i18n="process.subheading">\n          From your first message to post-launch support, we follow a clear, collaborative process designed to deliver on time, every time.\n        </p>'
    )
    process_map = [
        ("Inquiry", "You reach out. We listen carefully to understand your vision, goals, and timeline."),
        ("Proposal", "We send a detailed proposal: scope, timeline, technology stack, and transparent pricing."),
        ("Design", "Our designers craft pixel-perfect wireframes and mockups, revised until you love it."),
        ("Build", "Development begins with clean code, regular updates, and a staging environment for your review."),
        ("Launch", "We deploy to production, run final QA, and launch your project with full monitoring in place."),
        ("Support", "Ongoing support, updates, and growth — we\'re your long-term technical partner, not just a vendor.")
    ]
    for i, (title, desc) in enumerate(process_map):
        content = content.replace(
            f'<h3 class="process__step-title">{title}</h3>',
            f'<h3 class="process__step-title lang-rtl-text" data-i18n="process.step{i+1}Title">{title}</h3>'
        )
        content = content.replace(
            f'<p class="process__step-desc">{desc}</p>',
            f'<p class="process__step-desc lang-rtl-text" data-i18n="process.step{i+1}Desc">{desc}</p>'
        )

    # 8. About
    content = content.replace(
        '<span class="section-label gsap-fade-in">Our Story</span>',
        '<span class="section-label gsap-fade-in lang-rtl-text" data-i18n="about.label">Our Story</span>'
    )
    content = content.replace(
        '<h2 class="section-heading gsap-fade-up" id="about-heading">',
        '<h2 class="section-heading gsap-fade-up lang-rtl-text" id="about-heading" data-i18n="about.heading">'
    )
    content = content.replace(
        '<p class="gsap-fade-up">CodeLoop was founded with a clear mission: to bring enterprise-grade web and software development to businesses of every size, anywhere in the world. We\'re a remote-first team of passionate developers and designers who believe that great code changes businesses.</p>',
        '<p class="gsap-fade-up lang-rtl-text" data-i18n="about.p1">CodeLoop was founded with a clear mission: to bring enterprise-grade web and software development to businesses of every size, anywhere in the world. We\'re a remote-first team of passionate developers and designers who believe that great code changes businesses.</p>'
    )
    content = content.replace(
        '<p class="gsap-fade-up" style="margin-top:1rem;">From solo founders scaling their first Shopify store to growing companies needing a custom CRM — we\'ve helped clients across the USA, UK, UAE, Australia, Canada, and beyond to achieve their digital goals.</p>',
        '<p class="gsap-fade-up lang-rtl-text" style="margin-top:1rem;" data-i18n="about.p2">From solo founders scaling their first Shopify store to growing companies needing a custom CRM — we\'ve helped clients across the USA, UK, UAE, Australia, Canada, and beyond to achieve their digital goals.</p>'
    )
    content = content.replace(
        '<strong>Available across all major time zones</strong>',
        '<strong class="lang-rtl-text" data-i18n="about.remoteLabel1">Available across all major time zones</strong>'
    )
    content = content.replace(
        '<span>EST &middot; GMT &middot; GST &middot; AEST &middot; PST &mdash; we sync with your schedule</span>',
        '<span class="lang-rtl-text" data-i18n="about.remoteLabel2">EST &middot; GMT &middot; GST &middot; AEST &middot; PST &mdash; we sync with your schedule</span>'
    )
    content = content.replace(
        '<h3 class="about__tech-title">Technologies We Master</h3>',
        '<h3 class="about__tech-title lang-rtl-text" data-i18n="about.techTitle">Technologies We Master</h3>'
    )

    # 9. Testimonials
    content = content.replace(
        '<span class="section-label gsap-fade-in">Client Feedback</span>',
        '<span class="section-label gsap-fade-in lang-rtl-text" data-i18n="testimonials.label">Client Feedback</span>'
    )
    content = content.replace(
        '<h2 class="section-heading gsap-fade-up" id="testimonials-heading" style="text-align:center;">',
        '<h2 class="section-heading gsap-fade-up lang-rtl-text" id="testimonials-heading" style="text-align:center;" data-i18n="testimonials.heading">'
    )
    content = content.replace(
        '<p class="section-subtext gsap-fade-up" style="text-align:center; margin-inline:auto;">\n          Don\'t just take our word for it. Here\'s what our clients say about working with CodeLoop.\n        </p>',
        '<p class="section-subtext gsap-fade-up lang-rtl-text" style="text-align:center; margin-inline:auto;" data-i18n="testimonials.subheading">\n          Don\'t just take our word for it. Here\'s what our clients say about working with CodeLoop.\n        </p>'
    )
    content = content.replace(
        '<p class="empty-state__text">Client reviews coming soon. We are currently collecting testimonials from our amazing clients.</p>',
        '<p class="empty-state__text lang-rtl-text" data-i18n="testimonials.empty1">Client reviews coming soon. We are currently collecting testimonials from our amazing clients.</p>'
    )
    content = content.replace(
        '<p class="empty-state__subtext">Have you worked with us? We\'d love to feature your feedback here. Reach out and let us know!</p>',
        '<p class="empty-state__subtext lang-rtl-text" data-i18n="testimonials.empty2">Have you worked with us? We\'d love to feature your feedback here. Reach out and let us know!</p>'
    )
    content = content.replace(
        '<button class="btn btn-primary btn-leave-review" aria-label="Leave a Review">\n          <span>Leave a Review</span>\n        </button>',
        '<button class="btn btn-primary btn-leave-review lang-rtl-text" aria-label="Leave a Review">\n          <span data-i18n="testimonials.leaveReview">Leave a Review</span>\n        </button>'
    )

    # 10. Contact
    content = content.replace(
        '<span class="section-label gsap-fade-in">Get In Touch</span>',
        '<span class="section-label gsap-fade-in lang-rtl-text" data-i18n="contact.label">Get In Touch</span>'
    )
    content = content.replace(
        '<h2 class="section-heading gsap-fade-up" id="contact-heading">',
        '<h2 class="section-heading gsap-fade-up lang-rtl-text" id="contact-heading" data-i18n="contact.heading">'
    )
    content = content.replace(
        '<p class="section-subtext gsap-fade-up">\n              Ready to take your digital presence to the next level? Tell us about your project and we\'ll get back to you within 24 hours with a tailored proposal.\n            </p>',
        '<p class="section-subtext gsap-fade-up lang-rtl-text" data-i18n="contact.subheading">\n              Ready to take your digital presence to the next level? Tell us about your project and we\'ll get back to you within 24 hours with a tailored proposal.\n            </p>'
    )
    content = content.replace('<span class="contact-card__label">Email</span>', '<span class="contact-card__label lang-rtl-text" data-i18n="contact.emailLabel">Email</span>')
    content = content.replace('<span class="contact-card__label">WhatsApp</span>', '<span class="contact-card__label lang-rtl-text" data-i18n="contact.whatsappLabel">WhatsApp</span>')
    content = content.replace('<span class="contact-card__label">Schedule a Call</span>', '<span class="contact-card__label lang-rtl-text" data-i18n="contact.scheduleLabel">Schedule a Call</span>')
    content = content.replace('<span class="contact-card__value">Book a free 30-min consultation</span>', '<span class="contact-card__value lang-rtl-text" data-i18n="contact.scheduleValue">Book a free 30-min consultation</span>')
    
    # Form
    content = content.replace('<label for="name" class="form-label">Full Name *</label>', '<label for="name" class="form-label lang-rtl-text" data-i18n="contact.fullName">Full Name *</label>')
    content = content.replace('<label for="email" class="form-label">Email Address *</label>', '<label for="email" class="form-label lang-rtl-text" data-i18n="contact.email">Email Address *</label>')
    content = content.replace('<label for="service" class="form-label">Service Needed *</label>', '<label for="service" class="form-label lang-rtl-text" data-i18n="contact.serviceNeeded">Service Needed *</label>')
    content = content.replace('<label for="budget" class="form-label">Budget Range</label>', '<label for="budget" class="form-label lang-rtl-text" data-i18n="contact.budgetRange">Budget Range</label>')
    
    content = content.replace('<option value="" disabled selected>Select a service&hellip;</option>', '<option value="" disabled selected class="lang-rtl-text" data-i18n="contact.selectService">Select a service&hellip;</option>')
    content = content.replace('<option value="web">Custom Web Development</option>', '<option value="web" class="lang-rtl-text" data-i18n="contact.sWeb">Custom Web Development</option>')
    content = content.replace('<option value="shopify">Shopify Development</option>', '<option value="shopify" class="lang-rtl-text" data-i18n="contact.sShopify">Shopify Development</option>')
    content = content.replace('<option value="wordpress">WordPress Development</option>', '<option value="wordpress" class="lang-rtl-text" data-i18n="contact.sWordpress">WordPress Development</option>')
    content = content.replace('<option value="crm">Custom CRM / Software</option>', '<option value="crm" class="lang-rtl-text" data-i18n="contact.sCrm">Custom CRM / Software</option>')
    content = content.replace('<option value="store">Custom Online Store</option>', '<option value="store" class="lang-rtl-text" data-i18n="contact.sStore">Custom Online Store</option>')
    content = content.replace('<option value="woocommerce">WooCommerce Development</option>', '<option value="woocommerce" class="lang-rtl-text" data-i18n="contact.sWoo">WooCommerce Development</option>')
    content = content.replace('<option value="other">Other / Not Sure Yet</option>', '<option value="other" class="lang-rtl-text" data-i18n="contact.sOther">Other / Not Sure Yet</option>')
    
    content = content.replace('<option value="" disabled selected>Select budget range&hellip;</option>', '<option value="" disabled selected class="lang-rtl-text" data-i18n="contact.selectBudget">Select budget range&hellip;</option>')
    content = content.replace('<option value="1k-3k">$1,000 &ndash; $3,000</option>', '<option value="1k-3k" class="lang-rtl-text" data-i18n="contact.b1">$1,000 &ndash; $3,000</option>')
    content = content.replace('<option value="3k-8k">$3,000 &ndash; $8,000</option>', '<option value="3k-8k" class="lang-rtl-text" data-i18n="contact.b2">$3,000 &ndash; $8,000</option>')
    content = content.replace('<option value="8k-20k">$8,000 &ndash; $20,000</option>', '<option value="8k-20k" class="lang-rtl-text" data-i18n="contact.b3">$8,000 &ndash; $20,000</option>')
    content = content.replace('<option value="20k+">$20,000+</option>', '<option value="20k+" class="lang-rtl-text" data-i18n="contact.b4">$20,000+</option>')
    content = content.replace('<option value="unsure">Not sure yet</option>', '<option value="unsure" class="lang-rtl-text" data-i18n="contact.bUnsure">Not sure yet</option>')

    content = content.replace(
        '<p class="form-disclaimer">Final pricing depends on project scope &mdash; this is a starting guide.</p>',
        '<p class="form-disclaimer lang-rtl-text" data-i18n="contact.disclaimer">Final pricing depends on project scope &mdash; this is a starting guide.</p>'
    )
    content = content.replace(
        '<button type="submit" class="btn btn-primary" style="width: 100%;">\n                <span>Send Inquiry</span>\n              </button>',
        '<button type="submit" class="btn btn-primary lang-rtl-text" style="width: 100%;">\n                <span data-i18n="contact.submit">Send Inquiry</span>\n              </button>'
    )

    # 11. Footer
    content = content.replace(
        '<p class="footer__copy">&copy; 2026 CodeLoop. All rights reserved.</p>',
        '<p class="footer__copy lang-rtl-text" data-i18n="footer.copyright">&copy; 2026 CodeLoop. All rights reserved.</p>'
    )
    content = content.replace(
        '<h4 class="footer__heading">Quick Links</h4>',
        '<h4 class="footer__heading lang-rtl-text" data-i18n="footer.linksLabel">Quick Links</h4>'
    )
    # The links in the footer share the navbar keys!
    content = content.replace('<li><a href="#services">Services</a></li>', '<li><a href="#services" class="lang-rtl-text" data-i18n="nav.services">Services</a></li>')
    content = content.replace('<li><a href="#portfolio">Portfolio</a></li>', '<li><a href="#portfolio" class="lang-rtl-text" data-i18n="nav.portfolio">Portfolio</a></li>')
    content = content.replace('<li><a href="#process">Process</a></li>', '<li><a href="#process" class="lang-rtl-text" data-i18n="nav.process">Process</a></li>')
    content = content.replace('<li><a href="#about">About</a></li>', '<li><a href="#about" class="lang-rtl-text" data-i18n="nav.about">About</a></li>')
    content = content.replace('<li><a href="#contact">Contact</a></li>', '<li><a href="#contact" class="lang-rtl-text" data-i18n="nav.contact">Contact</a></li>')

    # 12. Feedback Modal
    content = content.replace(
        '<h3 class="modal-title">Share Your Experience</h3>',
        '<h3 class="modal-title lang-rtl-text" data-i18n="feedback.modalTitle">Share Your Experience</h3>'
    )
    content = content.replace(
        '<p class="modal-subtitle">We value your feedback! Let us know how we did.</p>',
        '<p class="modal-subtitle lang-rtl-text" data-i18n="feedback.modalSubtitle">We value your feedback! Let us know how we did.</p>'
    )
    content = content.replace('<label for="feedbackName" class="form-label">Your Name *</label>', '<label for="feedbackName" class="form-label lang-rtl-text" data-i18n="feedback.nameLabel">Your Name *</label>')
    content = content.replace('<label for="feedbackRole" class="form-label">Role / Company (Optional)</label>', '<label for="feedbackRole" class="form-label lang-rtl-text" data-i18n="feedback.roleLabel">Role / Company (Optional)</label>')
    content = content.replace('<label class="form-label">Rating *</label>', '<label class="form-label lang-rtl-text" data-i18n="feedback.ratingLabel">Rating *</label>')
    content = content.replace('<label for="feedbackMessage" class="form-label">Your Feedback *</label>', '<label for="feedbackMessage" class="form-label lang-rtl-text" data-i18n="feedback.messageLabel">Your Feedback *</label>')
    
    # Textarea placeholder shouldn't have inner html, we use data-i18n to replace it, handled in i18n.js
    content = content.replace(
        '<textarea id="feedbackMessage" name="feedbackMessage" class="form-input" rows="4" placeholder="Tell us about your experience working with CodeLoop..." required></textarea>',
        '<textarea id="feedbackMessage" name="feedbackMessage" class="form-input lang-rtl-text" rows="4" placeholder="Tell us about your experience working with CodeLoop..." data-i18n="feedback.messagePlaceholder" required></textarea>'
    )
    
    content = content.replace(
        '<button type="submit" class="btn btn-primary" style="width: 100%;">\n            <span>Submit Review</span>\n          </button>',
        '<button type="submit" class="btn btn-primary lang-rtl-text" style="width: 100%;">\n            <span data-i18n="feedback.submit">Submit Review</span>\n          </button>'
    )

    with open('/Users/abuzar/Downloads/CodeLoop/index.html', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == "__main__":
    update_html2()
    print("Done2")
