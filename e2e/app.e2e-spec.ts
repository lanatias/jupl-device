import { JuplDevicePage } from './app.po';

describe('jupl-device App', () => {
  let page: JuplDevicePage;

  beforeEach(() => {
    page = new JuplDevicePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
