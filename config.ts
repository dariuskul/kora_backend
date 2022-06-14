import sgemail from '@sendgrid/mail';
import JiraApi from 'jira-client';

export const AUTH = {
  JWT: '13U43CakwpVA6pQa1M7H'
};

export const setEmailApiToken = () => {
  sgemail.setApiKey('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');
}

export const jira = new JiraApi({
  protocol: 'https',
  host: 'barbori.atlassian.net',
  username: 'dariuux@gmail.com',
  password: 'TwaiGNrp4vi49vggLNRR14C5',
  apiVersion: '3',
  strictSSL: true
})





