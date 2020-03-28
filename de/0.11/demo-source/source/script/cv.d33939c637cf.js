/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2011 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

************************************************************************ */
/**
 * <h2>website List Controller</h2>
 *
 * *General idea*
 * The list controller is responsible for synchronizing data given as model
 * to a DOM element. As definition for a single item, templates are used. More
 * details on templates can be found in {@link qx.bom.Template}.
 *
 * *Features*
 *
 * * Synchronize the model and the target
 * * Filtering
 *
 * *Usage*
 *
 * As model, {@link qx.data.Array}s and plain JavaScript Arrays work. As a
 * Target, you have to use a DOM element e.g. a plain DIV element. Make sure
 * you have the template you are referencing in the DOM.
 */
qx.Class.define("qx.data.controller.website.List",
{
  extend : qx.core.Object,

  /**
   * @param model {qx.data.IListData|Array?} The mode which can either be a
   *   native array or a qooxdoo data list. Maps to the model property.
   * @param target {Element?} A DOM element which should is the target for
   *   the generation.
   * @param templateId {String?} The id of the template.
   */
  construct : function(model, target, templateId)
  {
    this.base(arguments);

    if (templateId != null) {
      this.setTemplateId(templateId);
    }
    if (model != null) {
      this.setModel(model);
    }
    if (target != null) {
      this.setTarget(target);
    }
  },


  properties : {
    /** Array containing the data which should be shown in the list. */
    model :
    {
      check: "Array",
      apply: "_applyModel",
      event: "changeModel",
      nullable: true,
      dereference: true
    },


    /** The target DOM node which should show the data. */
    target :
    {
      check: "Element",
      apply: "_applyTarget",
      event: "changeTarget",
      nullable: true,
      init: null,
      dereference: true
    },


    /**
     * The id of the template which should be use. Check out
     * {@link qx.bom.Template} for details on templating.
     */
    templateId :
    {
      apply: "_applyTemplateId",
      event: "changeTemplateId",
      nullable: true,
      init: null
    },


    /**
     * The delegate for the list controller which supports almost all methods
     * documented in {@link qx.data.controller.IControllerDelegate} except
     * <code>bindItem</code>.
     */
    delegate :
    {
      apply: "_applyDelegate",
      event: "changeDelegate",
      init: null,
      nullable: true
    }
  },


  members :
  {
    __changeModelListenerId : null,
    __changeBubbleModelListenerId : null,

    // property apply
    _applyModel : function(value, old) {
      // remove the old listener
      if (old != undefined) {
        if (this.__changeModelListenerId != undefined) {
          old.removeListenerById(this.__changeModelListenerId);
        }
        if (this.__changeBubbleModelListenerId != undefined) {
          old.removeListenerById(this.__changeBubbleModelListenerId);
        }
      }

      // if a model is set
      if (value != null) {
        // only for qooxdoo models
        if (value instanceof qx.core.Object) {
          // add new listeners
          this.__changeModelListenerId =
            value.addListener("change", this.update, this);
          this.__changeBubbleModelListenerId =
            value.addListener("changeBubble", this.update, this);
        }
      } else {
        var target = this.getTarget();
        // if the model is set to null, we should remove all items in the target
        if (target != null) {
          this.__emptyTarget();
        }
      }

      this.update();
    },


    // property apply
    _applyTarget : function(value, old) {
      this.update();
    },


    // property apply
    _applyTemplateId : function(value, old) {
      this.update();
    },


    // property apply
    _applyDelegate : function(value, old) {
      this.update();
    },


    /**
     * Responsible for removing all items from the target element.
     */
    __emptyTarget : function() {
      var target = this.getTarget();
      for (var i= target.children.length -1; i >= 0; i--) {
        var el = target.children[i];
        el.$$model = null;
        qx.dom.Element.remove(el);
      };
      target.innerHTML = "";
    },


    /**
     * This is the main method which will take the data from the model and
     * push it to the target view. If you are using a plain Array as model,
     * you need to call that method every time you want to see the changed model
     * in the view while using {@link qx.data.Array}s will do that
     * automatically for you.
     * This method also attaches to every created DOM element the model object
     * which was used to create it at <code>.$$model</code>.
     */
    update : function() {
      var target = this.getTarget();

      // get the plain data
      var data = this.getModel();
      if (data instanceof qx.core.Object) {
        data = qx.util.Serializer.toNativeObject(this.getModel());
      }
      var templateId = this.getTemplateId();

      // only do something if everything is given
      if (target == null || data == null || templateId == null) {
        return;
      }

      // empty the target
      this.__emptyTarget();

      // delegate methods
      var configureItem = this.getDelegate() && this.getDelegate().configureItem;
      var filter = this.getDelegate() && this.getDelegate().filter;
      var createItem = this.getDelegate() && this.getDelegate().createItem;

      // get all items in the model
      for (var i=0; i < data.length; i++) {
        var entry = data[i];
        // filter delegate
        if (filter && !filter(entry)) {
          continue;
        }

        // special case for printing the content of the array
        if (typeof entry != "object") {
          entry = {"." : data[i]};
        }

        // create the DOM object
        var template;
        if (createItem) {
          template = createItem(data[i]);
        } else {
          template = qx.bom.Template.get(templateId, entry);
        }

        // handling for wrong template IDs
        if (qx.core.Environment.get("qx.debug")) {
          this.assertNotNull(template);
        }

        // configure item
        if (configureItem) {
          configureItem(template);
        }

        // append the model to the dom item
        var model = this.getModel();
        var item = model.getItem ? model.getItem(i) : model[i];
        template.$$model = item;

        qx.dom.Element.insertEnd(template, target);
      };
    }
  }
});
/* ************************************************************************

   qooxdoo - the new era of web development

   http://qooxdoo.org

   Copyright:
     2004-2012 1&1 Internet AG, Germany, http://www.1und1.de

   License:
     MIT: https://opensource.org/licenses/MIT
     See the LICENSE file in the project's top-level directory for details.

   Authors:
     * Martin Wittemann (martinwittemann)

   ======================================================================

   This class contains code based on the following work:

   * Mustache.js version 2.2.1

     Code:
       https://github.com/janl/mustache.js

     Copyright:
       (c) 2009 Chris Wanstrath (Ruby)
       (c) 2010 Jan Lehnardt (JavaScript)

     License:
       MIT: http://www.opensource.org/licenses/mit-license.php

   ----------------------------------------------------------------------

    The MIT License

    Copyright (c) 2009 Chris Wanstrath (Ruby)
    Copyright (c) 2010 Jan Lehnardt (JavaScript)

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation files
    (the "Software"), to deal in the Software without restriction,
    including without limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of the Software,
    and to permit persons to whom the Software is furnished to do so,
    subject to the following conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
    MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
    BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
    ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

************************************************************************ */

/**
 * The is a template class which can be used for HTML templating. In fact,
 * this is a wrapper for mustache.js which is a "framework-agnostic way to
 * render logic-free views".
 *
 * Here is a basic example how to use it:
 * Template:
 * <pre class="javascript">
 * var template = "Hi, my name is {{name}}!";
 * var view = {name: "qooxdoo"};
 * qx.bom.Template.render(template, view);
 * // return "Hi, my name is qooxdoo!"
 * </pre>
 *
 * For further details, please visit the mustache.js documentation here:
 *   https://github.com/janl/mustache.js/blob/master/README.md
 *
 * @ignore(module)
 */
qx.Bootstrap.define("qx.bom.Template", {
  statics : {
    /** Contains the mustache.js version. */
    version: null,

    /**
     * Original and only template method of mustache.js. For further
     * documentation, please visit https://github.com/janl/mustache.js
     *
     * @signature function(template, view, partials)
     * @param template {String} The String containing the template.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {String} The parsed template.
     */
    render: null,

    /**
     * Combines {@link #render} and {@link #get}. Input is equal to {@link #render}
     * and output is equal to {@link #get}. The advantage over {@link #get}
     * is that you don't need a HTML template but can use a template
     * string and still get a DOM element. Keep in mind that templates
     * can only have one root element.
     *
     * @param template {String} The String containing the template.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {Element} A DOM element holding the parsed template data.
     */
    renderToNode : function(template, view, partials) {
       var renderedTmpl = this.render(template, view, partials);
       return this._createNodeFromTemplate(renderedTmpl);
    },

    /**
     * Helper method which provides you with a direct access to templates
     * stored as HTML in the DOM. The DOM node with the given ID will be used
     * as a template, parsed and a new DOM node will be returned containing the
     * parsed data. Keep in mind to have only one root DOM element in the the
     * template.
     * Additionally, you should not put the template into a regular, hidden
     * DOM element because the template may not be valid HTML due to the containing
     * mustache tags. We suggest to put it into a script tag with the type
     * <code>text/template</code>.
     *
     * @param id {String} The id of the HTML template in the DOM.
     * @param view {Object} The object holding the data to render.
     * @param partials {Object} Object holding parts of a template.
     * @return {Element} A DOM element holding the parsed template data.
     */
    get : function(id, view, partials) {
      // get the content stored in the DOM
      var template = document.getElementById(id);
      return this.renderToNode(template.innerHTML, view, partials);
    },

    /**
     * Accepts a parsed template and returns a (potentially nested) node.
     *
     * @param template {String} The String containing the template.
     * @return {Element} A DOM element holding the parsed template data.
     */
    _createNodeFromTemplate : function(template) {
      // template is text only (no html elems) so use text node
      if (template.search(/<|>/) === -1) {
        return document.createTextNode(template);
      }

      // template has html elems so convert string into DOM nodes
      var helper = qx.dom.Element.create("div");
      helper.innerHTML = template;

      return helper.children[0];
    }
  }
});

(function() {
// prevent using CommonJS exports object,
// by shadowing global exports object
var exports;

// prevent using AMD compatible loader,
// by shadowing global define function
var define;

/**
 * Below is the original mustache.js code. Snapshot date is mentioned in
 * the head of this file.
 * @ignore(exports)
 * @ignore(define.*)
 * @ignore(module.*)
 * @lint ignoreNoLoopBlock()
 */
 /*!
  * mustache.js - Logic-less {{mustache}} templates with JavaScript
  * http://github.com/janl/mustache.js
  */

 /*global define: false Mustache: true*/

 (function defineMustache (global, factory) {
   if (typeof exports === 'object' && exports && typeof exports.nodeName !== 'string') {
     factory(exports); // CommonJS
   } else if (typeof define === 'function' && define.amd) {
     define(['exports'], factory); // AMD
   } else {
     global.Mustache = {};
     factory(global.Mustache); // script, wsh, asp
   }
 }(this, function mustacheFactory (mustache) {

   var objectToString = Object.prototype.toString;
   var isArray = Array.isArray || function isArrayPolyfill (object) {
     return objectToString.call(object) === '[object Array]';
   };

   function isFunction (object) {
     return typeof object === 'function';
   }

   /**
    * More correct typeof string handling array
    * which normally returns typeof 'object'
    */
   function typeStr (obj) {
     return isArray(obj) ? 'array' : typeof obj;
   }

   function escapeRegExp (string) {
     return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, '\\$&');
   }

   /**
    * Null safe way of checking whether or not an object,
    * including its prototype, has a given property
    */
   function hasProperty (obj, propName) {
     return obj != null && typeof obj === 'object' && (propName in obj);
   }

   // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
   // See https://github.com/janl/mustache.js/issues/189
   var regExpTest = RegExp.prototype.test;
   function testRegExp (re, string) {
     return regExpTest.call(re, string);
   }

   var nonSpaceRe = /\S/;
   function isWhitespace (string) {
     return !testRegExp(nonSpaceRe, string);
   }

   var entityMap = {
     '&': '&amp;',
     '<': '&lt;',
     '>': '&gt;',
     '"': '&quot;',
     "'": '&#39;',
     '/': '&#x2F;',
     '`': '&#x60;',
     '=': '&#x3D;'
   };

   function escapeHtml (string) {
     return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap (s) {
       return entityMap[s];
     });
   }

   var whiteRe = /\s*/;
   var spaceRe = /\s+/;
   var equalsRe = /\s*=/;
   var curlyRe = /\s*\}/;
   var tagRe = /#|\^|\/|>|\{|&|=|!/;

   /**
    * Breaks up the given `template` string into a tree of tokens. If the `tags`
    * argument is given here it must be an array with two string values: the
    * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
    * course, the default is to use mustaches (i.e. mustache.tags).
    *
    * A token is an array with at least 4 elements. The first element is the
    * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
    * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
    * all text that appears outside a symbol this element is "text".
    *
    * The second element of a token is its "value". For mustache tags this is
    * whatever else was inside the tag besides the opening symbol. For text tokens
    * this is the text itself.
    *
    * The third and fourth elements of the token are the start and end indices,
    * respectively, of the token in the original template.
    *
    * Tokens that are the root node of a subtree contain two more elements: 1) an
    * array of tokens in the subtree and 2) the index in the original template at
    * which the closing tag for that section begins.
    */
   function parseTemplate (template, tags) {
     if (!template)
       return [];

     var sections = [];     // Stack to hold section tokens
     var tokens = [];       // Buffer to hold the tokens
     var spaces = [];       // Indices of whitespace tokens on the current line
     var hasTag = false;    // Is there a {{tag}} on the current line?
     var nonSpace = false;  // Is there a non-space char on the current line?

     // Strips all whitespace tokens array for the current line
     // if there was a {{#tag}} on it and otherwise only space.
     function stripSpace () {
       if (hasTag && !nonSpace) {
         while (spaces.length)
           delete tokens[spaces.pop()];
       } else {
         spaces = [];
       }

       hasTag = false;
       nonSpace = false;
     }

     var openingTagRe, closingTagRe, closingCurlyRe;
     function compileTags (tagsToCompile) {
       if (typeof tagsToCompile === 'string')
         tagsToCompile = tagsToCompile.split(spaceRe, 2);

       if (!isArray(tagsToCompile) || tagsToCompile.length !== 2)
         throw new Error('Invalid tags: ' + tagsToCompile);

       openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + '\\s*');
       closingTagRe = new RegExp('\\s*' + escapeRegExp(tagsToCompile[1]));
       closingCurlyRe = new RegExp('\\s*' + escapeRegExp('}' + tagsToCompile[1]));
     }

     compileTags(tags || mustache.tags);

     var scanner = new Scanner(template);

     var start, type, value, chr, token, openSection;
     while (!scanner.eos()) {
       start = scanner.pos;

       // Match any text between tags.
       value = scanner.scanUntil(openingTagRe);

       if (value) {
         for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
           chr = value.charAt(i);

           if (isWhitespace(chr)) {
             spaces.push(tokens.length);
           } else {
             nonSpace = true;
           }

           tokens.push([ 'text', chr, start, start + 1 ]);
           start += 1;

           // Check for whitespace on the current line.
           if (chr === '\n')
             stripSpace();
         }
       }

       // Match the opening tag.
       if (!scanner.scan(openingTagRe))
         break;

       hasTag = true;

       // Get the tag type.
       type = scanner.scan(tagRe) || 'name';
       scanner.scan(whiteRe);

       // Get the tag value.
       if (type === '=') {
         value = scanner.scanUntil(equalsRe);
         scanner.scan(equalsRe);
         scanner.scanUntil(closingTagRe);
       } else if (type === '{') {
         value = scanner.scanUntil(closingCurlyRe);
         scanner.scan(curlyRe);
         scanner.scanUntil(closingTagRe);
         type = '&';
       } else {
         value = scanner.scanUntil(closingTagRe);
       }

       // Match the closing tag.
       if (!scanner.scan(closingTagRe))
         throw new Error('Unclosed tag at ' + scanner.pos);

       token = [ type, value, start, scanner.pos ];
       tokens.push(token);

       if (type === '#' || type === '^') {
         sections.push(token);
       } else if (type === '/') {
         // Check section nesting.
         openSection = sections.pop();

         if (!openSection)
           throw new Error('Unopened section "' + value + '" at ' + start);

         if (openSection[1] !== value)
           throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
       } else if (type === 'name' || type === '{' || type === '&') {
         nonSpace = true;
       } else if (type === '=') {
         // Set the tags for the next time around.
         compileTags(value);
       }
     }

     // Make sure there are no open sections when we're done.
     openSection = sections.pop();

     if (openSection)
       throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);

     return nestTokens(squashTokens(tokens));
   }

   /**
    * Combines the values of consecutive text tokens in the given `tokens` array
    * to a single token.
    */
   function squashTokens (tokens) {
     var squashedTokens = [];

     var token, lastToken;
     for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
       token = tokens[i];

       if (token) {
         if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
           lastToken[1] += token[1];
           lastToken[3] = token[3];
         } else {
           squashedTokens.push(token);
           lastToken = token;
         }
       }
     }

     return squashedTokens;
   }

   /**
    * Forms the given array of `tokens` into a nested tree structure where
    * tokens that represent a section have two additional items: 1) an array of
    * all tokens that appear in that section and 2) the index in the original
    * template that represents the end of that section.
    */
   function nestTokens (tokens) {
     var nestedTokens = [];
     var collector = nestedTokens;
     var sections = [];

     var token, section;
     for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
       token = tokens[i];

       switch (token[0]) {
         case '#':
         case '^':
           collector.push(token);
           sections.push(token);
           collector = token[4] = [];
           break;
         case '/':
           section = sections.pop();
           section[5] = token[2];
           collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
           break;
         default:
           collector.push(token);
       }
     }

     return nestedTokens;
   }

   /**
    * A simple string scanner that is used by the template parser to find
    * tokens in template strings.
    */
   function Scanner (string) {
     this.string = string;
     this.tail = string;
     this.pos = 0;
   }

   /**
    * Returns `true` if the tail is empty (end of string).
    */
   Scanner.prototype.eos = function eos () {
     return this.tail === '';
   };

   /**
    * Tries to match the given regular expression at the current position.
    * Returns the matched text if it can match, the empty string otherwise.
    */
   Scanner.prototype.scan = function scan (re) {
     var match = this.tail.match(re);

     if (!match || match.index !== 0)
       return '';

     var string = match[0];

     this.tail = this.tail.substring(string.length);
     this.pos += string.length;

     return string;
   };

   /**
    * Skips all text until the given regular expression can be matched. Returns
    * the skipped string, which is the entire tail if no match can be made.
    */
   Scanner.prototype.scanUntil = function scanUntil (re) {
     var index = this.tail.search(re), match;

     switch (index) {
       case -1:
         match = this.tail;
         this.tail = '';
         break;
       case 0:
         match = '';
         break;
       default:
         match = this.tail.substring(0, index);
         this.tail = this.tail.substring(index);
     }

     this.pos += match.length;

     return match;
   };

   /**
    * Represents a rendering context by wrapping a view object and
    * maintaining a reference to the parent context.
    */
   function Context (view, parentContext) {
     this.view = view;
     this.cache = { '.': this.view };
     this.parent = parentContext;
   }

   /**
    * Creates a new context using the given view with this context
    * as the parent.
    */
   Context.prototype.push = function push (view) {
     return new Context(view, this);
   };

   /**
    * Returns the value of the given name in this context, traversing
    * up the context hierarchy if the value is absent in this context's view.
    */
   Context.prototype.lookup = function lookup (name) {
     var cache = this.cache;

     var value;
     if (cache.hasOwnProperty(name)) {
       value = cache[name];
     } else {
       var context = this, names, index, lookupHit = false;

       while (context) {
         if (name.indexOf('.') > 0) {
           value = context.view;
           names = name.split('.');
           index = 0;

           /**
            * Using the dot notion path in `name`, we descend through the
            * nested objects.
            *
            * To be certain that the lookup has been successful, we have to
            * check if the last object in the path actually has the property
            * we are looking for. We store the result in `lookupHit`.
            *
            * This is specially necessary for when the value has been set to
            * `undefined` and we want to avoid looking up parent contexts.
            **/
           while (value != null && index < names.length) {
             if (index === names.length - 1)
               lookupHit = hasProperty(value, names[index]);

             value = value[names[index++]];
           }
         } else {
           value = context.view[name];
           lookupHit = hasProperty(context.view, name);
         }

         if (lookupHit)
           break;

         context = context.parent;
       }

       cache[name] = value;
     }

     if (isFunction(value))
       value = value.call(this.view);

     return value;
   };

   /**
    * A Writer knows how to take a stream of tokens and render them to a
    * string, given a context. It also maintains a cache of templates to
    * avoid the need to parse the same template twice.
    */
   function Writer () {
     this.cache = {};
   }

   /**
    * Clears all cached templates in this writer.
    */
   Writer.prototype.clearCache = function clearCache () {
     this.cache = {};
   };

   /**
    * Parses and caches the given `template` and returns the array of tokens
    * that is generated from the parse.
    */
   Writer.prototype.parse = function parse (template, tags) {
     var cache = this.cache;
     var tokens = cache[template];

     if (tokens == null)
       tokens = cache[template] = parseTemplate(template, tags);

     return tokens;
   };

   /**
    * High-level method that is used to render the given `template` with
    * the given `view`.
    *
    * The optional `partials` argument may be an object that contains the
    * names and templates of partials that are used in the template. It may
    * also be a function that is used to load partial templates on the fly
    * that takes a single argument: the name of the partial.
    */
   Writer.prototype.render = function render (template, view, partials) {
     var tokens = this.parse(template);
     var context = (view instanceof Context) ? view : new Context(view);
     return this.renderTokens(tokens, context, partials, template);
   };

   /**
    * Low-level method that renders the given array of `tokens` using
    * the given `context` and `partials`.
    *
    * Note: The `originalTemplate` is only ever used to extract the portion
    * of the original template that was contained in a higher-order section.
    * If the template doesn't use higher-order sections, this argument may
    * be omitted.
    */
   Writer.prototype.renderTokens = function renderTokens (tokens, context, partials, originalTemplate) {
     var buffer = '';

     var token, symbol, value;
     for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
       value = undefined;
       token = tokens[i];
       symbol = token[0];

       if (symbol === '#') value = this.renderSection(token, context, partials, originalTemplate);
       else if (symbol === '^') value = this.renderInverted(token, context, partials, originalTemplate);
       else if (symbol === '>') value = this.renderPartial(token, context, partials, originalTemplate);
       else if (symbol === '&') value = this.unescapedValue(token, context);
       else if (symbol === 'name') value = this.escapedValue(token, context);
       else if (symbol === 'text') value = this.rawValue(token);

       if (value !== undefined)
         buffer += value;
     }

     return buffer;
   };

   Writer.prototype.renderSection = function renderSection (token, context, partials, originalTemplate) {
     var self = this;
     var buffer = '';
     var value = context.lookup(token[1]);

     // This function is used to render an arbitrary template
     // in the current context by higher-order sections.
     function subRender (template) {
       return self.render(template, context, partials);
     }

     if (!value) return;

     if (isArray(value)) {
       for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
         buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
       }
     } else if (typeof value === 'object' || typeof value === 'string' || typeof value === 'number') {
       buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
     } else if (isFunction(value)) {
       if (typeof originalTemplate !== 'string')
         throw new Error('Cannot use higher-order sections without the original template');

       // Extract the portion of the original template that the section contains.
       value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

       if (value != null)
         buffer += value;
     } else {
       buffer += this.renderTokens(token[4], context, partials, originalTemplate);
     }
     return buffer;
   };

   Writer.prototype.renderInverted = function renderInverted (token, context, partials, originalTemplate) {
     var value = context.lookup(token[1]);

     // Use JavaScript's definition of falsy. Include empty arrays.
     // See https://github.com/janl/mustache.js/issues/186
     if (!value || (isArray(value) && value.length === 0))
       return this.renderTokens(token[4], context, partials, originalTemplate);
   };

   Writer.prototype.renderPartial = function renderPartial (token, context, partials) {
     if (!partials) return;

     var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
     if (value != null)
       return this.renderTokens(this.parse(value), context, partials, value);
   };

   Writer.prototype.unescapedValue = function unescapedValue (token, context) {
     var value = context.lookup(token[1]);
     if (value != null)
       return value;
   };

   Writer.prototype.escapedValue = function escapedValue (token, context) {
     var value = context.lookup(token[1]);
     if (value != null)
       return mustache.escape(value);
   };

   Writer.prototype.rawValue = function rawValue (token) {
     return token[1];
   };

   mustache.name = 'mustache.js';
   mustache.version = '2.2.1';
   mustache.tags = [ '{{', '}}' ];

   // All high-level mustache.* functions use this writer.
   var defaultWriter = new Writer();

   /**
    * Clears all cached templates in the default writer.
    */
   mustache.clearCache = function clearCache () {
     return defaultWriter.clearCache();
   };

   /**
    * Parses and caches the given template in the default writer and returns the
    * array of tokens it contains. Doing this ahead of time avoids the need to
    * parse templates on the fly as they are rendered.
    */
   mustache.parse = function parse (template, tags) {
     return defaultWriter.parse(template, tags);
   };

   /**
    * Renders the `template` with the given `view` and `partials` using the
    * default writer.
    */
   mustache.render = function render (template, view, partials) {
     if (typeof template !== 'string') {
       throw new TypeError('Invalid template! Template should be a "string" ' +
                           'but "' + typeStr(template) + '" was given as the first ' +
                           'argument for mustache#render(template, view, partials)');
     }

     return defaultWriter.render(template, view, partials);
   };

   // This is here for backwards compatibility with 0.4.x.,
   /*eslint-disable */ // eslint wants camel cased function name
   mustache.to_html = function to_html (template, view, partials, send) {
     /*eslint-enable*/

     var result = mustache.render(template, view, partials);

     if (isFunction(send)) {
       send(result);
     } else {
       return result;
     }
   };

   // Export the escaping function so that the user may override it.
   // See https://github.com/janl/mustache.js/issues/244
   mustache.escape = escapeHtml;

   // Export these mainly for testing, but also for advanced usage.
   mustache.Scanner = Scanner;
   mustache.Context = Context;
   mustache.Writer = Writer;

 }));
 /**
 * Above is the original mustache code.
 */

// EXPOSE qooxdoo variant
qx.bom.Template.version = this.Mustache.version;
qx.bom.Template.render = this.Mustache.render;

}).call({});