import { CryptoTestPage } from './app.po';

describe('crypto-test App', () => {
  let page: CryptoTestPage;

  beforeEach(() => {
    page = new CryptoTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
