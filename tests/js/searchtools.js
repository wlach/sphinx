describe('Basic html theme search', function() {

  describe('terms search', function() {

    it('should find "C++" when in index', function() {
      index = {
        docnames:["index"],
        filenames:["index.rst"],
        terms:{'c++':0},
        titles:["&lt;no title&gt;"],
        titleterms:{}
      }
      Search.setIndex(index);
      searchterms = ['c++'];
      excluded = [];
      terms = index.terms;
      titleterms = index.titleterms;

      hits = [[
        "index",
        "&lt;no title&gt;",
        "",
        null,
        5,
        "index.rst"
      ]];
      expect(Search.performTermsSearch(searchterms, excluded, terms, titleterms)).toEqual(hits);
    });

  });

  describe('query', function() {
    it("should not duplicate on title and content", function() {
      index = {
        alltitles: {
          'Main Page': [[0, 'main-page']],
        },
        docnames:["index"],
        filenames:["index.rst"],
        indexentries:{},
        objects:{},
        objtypes: {},
        objnames: {},
        terms:{main:0, page:0},
        titles:["Main Page"],
        titleterms:{ main:0, page:0 }
      }
      Search.setIndex(index);
      let { results } = Search.query('main page');
      // should only be one result
      expect(results).toEqual([
        [ 'index', 'Main Page', '#main-page', null, 100, 'index.rst' ],
      ]);
    });
  })

});

// This is regression test for https://github.com/sphinx-doc/sphinx/issues/3150
describe('splitQuery regression tests', () => {

  it('can split English words', () => {
    const parts = splitQuery('   Hello    World   ')
    expect(parts).toEqual(['Hello', 'World'])
  })

  it('can split special characters', () => {
    const parts = splitQuery('Pin-Code')
    expect(parts).toEqual(['Pin', 'Code'])
  })

  it('can split Chinese characters', () => {
    const parts = splitQuery('Hello from 中国 上海')
    expect(parts).toEqual(['Hello', 'from', '中国', '上海'])
  })

  it('can split Emoji (surrogate pair) characters. It should keep emojis.', () => {
    const parts = splitQuery('😁😁')
    expect(parts).toEqual(['😁😁'])
  })

  it('can split umlauts. It should keep umlauts.', () => {
    const parts = splitQuery('Löschen Prüfung Abändern ærlig spørsmål')
    expect(parts).toEqual(['Löschen', 'Prüfung', 'Abändern', 'ærlig', 'spørsmål'])
  })

})
