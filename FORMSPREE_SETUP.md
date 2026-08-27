# Formspree Email Capture Setup for megacaps.co.uk

## Status: BROKEN. The form does not exist.

**Verified 27 Aug 2026:** a POST to `https://formspree.io/f/mzylkbwd` returns
`FORM_NOT_FOUND`. The form was never created, so every waitlist signup and
reserve-order submission to date has silently failed. Someone with the
Formspree account must create a form for megacaps.co.uk and replace the ID in
`index.html` and `js/products.js`. The original setup notes follow.

## Original status: PARTIALLY COMPLETE

### What's Been Done

1. **HTML Form Updated**: The email signup form in `index.html` has been configured with the Formspree endpoint:
   - Form action: `https://formspree.io/f/mzylkbwd`
   - Redirect URL (_next): `https://megacaps.co.uk/thanks.html`
   - Field: `email` (required)

2. **Form Structure Verified**:
   - ✅ Form method: POST
   - ✅ Email field: present with required attribute
   - ✅ Hidden _next field: correctly set to https://megacaps.co.uk/thanks.html
   - ✅ Submit button: configured

### What Still Needs Manual Completion

To make the form fully functional, you need to:

#### Option 1: Register the Form (Recommended)
1. Go to https://formspree.io/register
2. Create an account with these details:
   - **Email**: `admin@megacaps.co.uk` (or your preferred admin email)
   - **Domain**: `megacaps.co.uk`
3. Once logged in, create a new form for megacaps.co.uk
4. The form will be auto-assigned an ID (you may need to update the form action if it differs from `mzylkbwd`)
5. Enable email notifications to your admin email
6. (Optional) Set up integrations like Mailchimp or Google Sheets for subscriber management

#### Option 2: Test Form Auto-Creation
1. The form ID `mzylkbwd` is formatted correctly for Formspree
2. When someone submits the form on the live website, Formspree will attempt to create it
3. You'll receive a verification email to complete the setup
4. Follow the email verification steps to activate email capture

### Form Endpoint

**Current endpoint**: https://formspree.io/f/mzylkbwd

**When activated**, emails submitted through the form will:
1. Be received by the registered admin email address
2. Redirect the user to: https://megacaps.co.uk/thanks.html

### Verification Checklist

- [ ] Formspree account created
- [ ] Form verified/activated on Formspree
- [ ] Test email submission completed and received
- [ ] Redirect to thanks.html confirmed
- [ ] Email notification settings configured

### File Modified

- `/Users/gregrothwell/clawd/projects/megacaps/index.html`
  - Line with email form updated to use form ID: `mzylkbwd`

### Notes

- The form is now live on the website
- Until the form is registered/verified on Formspree, submissions may be rejected or held pending verification
- The _next redirect field is correctly configured for post-submission flow
- Email submissions will include the timestamped date and user's email address

### Next Steps

1. **Immediately**: Register the form at formspree.io (Option 1 above)
2. **After registration**: Test by submitting an email and verifying the redirect works
3. **Optional**: Connect to email list service (Mailchimp, ConvertKit, etc.) through Formspree integrations
