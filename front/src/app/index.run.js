(function() {
  'use strict';

  angular
    .module('springbootangularhtml5')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
