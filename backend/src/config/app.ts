import { registerAs } from '@nestjs/config';

export default registerAs('app', () => ({
  contactEmail: process.env.CONTACT_EMAIL,
  publicURL: process.env.PUBLIC_URL,
  domainURL: process.env.DOMAIN_URL,
  apiDomainURL: process.env.API_DOMAIN_URL,
  name: process.env.PRODUCT_NAME,
  auth: {
    cookie: !!process.env.AUTH_COOKIE,
  },
}));
