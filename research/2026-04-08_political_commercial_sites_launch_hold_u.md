# Research: Political/commercial sites launch hold until after 7 May election

Generated: 2026-04-08
Project: megacaps

**1. Key Findings**  
- The MEGA Caps GitHub Pages site (megacaps.co.uk) is currently active but requires a launch delay until after 7 May 2024.  
- The repository’s `index.html` and `404.html` files currently host live content, with no date-based deployment logic.  
- GitHub Pages lacks native scheduled deployment features, requiring manual or script-based workarounds.  
- Stripe integration is pending activation (no live payments yet), as noted in `TASKS.md`.  
- UK political campaigning sites must comply with Electoral Commission rules (e.g., "imprint" disclaimers).  

**2. Next Steps**  
- **Immediate Action**: Temporarily replace `index.html` with a "Launching 8 May" placeholder page (use `/404.html` as a template).  
  ```bash  
  cp 404.html index.html && git add index.html && git commit -m "Hold launch until post-election"  
  ```  
- **Schedule Deployment**: Use GitHub Actions to automate deployment on 8 May. Add a workflow file:  
  ```yaml  
  # .github/workflows/deploy-election.yml  
  on:  
    schedule:  
      - cron: "0 0 8 5 *"  # Run 00:00 UTC on 8 May  
  jobs:  
    deploy:  
      runs-on: ubuntu-latest  
      steps:  
        - run: echo "Deploy to GitHub Pages via your existing build process"  
  ```  
- **Legal Compliance**: Add a footer disclaimer to all pages (e.g., "Promoted by Tom Pickup, 123 High Street, Burnley").  
- **Stripe Readiness**: Complete Stripe onboarding in test mode (via `TASKS.md` instructions) to prepare for post-election activation.  

**3. Resources**  
- GitHub Pages deployment settings: [https://github.com/tompickup23/megacaps/settings/pages](https://github.com/tompickup23/megacaps/settings/pages)  
- GitHub Actions cron syntax: [https://docs.github.com/en/actions/reference/events#schedule](https://docs.github.com/en/actions/reference/events#schedule)  
- Electoral Commission imprint rules: [https://www.electoralcommission.org.uk](https://www.electoralcommission.org.uk)  
- Stripe test mode guide: [https://stripe.com/docs/payments/checkout/test](https://stripe.com/docs/payments/checkout/test)  

**4. Risks/Blockers**  
- GitHub Pages cannot natively delay deployment; manual placeholder updates or third-party CI/CD tools (e.g., GitHub Actions) are required.  
- Late legal review could delay launch compliance.  
- Stripe activation delays if identity verification is incomplete.  

**Final Check**: Confirm domain DNS settings (megacaps.co.uk) are configured to point to GitHub Pages post-deployment. Use `dig megacaps.co.uk` to verify.