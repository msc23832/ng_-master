import { EmailsystemPage } from './app.po';

describe('emailsystem App', function() {
  let page: EmailsystemPage;

  beforeEach(() => {
    page = new EmailsystemPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
