import { WordGamePage } from './app.po';

describe('word-game App', () => {
  let page: WordGamePage;

  beforeEach(() => {
    page = new WordGamePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
