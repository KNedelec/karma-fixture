// Generated by CoffeeScript 1.7.1
(function() {
  var cleanup_karma_html2js_templates, fixture_base, html_template1, html_template2, html_template3, json_data, json_template, load_template_as_karma_html2js;

  json_data = {
    test1: 'check',
    test2: 'ok'
  };

  json_template = JSON.stringify(json_data);

  html_template1 = '<h1 id="tmpl">test</h1>';

  html_template2 = '<h2 id="tmpl">test</h2><p>multiple</p>';

  html_template3 = '<script>window.test_a_test = true</script>';

  fixture_base = 'spec/fixtures';

  load_template_as_karma_html2js = function(name, string) {
    if (window.__html__ == null) {
      window.__html__ = {};
    }
    return window.__html__["" + base + "/" + name] = string;
  };

  cleanup_karma_html2js_templates = function() {
    return window.__html__ = {};
  };

  describe('Fixture', function() {
    before(function() {
      return this.Fixture = window.Fixture;
    });
    it('is a function', function() {
      return expect(this.Fixture).to.be.a('function');
    });
    it('has a static property with the id of the container', function() {
      return expect(this.Fixture.el_id).to.be.a('string').and.to.equal('fixture_container');
    });
    describe('instance', function() {
      afterEach(function() {
        var container;
        container = document.getElementById(this.Fixture.el_id);
        container.parentElement.removeChild(container);
        this.instance = null;
        return delete this.instance;
      });
      it('receives the base folder from where to load templates as option', function() {
        return this.instance = new this.Fixture();
      });
      it('has an empty array to store json fixtures in @.json', function() {
        this.instance = new this.Fixture();
        return expect(this.instance.json).to.be.an('array').and.to.be.empty;
      });
      it('has created the fixtures container element', function() {
        var container;
        this.instance = new this.Fixture();
        container = document.getElementById(this.Fixture.el_id);
        return expect(container).to.not.be["null"];
      });
      return it('has a reference to the fixtures container element in @.el', function() {
        var container;
        this.instance = new this.Fixture();
        container = document.getElementById(this.Fixture.el_id);
        return expect(this.instance.el).to.equal(container);
      });
    });
    return describe('API', function() {
      beforeEach(function() {
        this.instance = new this.Fixture();
        return this.fixture_cont = this.instance.el;
      });
      afterEach(function() {
        var container;
        container = document.getElementById(this.Fixture.el_id);
        container.parentElement.removeChild(container);
        this.instance = null;
        return delete this.instance;
      });
      describe('load', function() {
        beforeEach(function() {
          load_template_as_karma_html2js('html1', html_template1);
          load_template_as_karma_html2js('html2', html_template2);
          load_template_as_karma_html2js('html3', html_template3);
          return load_template_as_karma_html2js('json.json', json_template);
        });
        afterEach(function() {
          return cleanup_karma_html2js_templates();
        });
        it('creates DOM elements inside the container from the template whose name is passed as the first param', function() {
          this.instance.load('html1');
          return expect(this.fixture_cont.children.length).to.equal(1);
        });
        it('accepts an append boolean as second param', function() {
          this.instance.load('html1', true);
          return expect(this.fixture_cont.children.length).to.equal(1);
        });
        it('appends new template to existing one if append is true', function() {
          this.instance.load('html1', false);
          this.instance.load('html2', true);
          this.instance.load('html1', true);
          return expect(this.fixture_cont.children.length).to.equal(4);
        });
        it('replaces older templates with new one if append is false', function() {
          this.instance.load('html1', false);
          this.instance.load('html2', false);
          this.instance.load('html1', false);
          return expect(this.fixture_cont.children.length).to.equal(1);
        });
        it('has a default value of false', function() {
          this.instance.load('html1');
          this.instance.load('html1');
          return expect(this.fixture_cont.children.length).to.equal(1);
        });
        it('returns an array with a list of newly created dom nodes per template', function() {
          var dom_nodes;
          dom_nodes = this.instance.load('html1');
          return expect(dom_nodes[0]).to.equal(this.fixture_cont.firstChild);
        });
        it('returns references to all firstChildren nodes created by the template', function() {
          var dom_nodes;
          dom_nodes = this.instance.load('html2');
          return expect(dom_nodes.length).to.equal(this.fixture_cont.children.length).to.equal(2);
        });
        context('when template contains <script> tags', function() {
          beforeEach(function() {
            return this.instance.load('html3');
          });
          it('places the script tag intact', function() {
            return expect(this.fixture_cont.innerHTML).to.equal(html_template3);
          });
          return it('executes the javascript', function() {
            return expect(window.test_a_test).to.equal(true);
          });
        });
        context('when multiple templates are requested', function() {
          beforeEach(function() {
            return this.result = this.instance.load('html1', 'html2');
          });
          it('accepts multiple templates as params', function() {
            return expect(this.fixture_cont.children.length).to.equal(3);
          });
          it('returns multiple template\'s results in an array', function() {
            return expect(this.result.length).to.equal(2);
          });
          return it('returns references to all firstChildren nodes created by all the templates', function() {
            return expect(this.result[1][1]).to.equal(this.fixture_cont.children[2]);
          });
        });
        context('when it loads json template', function() {
          it('returns the json object', function() {
            var result;
            result = this.instance.load('json.json');
            return expect(result).to.include(json_data);
          });
          it('loads the json template into fixture.json', function() {
            this.instance.load('json.json');
            return expect(this.instance.json[0]).to.include(json_data);
          });
          it('returns multipe json objects', function() {
            var result;
            result = this.instance.load('json.json', 'json.json');
            return expect(result.length).to.equal(2);
          });
          return it('loads multiple json templates into fixture.json', function() {
            var result;
            result = this.instance.load('json.json', 'json.json');
            return expect(this.instance.json.length).to.equal(2);
          });
        });
        return context('json and html templates', function() {
          beforeEach(function() {
            return this.result = this.instance.load('html1', 'json.json');
          });
          it('returns both templates', function() {
            return expect(this.result.length).to.equal(2);
          });
          return it('pushes the json obj to fixture.json', function() {
            return expect(this.instance.json[0]).to.include(json_data);
          });
        });
      });
      describe('set', function() {
        it('accepts a string as first param and creates a dom element', function() {
          this.instance.set(html_template1);
          return expect(this.fixture_cont.innerHTML).to.equal(html_template1);
        });
        it('accepts an append boolean as second param', function() {
          this.instance.set(html_template1, true);
          return expect(this.fixture_cont.children.length).to.equal(1);
        });
        it('appends new template to existing one if append is true', function() {
          this.instance.set(html_template1, false);
          this.instance.set(html_template2, true);
          this.instance.set(html_template1, true);
          return expect(this.fixture_cont.children.length).to.equal(4);
        });
        it('replaces older templates with new one if append is false', function() {
          this.instance.set(html_template1, false);
          this.instance.set(html_template2, false);
          this.instance.set(html_template1, false);
          return expect(this.fixture_cont.children.length).to.equal(1);
        });
        it('has a default value of false', function() {
          this.instance.set(html_template1);
          this.instance.set(html_template1);
          return expect(this.fixture_cont.children.length).to.equal(1);
        });
        it('returns an array with a list of newly created dom nodes per template', function() {
          var dom_nodes;
          dom_nodes = this.instance.set(html_template1)[0];
          return expect(dom_nodes[0]).to.equal(this.fixture_cont.firstChild);
        });
        it('returns references to all firstChildren nodes created by the template', function() {
          var dom_nodes;
          dom_nodes = this.instance.set(html_template2)[0];
          return expect(dom_nodes.length).to.equal(this.fixture_cont.children.length).to.equal(2);
        });
        context('when template contains <script> tags', function() {
          beforeEach(function() {
            return this.result = this.instance.set(html_template3);
          });
          it('places the script tag intact', function() {
            return expect(this.fixture_cont.innerHTML).to.equal(html_template3);
          });
          return it('executes the javascript', function() {
            return expect(window.test_a_test).to.equal(true);
          });
        });
        return context('when multiple templates are requested', function() {
          beforeEach(function() {
            return this.result = this.instance.set(html_template1, html_template2);
          });
          it('accepts multiple templates as params', function() {
            return expect(this.fixture_cont.children.length).to.equal(3);
          });
          it('returns multiple template\'s results in an array', function() {
            return expect(this.result.length).to.equal(2);
          });
          return it('returns references to all firstChildren nodes created by all the templates', function() {
            return expect(this.result[1][1]).to.equal(this.fixture_cont.children[2]);
          });
        });
      });
      return describe('cleanup', function() {
        beforeEach(function() {
          load_template_as_karma_html2js('html1', html_template1);
          load_template_as_karma_html2js('html2', html_template2);
          load_template_as_karma_html2js('json.json', json_template);
          this.result = this.instance.load('html1', 'json.json');
          return this.instance.cleanup();
        });
        afterEach(function() {
          return cleanup_karma_html2js_templates();
        });
        it('resets @.json to an empty array', function() {
          return expect(this.instance.json).to.be.an('array').and.to.be.empty;
        });
        return it('empties fixture container', function() {
          return expect(this.fixture_cont.innerHTML).to.equal('');
        });
      });
    });
  });

}).call(this);
