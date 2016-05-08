module.exports = {
  "jquery": "$",
  "spin":"spin",
  "underscore": "_",
  "backbone": {
      "exports": "Backbone",
      "depends": {
         "jquery":"$",
         "underscore":"_"
      }
  },
  "jquery.spin": {
      "exports": "$.fn.spin",
      "depends": {
         "jquery":"$",
         "spin":"spin"
      }
  },
  "jqueryui": {
      "depends": {
         "jquery":"$"
      }
  },
  "backbone.localstorage": {
      "exports": "Backbone.LocalStorage",
      "depends": {
          "backbone":"Backbone"
      }
  },
  "backbone-validation": {
      "exports": "Backbone.Validation",
      "depends": {
        "backbone":"Backbone"
      }
  },
  "backbone.paginator": {
      "depends": {
        "backbone":"Backbone",
      }
  },
  "backgrid": {
      "exports": "Backgrid",
      "depends": {
        "backbone":"Backbone"
      }
  },
  "backgrid-paginator": {
      "exports": "Backgrid.Extension.Paginator",
      "depends": {
        "backbone":"Backbone",
        "backgrid":"Backgrid"
      }
  },
  "backgrid-filter": {
      "depends": {
        "backbone":"Backbone",
        "backgrid":"Backgrid"
      }
  },
  "lunr": {
      "exports": "lunr"
  },
  "backbone.picky": {
      "exports": "Backbone.Picky",
      "depends": {
          "backbone":"Backbone"
      }
  },
  "backbone.syphon": {
      "exports": "Backbone.Syphon",
      "depends": {
          "backbone":"Backbone"
      }
  },
  "backbone.babysitter": {
      "exports": "Backbone.BabySitter",
      "depends": {
          "backbone":"Backbone"
      }
  },
  "backbone.wreqr": {
      "exports": "Backbone.Wreqr",
      "depends": {
          "backbone":"Backbone"
      }
  },
  "backbone.marionette": {
      "exports": "Marionette",
      "depends": {
          "backbone":"Backbone",
          "backbone.wreqr":"Backbone.Wreqr",
          "backbone.babysitter":"Backbone.BabySitter"
      }
  }
};
